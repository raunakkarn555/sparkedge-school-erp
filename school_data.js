/* ============================================================
   SparkEdge School ERP — school_data.js  v3.0
   © 2026 Raunak Karn · SparkEdge
   ▸ Include in every portal:  <script src="school_data.js"></script>
   ▸ GitHub Pages friendly — no backend needed
   ▸ Auth: ALL passwords hardcoded here → git push = live everywhere
   ▸ Data: localStorage + optional Firebase Realtime Database
   ============================================================

   ┌─────────────────────────────────────────────────────────┐
   │  HARDCODED EDITS NEEDED — READ CAREFULLY!               │
   │                                                         │
   │  1. OWNER_PASSWORD   → line ~40  (admin full access)    │
   │  2. STAFF_MEMBERS    → line ~50  (staff + permissions)  │
   │  3. TEACHER_ACCOUNTS → line ~90  (teacher portal login) │
   │  4. STUDENT_ACCOUNTS → line ~120 (student portal login) │
   │  5. FIREBASE_CONFIG  → line ~160 (optional cloud sync)  │
   │                                                         │
   │  After any change:  git add . → git commit → git push   │
   │  GitHub Pages rebuilds in ~60 sec → live for everyone   │
   └─────────────────────────────────────────────────────────┘
*/

/* ══════════════════════════════════════════════════════════════
   §1  HARDCODED AUTH — EDIT THIS SECTION
   ══════════════════════════════════════════════════════════════ */

// ── OWNER ──────────────────────────────────────────────────────
// Full access to admin panel + all portals
const OWNER_PASSWORD = 'Raunak@123';    // ← CHANGE THIS before going live
const OWNER_NAME     = 'School Admin';  // ← Displayed name after login

// ── STAFF / TEAM MEMBERS ──────────────────────────────────────
// These people log in to admin.html, fees.html, marks.html, etc.
// To add: copy a block, fill in unique id/name/password.
// To disable: set active: false
//
const STAFF_MEMBERS = [
  // ────── EXAMPLE — uncomment and edit ──────
  // {
  //   id:       'STF-2026-001',
  //   name:     'Priya Sharma',
  //   role:     'Accountant',
  //   password: 'Priya@2026',         // ← unique per staff member
  //   active:   true,
  //   permissions: {
  //     teachers:      false,
  //     students:      true,
  //     fees:          true,
  //     marks:         false,
  //     docs:          true,
  //     timetable:     false,
  //     announcements: true,
  //     export:        true,
  //     settings:      false,
  //   }
  // },
  // ──────────────────────────────────────────
  {
    id:       'STF-2026-001',
    name:     'Nitin Kumar',
    role:     'Manager',
    password: 'Nitin@123',
    active:   true,
    permissions: {
      teachers:      true,
      students:      true,
      fees:          true,
      marks:         true,
      docs:          true,
      timetable:     true,
      announcements: true,
      export:        true,
      settings:      false,
    }
  },
];

// ── TEACHER ACCOUNTS ──────────────────────────────────────────
// Powers teacher-login.html (separate teacher-facing portal)
// The `id` should match the teacher's record in teachers.html
// Teachers can view their class timetable, students, announcements
//
// STEP-BY-STEP TO ADD A TEACHER LOGIN:
//   1. Add the teacher in teachers.html → note auto-generated ID (TCH-YYYY-NNN)
//   2. Add a block below with that exact id and a password
//   3. git add . → git commit → git push
//   4. Teacher opens teacher-login.html, types their ID + password
//
const TEACHER_ACCOUNTS = [
  // ────── EXAMPLE — uncomment and edit ──────
  // {
  //   id:       'TCH-2026-001',    // ← copy exact ID from teachers.html
  //   password: 'Rahul@teacher',   // ← share with the teacher
  // },
  // ──────────────────────────────────────────
];

// ── STUDENT ACCOUNTS ──────────────────────────────────────────
// Powers student-login.html
// The `id` MUST exactly match the student's id in students.html
//
// STEP-BY-STEP TO ADD A STUDENT LOGIN:
//   1. Enroll the student in students.html
//   2. Note their auto-generated ID (STU-YYYY-NNN)
//   3. Add a block below with that exact id and a password
//   4. git add . → git commit → git push
//   5. Student opens student-login.html, types their ID + password
//
const STUDENT_ACCOUNTS = [
  // ────── EXAMPLE — uncomment and edit ──────
  // {
  //   id:       'STU-2026-001',   // ← copy exact id from students.html
  //   password: 'Ananya@01',      // ← share this with the student/guardian
  // },
  // ──────────────────────────────────────────
];


