/* ============================================================
   SparkEdge School ERP — firebase_sync.js  v3.0
   © 2026 Raunak Karn · SparkEdge

   This file enables automatic real-time cloud sync via
   Firebase Realtime Database. It is OPTIONAL — if FIREBASE_CONFIG
   in school_data.js has empty values, this file does nothing and
   the ERP works purely on localStorage.

   HOW IT WORKS:
   • On load: pulls latest data from Firebase → merges with localStorage
   • On saveData(): pushes to Firebase automatically
   • Real-time listener: if another device saves data, this tab updates live

   SETUP STEPS (one time):
   1. Go to https://console.firebase.google.com
   2. Create a new project (e.g. "my-school-erp")
   3. Build → Realtime Database → Create database
      Choose region: asia-southeast1 (for India)
   4. Rules tab → set to (for testing):
      {
        "rules": {
          ".read": true,
          ".write": true
        }
      }
      (For production, restrict to authenticated users)
   5. Project Settings → Your apps → Web app → Register app
   6. Copy the firebaseConfig values into school_data.js FIREBASE_CONFIG
   7. git commit & push → All devices share data live!

   HARDCODED EDIT NEEDED:
   → Only edit FIREBASE_CONFIG in school_data.js (not here)
   ============================================================ */

(function() {
  'use strict';

  // Check if Firebase config is provided
  const cfg = (window.ERP && window.ERP.FIREBASE_CONFIG) || {};
  const isConfigured = cfg.apiKey && cfg.apiKey.trim() !== '' &&
                       cfg.databaseURL && cfg.databaseURL.trim() !== '';

  if (!isConfigured) {
    console.log('%c[SparkEdge Firebase] No config found — running in localStorage-only mode.', 'color:#7A7A9A;font-size:11px;');
    window._firebaseSaveData = null;
    // Show a subtle indicator
    _showSyncBadge('local');
    return;
  }

  console.log('%c[SparkEdge Firebase] Config found — initializing cloud sync...', 'color:#14B8A6;font-weight:700;');

  // ── Load Firebase SDK dynamically ──────────────────────────
  const FB_VER = '10.12.2';
  const FB_BASE = `https://www.gstatic.com/firebasejs/${FB_VER}`;

  Promise.all([
    _loadScript(`${FB_BASE}/firebase-app-compat.js`),
    _loadScript(`${FB_BASE}/firebase-database-compat.js`),
  ]).then(() => {
    _initFirebase(cfg);
  }).catch(err => {
    console.error('[SparkEdge Firebase] Failed to load Firebase SDK:', err);
    showToast('⚠️ Firebase SDK failed to load. Using local storage.', 'warning');
    _showSyncBadge('local');
  });

  function _loadScript(src) {
    return new Promise((res, rej) => {
      if (document.querySelector(`script[src="${src}"]`)) { res(); return; }
      const s = document.createElement('script');
      s.src = src;
      s.onload = res;
      s.onerror = rej;
      document.head.appendChild(s);
    });
  }

  function _initFirebase(config) {
    try {
      // Initialize (avoid re-init if already done)
      const app = firebase.apps.length
        ? firebase.apps[0]
        : firebase.initializeApp(config);

      const db  = firebase.database(app);
      const ref = db.ref('school_erp');

      let _isSaving    = false;
      let _lastLocalTs = null;
      let _synced      = false;

      // ── 1. Initial pull from Firebase ──────────────────────
      ref.once('value').then(snap => {
        const fbData = snap.val();
        if (fbData) {
          // Merge Firebase data with local, Firebase wins for newer data
          const local = window.ERP.loadData();
          const fbTs  = fbData.settings && fbData.settings.updatedAt;
          const lcTs  = local.settings && local.settings.updatedAt;

          if (!lcTs || (fbTs && fbTs > lcTs)) {
            // Firebase is newer — update localStorage
            localStorage.setItem(window.ERP.STORAGE_KEY, JSON.stringify(fbData));
            console.log('%c[SparkEdge Firebase] Pulled newer data from cloud.', 'color:#14B8A6;');
            showToast('☁️ Data synced from cloud!', 'success', 2500);
            // Reload page if we're past login
            if (!document.getElementById('loginScreen') ||
                document.getElementById('loginScreen').style.display === 'none') {
              setTimeout(() => location.reload(), 800);
            }
          } else {
            console.log('%c[SparkEdge Firebase] Local data is up to date.', 'color:#14B8A6;');
          }
        } else {
          // Firebase is empty — push local data up
          const local = window.ERP.loadData();
          _pushToFirebase(ref, local);
          console.log('%c[SparkEdge Firebase] Pushed local data to new Firebase DB.', 'color:#14B8A6;');
        }
        _synced = true;
        _showSyncBadge('cloud');
      }).catch(err => {
        console.error('[SparkEdge Firebase] Pull failed:', err);
        _showSyncBadge('error');
      });

      // ── 2. Real-time listener (other device changed data) ───
      ref.on('value', snap => {
        if (!_synced || _isSaving) return; // Ignore initial pull & own saves
        const fbData = snap.val();
        if (!fbData) return;
        const fbTs = fbData.settings && fbData.settings.updatedAt;
        if (!fbTs) return;
        if (fbTs === _lastLocalTs) return; // Same as what we just saved

        const local = window.ERP.loadData();
        const lcTs  = local.settings && local.settings.updatedAt;

        if (fbTs > (lcTs||'')) {
          localStorage.setItem(window.ERP.STORAGE_KEY, JSON.stringify(fbData));
          _lastLocalTs = fbTs;
          _showSyncBadge('cloud', true);
          showToast('☁️ Data updated by another device!', 'info', 3000);
          // Trigger ERP refresh if available
          if (typeof window._onFirebaseUpdate === 'function') {
            window._onFirebaseUpdate(fbData);
          }
        }
      });

      // ── 3. saveData hook — push to Firebase on every save ──
      window._firebaseSaveData = function(data) {
        if (!_synced) return;
        _isSaving = true;
        _lastLocalTs = data.settings.updatedAt;
        _pushToFirebase(ref, data).then(() => {
          _isSaving = false;
          _showSyncBadge('cloud', true);
        }).catch(err => {
          _isSaving = false;
          console.error('[SparkEdge Firebase] Save failed:', err);
          _showSyncBadge('error');
          showToast('❌ Cloud save failed. Data saved locally.', 'error');
        });
      };

      console.log('%c[SparkEdge Firebase] ✅ Real-time sync active!', 'color:#22C55E;font-weight:800;');

    } catch(err) {
      console.error('[SparkEdge Firebase] Init error:', err);
      showToast('❌ Firebase init failed: ' + err.message, 'error');
      _showSyncBadge('error');
    }
  }

  function _pushToFirebase(ref, data) {
    // Remove base64 photos from Firebase (too large) — keep them in localStorage only
    const clean = JSON.parse(JSON.stringify(data));
    if (clean.teachers) clean.teachers = clean.teachers.map(t => { const c={...t}; delete c.photo; return c; });
    if (clean.students) clean.students = clean.students.map(s => { const c={...s}; delete c.photo; return c; });
    if (clean.settings) { delete clean.settings.schoolLogo; delete clean.settings.principalSign; }
    return ref.set(clean);
  }

  // ── Sync status badge ─────────────────────────────────────
  function _showSyncBadge(state, pulse) {
    let badge = document.getElementById('_fb_sync_badge');
    if (!badge) {
      badge = document.createElement('div');
      badge.id = '_fb_sync_badge';
      badge.style.cssText = [
        'position:fixed', 'bottom:52px', 'right:16px', 'z-index:9989',
        'display:flex', 'align-items:center', 'gap:5px',
        'padding:4px 10px', 'border-radius:20px',
        "font-family:'DM Sans',system-ui,sans-serif",
        'font-size:10px', 'font-weight:700',
        'cursor:default', 'user-select:none',
        'transition:all .3s ease',
      ].join(';');
      document.body.appendChild(badge);
    }

    const styles = {
      cloud: {
        bg: 'rgba(20,184,166,.12)', border: '1px solid rgba(20,184,166,.3)',
        color: '#14B8A6', dot: '#14B8A6',
        text: '☁️ Cloud Sync',
      },
      local: {
        bg: 'rgba(245,158,11,.1)', border: '1px solid rgba(245,158,11,.25)',
        color: '#F59E0B', dot: '#F59E0B',
        text: '💾 Local Only',
      },
      error: {
        bg: 'rgba(239,68,68,.1)', border: '1px solid rgba(239,68,68,.25)',
        color: '#EF4444', dot: '#EF4444',
        text: '⚠️ Sync Error',
      },
    };

    const st = styles[state] || styles.local;
    badge.style.background = st.bg;
    badge.style.border      = st.border;
    badge.style.color       = st.color;
    badge.innerHTML = `<span style="width:6px;height:6px;border-radius:50%;background:${st.dot};display:inline-block;${pulse?'animation:_fb_pulse 1s ease 3;':''}"></span>${st.text}`;

    // Inject pulse animation if needed
    if (pulse && !document.getElementById('_fb_anim')) {
      const sty = document.createElement('style');
      sty.id = '_fb_anim';
      sty.textContent = '@keyframes _fb_pulse{0%,100%{transform:scale(1);opacity:1}50%{transform:scale(1.6);opacity:.6}}';
      document.head.appendChild(sty);
    }
  }

})();