/* ══════════════════════════════════════════════════════════════
   §2  FIREBASE CONFIG — OPTIONAL CLOUD SYNC
   ══════════════════════════════════════════════════════════════
   Leave all values as empty strings '' to use localStorage only.
   To enable Firebase:
     1. Go to https://console.firebase.google.com
     2. Create project → Realtime Database → Create database
     3. Copy your config values below
     4. In Firebase Console: Rules → set to:
        { "rules": { ".read": true, ".write": true } }  ← for testing
        (Tighten rules before production!)
     5. git commit & push — all devices now share data live!
   ══════════════════════════════════════════════════════════════ */

const FIREBASE_CONFIG = {
  apiKey:            'AIzaSyBeOWntOYE-E-nKBdEpgT3i2CgMTkoh4as',
  authDomain:        'my-school-erp-d15d2.firebaseapp.com',
  databaseURL:       'https://my-school-erp-d15d2-default-rtdb.firebaseio.com',
  projectId:         'my-school-erp-d15d2',
  storageBucket:     'my-school-erp-d15d2.firebasestorage.app',
  messagingSenderId: '602190023012',
  appId:             '1:602190023012:web:ef515b74e0483990e81271',
};


/* ══════════════════════════════════════════════════════════════
   §3  AUTH FUNCTIONS
   ══════════════════════════════════════════════════════════════ */

function authenticateAdmin(password) {
  if (password === OWNER_PASSWORD) {
    return {
      id: 'owner', name: OWNER_NAME, role: 'Owner', isOwner: true,
      permissions: { teachers:true, students:true, fees:true, marks:true,
        docs:true, timetable:true, announcements:true, export:true, settings:true }
    };
  }
  const m = STAFF_MEMBERS.find(x => x.password === password && x.active !== false);
  if (m) return { id:m.id, name:m.name, role:m.role, isOwner:false, permissions:m.permissions||{} };
  return null;
}

function authenticateTeacher(teacherId, password) {
  const acc = TEACHER_ACCOUNTS.find(a => a.id === teacherId && a.password === password);
  if (!acc) return null;
  return loadData().teachers.find(t => t.id === teacherId && t.active !== false) || null;
}

function authenticateStudent(studentId, password) {
  const acc = STUDENT_ACCOUNTS.find(a => a.id === studentId && a.password === password);
  if (!acc) return null;
  return loadData().students.find(s => s.id === studentId && s.active !== false) || null;
}

function getStaffList() {
  return STAFF_MEMBERS.filter(m => m.active !== false).map(m => ({
    id:m.id, name:m.name, role:m.role, permissions:m.permissions||{}
  }));
}
function getTeacherAccountIDs() { return TEACHER_ACCOUNTS.map(a => a.id); }
function getStudentAccountIDs() { return STUDENT_ACCOUNTS.map(a => a.id); }


/* ══════════════════════════════════════════════════════════════
   §4  SESSION (sessionStorage — clears on tab close)
   ══════════════════════════════════════════════════════════════ */

/* Session stored in localStorage with 12-hour expiry so all tabs share login */
const _SESSION_TTL = 12 * 60 * 60 * 1000; // 12 hours in ms
function _setSession(key, val) {
  try { localStorage.setItem(key, JSON.stringify({ v: val, exp: Date.now() + _SESSION_TTL })); } catch(e){}
}
function _getSession(key) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const p = JSON.parse(raw);
    if (p.exp && Date.now() > p.exp) { localStorage.removeItem(key); return null; }
    return p.v;
  } catch(e){ return null; }
}
function setAdminSession(u)    { _setSession('erp_admin', u); }
function getAdminSession()     { return _getSession('erp_admin'); }
function setTeacherSession(t)  { _setSession('erp_teacher', t); }
function getTeacherSession()   { return _getSession('erp_teacher'); }
function setStudentSession(s)  { _setSession('erp_stu', s); }
function getStudentSession()   { return _getSession('erp_stu'); }
function logoutAdmin()         { localStorage.removeItem('erp_admin');   window.location.href='admin.html'; }
function logoutTeacher()       { localStorage.removeItem('erp_teacher'); window.location.href='teacher-login.html'; }
function logoutStudent()       { localStorage.removeItem('erp_stu');     window.location.href='student-login.html'; }

function requireAdminLogin(redir) {
  const u = getAdminSession();
  if (!u) { window.location.href = redir||'admin.html'; return null; }
  return u;
}
function requireTeacherLogin(redir) {
  const t = getTeacherSession();
  if (!t) { window.location.href = redir||'teacher-login.html'; return null; }
  return t;
}
function requireStudentLogin(redir) {
  const s = getStudentSession();
  if (!s) { window.location.href = redir||'student-login.html'; return null; }
  return s;
}


/* ══════════════════════════════════════════════════════════════
   §5  DATA SCHEMA
   ══════════════════════════════════════════════════════════════ */

const STORAGE_KEY = 'school_erp_data';

const DEFAULT_SCHEMA = {
  settings: {
    schoolName:'My School', schoolTagline:'Empowering Minds, Shaping Futures',
    schoolAddress:'', schoolPhone:'', schoolEmail:'',
    schoolLogo:'', principalName:'', principalSign:'', affiliationNo:'', schoolCode:'',
    sessionStart:'April', sessionEnd:'March', currentSession:'2025-26',
    classes:['Nursery','LKG','UKG','1','2','3','4','5','6','7','8','9','10','11','12'],
    sections:['A','B','C','D'],
    subjects:['English','Hindi','Mathematics','Science','Social Studies','Computer','Physical Education','Art','Music'],
    setupDone:false, updatedAt:'',
  },
  teachers:[],
  students:[],
  feeStructures:[],
  feePayments:[],
  exams:[],
  marks:[],
  documents:[],
  announcements:[],
  timetable:[],
};


/* ══════════════════════════════════════════════════════════════
   §6  CORE DATA FUNCTIONS (localStorage + Firebase overlay)
   ══════════════════════════════════════════════════════════════ */

function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return _deepClone(DEFAULT_SCHEMA);
    return _mergeSchema(_deepClone(DEFAULT_SCHEMA), JSON.parse(raw));
  } catch(e) { return _deepClone(DEFAULT_SCHEMA); }
}

function saveData(data) {
  try {
    data.settings.updatedAt = new Date().toISOString();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    // Firebase sync (if enabled — firebase_sync.js handles this)
    if (window._firebaseSaveData) window._firebaseSaveData(data);
    return true;
  } catch(e) { showToast('❌ Save failed — storage full?','error'); return false; }
}

function exportData() {
  try {
    const blob = new Blob([JSON.stringify(loadData(),null,2)],{type:'application/json'});
    const a    = Object.assign(document.createElement('a'),{
      href:     URL.createObjectURL(blob),
      download: `school-data-${new Date().toISOString().slice(0,10)}.json`
    });
    document.body.appendChild(a); a.click();
    document.body.removeChild(a); URL.revokeObjectURL(a.href);
    showToast('✅ Data exported!','success');
  } catch(e) { showToast('❌ Export failed.','error'); }
}

function importData(jsonStr) {
  try {
    const inc    = JSON.parse(jsonStr);
    const merged = _deepClone(loadData());
    if (inc.settings) {
      Object.entries(inc.settings).forEach(([k,v]) => { if(v!==undefined&&v!==null&&v!=='') merged.settings[k]=v; });
    }
    const ARR = ['teachers','students','feeStructures','feePayments','exams','marks','documents','announcements','timetable'];
    ARR.forEach(key => {
      if (!Array.isArray(inc[key])) return;
      if (!Array.isArray(merged[key])) merged[key]=[];
      inc[key].forEach(item => {
        if (!item.id) return;
        const i = merged[key].findIndex(e=>e.id===item.id);
        i>-1 ? (merged[key][i]={...merged[key][i],...item}) : merged[key].push(item);
      });
    });
    return merged;
  } catch(e) { showToast('❌ Import failed — invalid JSON.','error'); return null; }
}


/* ══════════════════════════════════════════════════════════════
   §7  ID GENERATOR  →  PREFIX-YYYY-NNN  e.g. STU-2026-007
   ══════════════════════════════════════════════════════════════ */

const _PM = { TCH:'teachers',STU:'students',FST:'feeStructures',RCP:'feePayments',
              EXM:'exams',MRK:'marks',DOC:'documents',ANN:'announcements',TTB:'timetable' };

function generateID(prefix) {
  const yr  = new Date().getFullYear();
  const arr = loadData()[_PM[prefix]] || [];
  let max   = 0;
  arr.forEach(x => {
    if (x.id&&x.id.startsWith(prefix+'-')) {
      const n=parseInt(x.id.split('-').pop(),10); if(!isNaN(n)&&n>max) max=n;
    }
  });
  return `${prefix}-${yr}-${String(max+1).padStart(3,'0')}`;
}


/* ══════════════════════════════════════════════════════════════
   §8  LOOKUP HELPERS
   ══════════════════════════════════════════════════════════════ */

function getStudent(id)               { return loadData().students.find(s=>s.id===id)||null; }
function getTeacher(id)               { return loadData().teachers.find(t=>t.id===id)||null; }
function getStudentsByClass(cls,sec)  { return loadData().students.filter(s=>s.active!==false&&s.class===cls&&(!sec||s.section===sec)); }
function getStudentMarks(sid)         { return loadData().marks.filter(m=>m.studentId===sid); }
function getStudentPayments(sid)      { return loadData().feePayments.filter(p=>p.studentId===sid); }
function getStudentFeeStatus(sid)     {
  const pp = getStudentPayments(sid);
  return {
    paid:    pp.filter(p=>p.status==='Paid').reduce((s,p)=>s+(p.netAmount||0),0),
    partial: pp.filter(p=>p.status==='Partial').reduce((s,p)=>s+(p.balance||0),0),
    due:     pp.filter(p=>p.status==='Due').reduce((s,p)=>s+(p.netAmount||0),0),
  };
}
function getActiveAnnouncements(role) {
  const today = new Date().toISOString().slice(0,10);
  return loadData().announcements.filter(a=>
    a.active && (a.targetRole==='All'||a.targetRole===role) &&
    (!a.expiryDate||a.expiryDate>=today)
  );
}


/* ══════════════════════════════════════════════════════════════
   §9  GRADE & RESULT
   ══════════════════════════════════════════════════════════════ */

function getGrade(pct) {
  if(pct>=91)return'A+'; if(pct>=81)return'A';  if(pct>=71)return'B+';
  if(pct>=61)return'B';  if(pct>=51)return'C';  if(pct>=33)return'D'; return'F';
}
function computeResult(subjectMarks) {
  let tMax=0,tGot=0,fail=false;
  subjectMarks.forEach(sm=>{ tMax+=(sm.maxMarks||0); tGot+=(sm.marksObtained||0); if((sm.marksObtained||0)<(sm.passingMarks||33))fail=true; });
  const pct=tMax>0?Math.round(tGot/tMax*1000)/10:0;
  return { totalMax:tMax, totalObtained:tGot, percentage:pct, overallGrade:getGrade(pct), result:(fail||pct<33)?'Fail':'Pass' };
}


/* ══════════════════════════════════════════════════════════════
   §10  FORMAT HELPERS
   ══════════════════════════════════════════════════════════════ */

function fmtDate(d)    { if(!d)return'—'; try{return new Date(d).toLocaleDateString('en-IN',{day:'2-digit',month:'2-digit',year:'numeric'});}catch(e){return d;} }
function fmtMoney(n)   { return'₹'+Number(n||0).toLocaleString('en-IN'); }
function getInitials(s){ return(s||'').split(' ').map(w=>w[0]).join('').toUpperCase().slice(0,2)||'?'; }
function todayStr()    { return new Date().toISOString().slice(0,10); }
function ordinal(n)    { const s=['th','st','nd','rd'],v=n%100; return n+(s[(v-20)%10]||s[v]||s[0]); }


/* ══════════════════════════════════════════════════════════════
   §11  DOCUMENT GENERATOR
   ══════════════════════════════════════════════════════════════ */

function downloadDocHTML(htmlContent, filename) {
  const fname = filename.endsWith('.html')?filename:filename+'.html';
  const win   = window.open('','_blank');
  if (!win) { showToast('⚠️ Allow popups to preview documents.','warning'); return; }
  win.document.write(`<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>${filename}</title>
<style>
  body{font-family:'Times New Roman',Times,serif;background:#fff;color:#000;margin:0;padding:20px;}
  @media print{.no-print{display:none!important;}body{padding:0;}@page{margin:15mm;}}
  .action-bar{position:fixed;top:12px;right:12px;display:flex;gap:8px;z-index:999;font-family:system-ui,sans-serif;}
  .action-bar button{padding:8px 16px;border:none;border-radius:8px;font-size:13px;font-weight:700;cursor:pointer;}
  .btn-p{background:#FF6B35;color:#fff;} .btn-s{background:#22C55E;color:#fff;} .btn-c{background:#333;color:#fff;}
</style></head><body>
<div class="action-bar no-print">
  <button class="btn-p" onclick="window.print()">🖨️ Print</button>
  <button class="btn-s" onclick="_dl()">💾 Save HTML</button>
  <button class="btn-c" onclick="window.close()">✕ Close</button>
</div>
${htmlContent}
<script>function _dl(){const b=new Blob([document.documentElement.outerHTML],{type:'text/html'});const a=document.createElement('a');a.href=URL.createObjectURL(b);a.download='${fname}';a.click();}<\/script>
</body></html>`);
  win.document.close();
}


/* ══════════════════════════════════════════════════════════════
   §12  TOAST
   ══════════════════════════════════════════════════════════════ */

(function(){
  if(document.getElementById('_erp_ts'))return;
  const s=document.createElement('style');s.id='_erp_ts';
  s.textContent=`#_erp_tw{position:fixed;bottom:22px;right:22px;z-index:99999;display:flex;flex-direction:column;gap:9px;align-items:flex-end;pointer-events:none;}
  .erpt{display:flex;align-items:center;gap:9px;padding:11px 15px;border-radius:10px;font-family:'DM Sans',system-ui,sans-serif;font-size:13px;font-weight:600;box-shadow:0 8px 28px rgba(0,0,0,.4);transform:translateX(110px);opacity:0;transition:transform .28s cubic-bezier(.34,1.56,.64,1),opacity .28s ease;pointer-events:all;max-width:340px;line-height:1.4;backdrop-filter:blur(12px);}
  .erpt.in{transform:none;opacity:1;}.erpt.out{transform:translateX(110px);opacity:0;}
  .erpt.success{background:#0A1A10;border:1px solid rgba(34,197,94,.4);color:#22C55E;}
  .erpt.error{background:#1A0A0A;border:1px solid rgba(239,68,68,.4);color:#EF4444;}
  .erpt.info{background:#0A0E1A;border:1px solid rgba(59,130,246,.4);color:#3B82F6;}
  .erpt.warning{background:#1A140A;border:1px solid rgba(245,158,11,.4);color:#F59E0B;}
  .erpt-x{background:none;border:none;color:inherit;opacity:.5;cursor:pointer;font-size:15px;line-height:1;padding:0 2px;flex-shrink:0;pointer-events:all;}
  .erpt-x:hover{opacity:1;}`;
  document.head.appendChild(s);
})();

function _tw(){let w=document.getElementById('_erp_tw');if(!w){w=document.createElement('div');w.id='_erp_tw';document.body.appendChild(w);}return w;}

function showToast(msg,type,dur){
  type=type||'success';dur=dur||3500;
  const icons={success:'✅',error:'❌',info:'ℹ️',warning:'⚠️'};
  const t=document.createElement('div');t.className='erpt '+type;
  t.innerHTML=`<span>${icons[type]||'ℹ️'}</span><span style="flex:1">${msg}</span><button class="erpt-x" onclick="this.parentElement._bye()">✕</button>`;
  t._bye=()=>{t.classList.add('out');setTimeout(()=>t.remove(),300);};
  _tw().appendChild(t);
  requestAnimationFrame(()=>requestAnimationFrame(()=>t.classList.add('in')));
  setTimeout(()=>{if(t.parentElement)t._bye();},dur);
}


/* ══════════════════════════════════════════════════════════════
   §13  CONFIRM DIALOG
   ══════════════════════════════════════════════════════════════ */

(function(){
  if(document.getElementById('_erp_cf'))return;
  const d=document.createElement('div');d.id='_erp_cf';
  d.style.cssText='display:none;position:fixed;inset:0;background:rgba(0,0,0,.72);z-index:9998;align-items:center;justify-content:center;padding:16px;';
  d.innerHTML=`<div style="background:#0E0E1A;border:1px solid #2A2A40;border-radius:14px;width:100%;max-width:380px;overflow:hidden;">
    <div style="padding:22px 22px 10px;"><div id="_cf_t" style="font-family:'Syne',system-ui,sans-serif;font-size:15px;font-weight:800;color:#F0F0FA;margin-bottom:8px;"></div><div id="_cf_m" style="font-size:13px;color:#7A7A9A;line-height:1.6;"></div></div>
    <div style="padding:14px 22px;display:flex;gap:10px;justify-content:flex-end;">
      <button id="_cf_no"  style="background:#141422;border:1px solid #1E1E30;border-radius:8px;padding:9px 18px;font-family:'DM Sans',system-ui,sans-serif;font-size:13px;font-weight:600;color:#7A7A9A;cursor:pointer;">Cancel</button>
      <button id="_cf_yes" style="background:linear-gradient(135deg,#EF4444,#B91C1C);border:none;border-radius:8px;padding:9px 20px;font-family:'DM Sans',system-ui,sans-serif;font-size:13px;font-weight:700;color:#fff;cursor:pointer;">Confirm</button>
    </div></div>`;
  document.body.appendChild(d);
})();

function erp_confirm(msg,onOk,title){
  const ov=document.getElementById('_erp_cf');
  if(!ov){if(window.confirm(msg))onOk();return;}
  document.getElementById('_cf_t').textContent=title||'Are you sure?';
  document.getElementById('_cf_m').textContent=msg;
  ov.style.display='flex';
  const close=()=>{ov.style.display='none';};
  document.getElementById('_cf_yes').onclick=()=>{close();onOk();};
  document.getElementById('_cf_no').onclick=close;
  ov.onclick=e=>{if(e.target===ov)close();};
}


/* ══════════════════════════════════════════════════════════════
   §14  IMPORT MODAL
   ══════════════════════════════════════════════════════════════ */

(function(){
  if(document.getElementById('_erp_im'))return;
  const d=document.createElement('div');d.id='_erp_im';
  d.style.cssText='display:none;position:fixed;inset:0;background:rgba(0,0,0,.72);z-index:9990;align-items:center;justify-content:center;padding:16px;';
  d.innerHTML=`<div style="background:#0E0E1A;border:1px solid #2A2A40;border-radius:16px;width:100%;max-width:520px;max-height:90vh;overflow-y:auto;animation:_imin .2s ease;">
    <style>@keyframes _imin{from{transform:scale(.95);opacity:0}to{transform:scale(1);opacity:1}}</style>
    <div style="padding:18px 22px;border-bottom:1px solid #1E1E30;display:flex;align-items:center;justify-content:space-between;">
      <div style="font-family:'Syne',system-ui,sans-serif;font-size:16px;font-weight:800;color:#F0F0FA;">⬆ Import Data</div>
      <button onclick="ERP.closeImportModal()" style="background:none;border:none;color:#7A7A9A;font-size:20px;cursor:pointer;line-height:1;">✕</button>
    </div>
    <div style="padding:20px 22px;display:flex;flex-direction:column;gap:14px;">
      <p style="font-size:13px;color:#7A7A9A;line-height:1.7;margin:0;">Paste or upload a <strong style="color:#F0F0FA;">school-data-*.json</strong> export file.</p>
      <textarea id="_im_ta" style="background:#141422;border:1px solid #1E1E30;border-radius:8px;padding:10px 12px;font-family:monospace;font-size:11px;color:#F0F0FA;min-height:140px;resize:vertical;outline:none;line-height:1.5;width:100%;" placeholder='{"settings":{...},"students":[...],...}'></textarea>
      <label style="font-size:12px;font-weight:600;color:#7A7A9A;cursor:pointer;background:#141422;border:1px solid #1E1E30;border-radius:8px;padding:8px 14px;display:inline-flex;align-items:center;gap:8px;width:fit-content;">
        📂 Upload .json file
        <input type="file" accept=".json" onchange="ERP._imFile(event)" style="display:none"/>
      </label>
    </div>
    <div style="padding:14px 22px;border-top:1px solid #1E1E30;display:flex;gap:10px;justify-content:flex-end;">
      <button onclick="ERP.closeImportModal()" style="background:#141422;border:1px solid #1E1E30;border-radius:8px;padding:9px 18px;font-family:'DM Sans',system-ui,sans-serif;font-size:13px;font-weight:600;color:#7A7A9A;cursor:pointer;">Cancel</button>
      <button onclick="ERP._doImport()" style="background:linear-gradient(135deg,#FF6B35,#FF3CAC);border:none;border-radius:8px;padding:9px 20px;font-family:'DM Sans',system-ui,sans-serif;font-size:13px;font-weight:700;color:#fff;cursor:pointer;">Import & Merge</button>
    </div>
  </div>`;
  document.body.appendChild(d);
})();


/* ══════════════════════════════════════════════════════════════
   §15  INTERNAL UTILS
   ══════════════════════════════════════════════════════════════ */

function _deepClone(o){ return JSON.parse(JSON.stringify(o)); }
function _mergeSchema(def,saved){
  const out={...def};
  Object.keys(saved).forEach(k=>{
    if(Array.isArray(saved[k]))out[k]=saved[k];
    else if(saved[k]&&typeof saved[k]==='object')out[k]={...def[k],...saved[k]};
    else out[k]=saved[k];
  });
  return out;
}


/* ══════════════════════════════════════════════════════════════
   §16  PUBLIC API — window.ERP
   ══════════════════════════════════════════════════════════════ */

window.ERP = {
  // ── Auth ──────────────────────────────────────
  authenticateAdmin, authenticateTeacher, authenticateStudent,
  getStaffList, getTeacherAccountIDs, getStudentAccountIDs,
  setAdminSession,   getAdminSession,
  setTeacherSession, getTeacherSession,
  setStudentSession, getStudentSession,
  logoutAdmin, logoutTeacher, logoutStudent,
  requireAdminLogin, requireTeacherLogin, requireStudentLogin,
  OWNER_NAME,

  // ── Data ──────────────────────────────────────
  loadData, saveData, exportData, importData, generateID,
  STORAGE_KEY, DEFAULT_SCHEMA,

  // ── Lookups ───────────────────────────────────
  getStudent, getTeacher, getStudentsByClass,
  getStudentMarks, getStudentPayments, getStudentFeeStatus,
  getActiveAnnouncements,

  // ── Compute ───────────────────────────────────
  getGrade, computeResult,

  // ── Format ────────────────────────────────────
  fmtDate, fmtMoney, getInitials, todayStr, ordinal,

  // ── Docs ──────────────────────────────────────
  downloadDocHTML,

  // ── UI ────────────────────────────────────────
  showToast,
  confirm: erp_confirm,

  openImportModal()  { const e=document.getElementById('_erp_im'); if(e)e.style.display='flex'; },
  closeImportModal() { const e=document.getElementById('_erp_im'); if(e)e.style.display='none'; const t=document.getElementById('_im_ta');if(t)t.value=''; },
  _imFile(evt) { const f=evt.target.files[0];if(!f)return;const r=new FileReader();r.onload=e=>{const t=document.getElementById('_im_ta');if(t)t.value=e.target.result;};r.readAsText(f); },
  _doImport() {
    const ta=document.getElementById('_im_ta');
    if(!ta||!ta.value.trim()){showToast('⚠️ Paste or upload JSON first.','warning');return;}
    const merged=importData(ta.value.trim());
    if(!merged)return;
    saveData(merged);
    showToast('✅ Imported & merged!','success');
    ERP.closeImportModal();
    if(typeof ERP.onImportSuccess==='function')ERP.onImportSuccess(merged);
    else setTimeout(()=>location.reload(),700);
  },
  onImportSuccess: null,

  // ── Firebase config (read by firebase_sync.js) ─
  FIREBASE_CONFIG,
};

// Convenience globals
window.loadData   = loadData;
window.saveData   = saveData;
window.showToast  = showToast;
window.generateID = generateID;
window.fmtDate    = fmtDate;
window.fmtMoney   = fmtMoney;
window.getGrade   = getGrade;

console.log('%c[SparkEdge ERP] school_data.js v3 ✓  Staff:'+STAFF_MEMBERS.length+'  Teachers:'+TEACHER_ACCOUNTS.length+'  Students:'+STUDENT_ACCOUNTS.length,'color:#FF6B35;font-weight:800;font-size:12px;');
