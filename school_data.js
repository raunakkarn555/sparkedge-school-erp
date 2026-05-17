/* ============================================================
   SCHOOL ERP — school_data.js  v2.1
   SparkEdge · © 2026 Raunak Karn · All rights reserved
   ▸ Include in every portal:  <script src="school_data.js"></script>
   ▸ GitHub Pages friendly — no backend, no server needed
   ▸ Auth: ALL passwords hardcoded here → git push = live everywhere
   ▸ Data: localStorage (school_erp_data) → export / import JSON
   ============================================================

   ┌─────────────────────────────────────────────────────────┐
   │  HOW TO ADD / CHANGE PASSWORDS  (read this carefully!)  │
   │                                                         │
   │  OWNER password  →  edit OWNER_PASSWORD below           │
   │  STAFF members   →  add blocks in STAFF_MEMBERS array   │
   │  STUDENTS        →  add blocks in STUDENT_ACCOUNTS      │
   │                                                         │
   │  After any change:  git add . → git commit → git push   │
   │  GitHub Pages rebuilds in ~60 sec → link works for all  │
   └─────────────────────────────────────────────────────────┘
*/

(function (global) {
'use strict';

/* ══════════════════════════════════════════════════════════════
   §1  HARDCODED AUTH — EDIT THIS SECTION
   ══════════════════════════════════════════════════════════════ */

// ── OWNER ──────────────────────────────────────────────────────
// Full access: Settings, Team, every portal
const OWNER_PASSWORD = 'Raunak@123';    // ← CHANGE THIS
const OWNER_NAME     = 'School Admin';  // ← displayed after login

// ── STAFF / TEAM MEMBERS ──────────────────────────────────────
// Each person opens admin.html and logs in with their password.
// To add a member: copy one block, fill in unique id/name/password.
// To disable: set active: false  (do NOT delete the block).
//
const STAFF_MEMBERS = [
  // ────── EXAMPLE — delete or uncomment ──────
  // {
  //   id:       'STF-2025-001',
  //   name:     'Priya Sharma',
  //   role:     'Accountant',
  //   password: 'Priya@2025',
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
];

// ── STUDENT ACCOUNTS ──────────────────────────────────────────
// Powers student-login.html. `id` MUST match student's id in data store.
//
const STUDENT_ACCOUNTS = [
  // ────── EXAMPLE — delete or uncomment ──────
  // { id: 'STU-2025-001', password: 'Ananya@01' },
  // { id: 'STU-2025-002', password: 'Rahul@22'  },
];


/* ══════════════════════════════════════════════════════════════
   §2  INTERNAL HELPERS
   ══════════════════════════════════════════════════════════════ */

function _deepClone(obj) {
  try { return JSON.parse(JSON.stringify(obj)); } catch(e) { return obj; }
}

function _mergeSchema(base, incoming) {
  if (!incoming || typeof incoming !== 'object') return base;
  // Merge settings shallowly
  if (incoming.settings && typeof incoming.settings === 'object') {
    Object.keys(incoming.settings).forEach(k => {
      if (incoming.settings[k] !== undefined) base.settings[k] = incoming.settings[k];
    });
  }
  // Merge arrays
  const ARR = ['teachers','students','feeStructures','feePayments','exams','marks','documents','announcements','timetable'];
  ARR.forEach(key => {
    if (Array.isArray(incoming[key])) base[key] = incoming[key];
  });
  return base;
}


/* ══════════════════════════════════════════════════════════════
   §3  DATA SCHEMA
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
   §4  TOAST UI
   ══════════════════════════════════════════════════════════════ */

(function injectToastStyles(){
  if (document.getElementById('_erp_toast_style')) return;
  const s = document.createElement('style');
  s.id = '_erp_toast_style';
  s.textContent = `
    #_erp_tw{position:fixed;bottom:22px;right:22px;z-index:99999;display:flex;flex-direction:column;gap:9px;align-items:flex-end;pointer-events:none;}
    .erpt{display:flex;align-items:center;gap:9px;padding:11px 15px;border-radius:10px;font-family:'DM Sans',system-ui,sans-serif;font-size:13px;font-weight:600;box-shadow:0 8px 28px rgba(0,0,0,.4);transform:translateX(110px);opacity:0;transition:transform .28s cubic-bezier(.34,1.56,.64,1),opacity .28s ease;pointer-events:all;max-width:340px;line-height:1.4;}
    .erpt.in{transform:none;opacity:1;}.erpt.out{transform:translateX(110px);opacity:0;}
    .erpt.success{background:#0A1A10;border:1px solid rgba(34,197,94,.4);color:#22C55E;}
    .erpt.error{background:#1A0A0A;border:1px solid rgba(239,68,68,.4);color:#EF4444;}
    .erpt.info{background:#0A0E1A;border:1px solid rgba(59,130,246,.4);color:#3B82F6;}
    .erpt.warning{background:#1A140A;border:1px solid rgba(245,158,11,.4);color:#F59E0B;}
    .erpt-x{background:none;border:none;color:inherit;opacity:.5;cursor:pointer;font-size:15px;line-height:1;padding:0 2px;}
    .erpt-x:hover{opacity:1;}
    /* Import Modal */
    #_erp_import_modal{display:none;position:fixed;inset:0;background:rgba(0,0,0,.75);z-index:99990;align-items:center;justify-content:center;padding:16px;}
    #_erp_import_modal.open{display:flex;}
    #_erp_import_inner{background:#0E0E1A;border:1px solid #1E1E30;border-radius:16px;width:100%;max-width:520px;overflow:hidden;font-family:'DM Sans',system-ui,sans-serif;}
    #_erp_import_inner .imp-hdr{padding:18px 22px;border-bottom:1px solid #1E1E30;display:flex;align-items:center;justify-content:space-between;}
    #_erp_import_inner .imp-title{font-family:'Syne',system-ui,sans-serif;font-size:16px;font-weight:800;color:#F0F0FA;}
    #_erp_import_inner .imp-body{padding:22px;display:flex;flex-direction:column;gap:12px;}
    #_erp_import_inner .imp-foot{padding:14px 22px;border-top:1px solid #1E1E30;display:flex;gap:10px;justify-content:flex-end;}
    /* Confirm Modal */
    #_erp_confirm_modal{display:none;position:fixed;inset:0;background:rgba(0,0,0,.75);z-index:99991;align-items:center;justify-content:center;padding:16px;}
    #_erp_confirm_modal.open{display:flex;}
    #_erp_confirm_inner{background:#0E0E1A;border:1px solid #1E1E30;border-radius:16px;width:100%;max-width:400px;overflow:hidden;font-family:'DM Sans',system-ui,sans-serif;}
  `;
  document.head.appendChild(s);
})();

function _getToastWrap() {
  let w = document.getElementById('_erp_tw');
  if (!w) { w = document.createElement('div'); w.id = '_erp_tw'; document.body.appendChild(w); }
  return w;
}

function showToast(msg, type, dur) {
  type = type || 'success'; dur = dur || 3500;
  const icons = { success:'✅', error:'❌', info:'ℹ️', warning:'⚠️' };
  const t = document.createElement('div');
  t.className = 'erpt ' + type;
  t.innerHTML = `<span>${icons[type]||'ℹ️'}</span><span style="flex:1">${msg}</span><button class="erpt-x" onclick="this.parentElement._bye()">✕</button>`;
  t._bye = () => { t.classList.add('out'); setTimeout(() => t.remove(), 300); };
  _getToastWrap().appendChild(t);
  requestAnimationFrame(() => requestAnimationFrame(() => t.classList.add('in')));
  setTimeout(() => { if (t.parentElement) t._bye(); }, dur);
}


/* ══════════════════════════════════════════════════════════════
   §5  CONFIRM DIALOG
   ══════════════════════════════════════════════════════════════ */

let _confirmCallback = null;

function confirm(msg, onOk, title) {
  // Inject modal HTML if not present
  if (!document.getElementById('_erp_confirm_modal')) {
    const div = document.createElement('div');
    div.id = '_erp_confirm_modal';
    div.innerHTML = `
      <div id="_erp_confirm_inner">
        <div class="imp-hdr">
          <div class="imp-title" id="_erp_confirm_title">Confirm Action</div>
          <button onclick="ERP._closeConfirm()" style="background:none;border:none;color:#7A7A9A;cursor:pointer;font-size:18px;line-height:1;padding:4px;">✕</button>
        </div>
        <div class="imp-body">
          <div id="_erp_confirm_msg" style="font-size:14px;color:#7A7A9A;line-height:1.6;"></div>
        </div>
        <div class="imp-foot">
          <button onclick="ERP._closeConfirm()" style="background:#141422;border:1px solid #1E1E30;color:#7A7A9A;padding:8px 16px;border-radius:8px;font-family:'DM Sans',system-ui;font-size:13px;font-weight:600;cursor:pointer;">Cancel</button>
          <button onclick="ERP._doConfirm()" style="background:linear-gradient(135deg,#EF4444,#B91C1C);border:none;color:#fff;padding:8px 16px;border-radius:8px;font-family:'DM Sans',system-ui;font-size:13px;font-weight:700;cursor:pointer;">Confirm</button>
        </div>
      </div>`;
    document.body.appendChild(div);
  }
  _confirmCallback = onOk;
  document.getElementById('_erp_confirm_title').textContent = title || 'Confirm Action';
  document.getElementById('_erp_confirm_msg').textContent   = msg;
  document.getElementById('_erp_confirm_modal').classList.add('open');
}

function _closeConfirm() {
  const m = document.getElementById('_erp_confirm_modal');
  if (m) m.classList.remove('open');
  _confirmCallback = null;
}

function _doConfirm() {
  _closeConfirm();
  if (typeof _confirmCallback === 'function') _confirmCallback();
}


/* ══════════════════════════════════════════════════════════════
   §6  IMPORT MODAL
   ══════════════════════════════════════════════════════════════ */

function openImportModal() {
  if (!document.getElementById('_erp_import_modal')) {
    const div = document.createElement('div');
    div.id = '_erp_import_modal';
    div.innerHTML = `
      <div id="_erp_import_inner">
        <div class="imp-hdr">
          <div class="imp-title">📥 Import Data</div>
          <button onclick="ERP._closeImport()" style="background:none;border:none;color:#7A7A9A;cursor:pointer;font-size:18px;line-height:1;padding:4px;">✕</button>
        </div>
        <div class="imp-body">
          <div style="font-size:13px;color:#7A7A9A;line-height:1.7;background:rgba(245,158,11,.06);border:1px solid rgba(245,158,11,.2);border-radius:8px;padding:12px;">
            ⚠️ Importing will <strong style="color:#F0F0FA;">merge</strong> the incoming data with your current data. Existing records with matching IDs will be updated.
          </div>
          <div>
            <label style="font-size:11px;font-weight:700;letter-spacing:.5px;color:#7A7A9A;display:block;margin-bottom:6px;">UPLOAD JSON FILE</label>
            <input type="file" id="_erp_import_file" accept=".json" style="width:100%;background:#141422;border:1px solid #1E1E30;border-radius:8px;padding:9px 12px;color:#F0F0FA;font-family:'DM Sans',system-ui;font-size:13px;cursor:pointer;"/>
          </div>
          <div style="text-align:center;font-size:12px;color:#3A3A5A;">— or paste JSON below —</div>
          <textarea id="_erp_import_txt" rows="5" placeholder='Paste JSON here…' style="width:100%;background:#141422;border:1px solid #1E1E30;border-radius:8px;padding:10px 12px;color:#F0F0FA;font-family:monospace;font-size:12px;resize:vertical;outline:none;"></textarea>
        </div>
        <div class="imp-foot">
          <button onclick="ERP._closeImport()" style="background:#141422;border:1px solid #1E1E30;color:#7A7A9A;padding:8px 16px;border-radius:8px;font-family:'DM Sans',system-ui;font-size:13px;font-weight:600;cursor:pointer;">Cancel</button>
          <button onclick="ERP._doImport()" style="background:linear-gradient(135deg,#3B82F6,#1D4ED8);border:none;color:#fff;padding:8px 16px;border-radius:8px;font-family:'DM Sans',system-ui;font-size:13px;font-weight:700;cursor:pointer;">📥 Import & Merge</button>
        </div>
      </div>`;
    document.body.appendChild(div);

    // File input handler
    document.getElementById('_erp_import_file').addEventListener('change', function() {
      const f = this.files[0];
      if (!f) return;
      const reader = new FileReader();
      reader.onload = e => { document.getElementById('_erp_import_txt').value = e.target.result; };
      reader.readAsText(f);
    });
  }
  document.getElementById('_erp_import_txt').value = '';
  const fi = document.getElementById('_erp_import_file');
  if (fi) fi.value = '';
  document.getElementById('_erp_import_modal').classList.add('open');
}

function _closeImport() {
  const m = document.getElementById('_erp_import_modal');
  if (m) m.classList.remove('open');
}

function _doImport() {
  const txt = document.getElementById('_erp_import_txt').value.trim();
  if (!txt) { showToast('⚠️ Please select a file or paste JSON.', 'warning'); return; }
  const merged = importData(txt);
  if (!merged) return;
  saveData(merged);
  _closeImport();
  showToast('✅ Data imported successfully!', 'success');
  setTimeout(() => window.location.reload(), 800);
}


/* ══════════════════════════════════════════════════════════════
   §7  AUTH FUNCTIONS
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

function getStudentAccountIDs() { return STUDENT_ACCOUNTS.map(a => a.id); }


/* ══════════════════════════════════════════════════════════════
   §8  SESSION MANAGEMENT
   ══════════════════════════════════════════════════════════════ */

function setAdminSession(u)   { sessionStorage.setItem('erp_admin', JSON.stringify(u)); }
function getAdminSession()    { try { return JSON.parse(sessionStorage.getItem('erp_admin')); } catch(e){ return null; } }
function setStudentSession(s) { sessionStorage.setItem('erp_stu',   JSON.stringify(s)); }
function getStudentSession()  { try { return JSON.parse(sessionStorage.getItem('erp_stu'));   } catch(e){ return null; } }

function logoutAdmin() {
  sessionStorage.removeItem('erp_admin');
  // Redirect to the page that exists in current folder — try admin.html
  window.location.href = 'admin.html';
}

function logoutStudent() {
  sessionStorage.removeItem('erp_stu');
  window.location.href = 'student-login.html';
}

function requireAdminLogin(redir) {
  const u = getAdminSession();
  if (!u) { window.location.href = redir || 'admin.html'; return null; }
  return u;
}

function requireStudentLogin(redir) {
  const s = getStudentSession();
  if (!s) { window.location.href = redir || 'student-login.html'; return null; }
  return s;
}


/* ══════════════════════════════════════════════════════════════
   §9  CORE DATA FUNCTIONS
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
    return true;
  } catch(e) { showToast('❌ Save failed — storage full?', 'error'); return false; }
}

function exportData() {
  try {
    const blob = new Blob([JSON.stringify(loadData(), null, 2)], {type:'application/json'});
    const a = Object.assign(document.createElement('a'), {
      href:     URL.createObjectURL(blob),
      download: `school-data-${new Date().toISOString().slice(0,10)}.json`
    });
    document.body.appendChild(a); a.click();
    document.body.removeChild(a); URL.revokeObjectURL(a.href);
    showToast('✅ Data exported!', 'success');
  } catch(e) { showToast('❌ Export failed.', 'error'); }
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
  } catch(e) { showToast('❌ Import failed — invalid JSON.', 'error'); return null; }
}


/* ══════════════════════════════════════════════════════════════
   §10  ID GENERATOR  →  PREFIX-YYYY-NNN  e.g. STU-2025-007
   ══════════════════════════════════════════════════════════════ */

const _PM = { TCH:'teachers', STU:'students', FST:'feeStructures', RCP:'feePayments',
              EXM:'exams', MRK:'marks', DOC:'documents', ANN:'announcements', TTB:'timetable' };

function generateID(prefix) {
  const yr  = new Date().getFullYear();
  const arr = loadData()[_PM[prefix]] || [];
  let max   = 0;
  arr.forEach(x => {
    if (x.id && x.id.startsWith(prefix+'-')) {
      const n = parseInt(x.id.split('-').pop(), 10);
      if (!isNaN(n) && n > max) max = n;
    }
  });
  return `${prefix}-${yr}-${String(max+1).padStart(3,'0')}`;
}


/* ══════════════════════════════════════════════════════════════
   §11  LOOKUP HELPERS
   ══════════════════════════════════════════════════════════════ */

function getStudent(id)               { return loadData().students.find(s=>s.id===id)||null; }
function getTeacher(id)               { return loadData().teachers.find(t=>t.id===id)||null; }
function getStudentsByClass(cls,sec)  { return loadData().students.filter(s=>s.active!==false&&s.class===cls&&(!sec||s.section===sec)); }
function getStudentMarks(sid)         { return loadData().marks.filter(m=>m.studentId===sid); }
function getStudentPayments(sid)      { return loadData().feePayments.filter(p=>p.studentId===sid); }

function getStudentFeeStatus(sid) {
  const pp = getStudentPayments(sid);
  return {
    paid:    pp.filter(p=>p.status==='Paid').reduce((s,p)=>s+(p.netAmount||0),0),
    partial: pp.filter(p=>p.status==='Partial').reduce((s,p)=>s+(p.balance||0),0),
    due:     pp.filter(p=>p.status==='Due').reduce((s,p)=>s+(p.netAmount||0),0),
  };
}

function getActiveAnnouncements(role) {
  const today = new Date().toISOString().slice(0,10);
  return loadData().announcements.filter(a =>
    a.active && (a.targetRole==='All'||a.targetRole===role) &&
    (!a.expiryDate||a.expiryDate>=today)
  );
}


/* ══════════════════════════════════════════════════════════════
   §12  GRADE & RESULT
   ══════════════════════════════════════════════════════════════ */

function getGrade(pct) {
  if(pct>=91)return'A+'; if(pct>=81)return'A';  if(pct>=71)return'B+';
  if(pct>=61)return'B';  if(pct>=51)return'C';  if(pct>=33)return'D'; return'F';
}

function computeResult(subjectMarks) {
  let tMax=0, tGot=0, fail=false;
  subjectMarks.forEach(sm => {
    tMax += (sm.maxMarks||0);
    tGot += (sm.marksObtained||0);
    if ((sm.marksObtained||0) < (sm.passingMarks||33)) fail = true;
  });
  const pct = tMax>0 ? Math.round(tGot/tMax*1000)/10 : 0;
  return { totalMax:tMax, totalObtained:tGot, percentage:pct, overallGrade:getGrade(pct), result:(fail||pct<33)?'Fail':'Pass' };
}


/* ══════════════════════════════════════════════════════════════
   §13  FORMAT HELPERS
   ══════════════════════════════════════════════════════════════ */

function fmtDate(d)    { if(!d)return'—'; try{return new Date(d).toLocaleDateString('en-IN',{day:'2-digit',month:'2-digit',year:'numeric'});}catch(e){return d;} }
function fmtMoney(n)   { return'₹'+Number(n||0).toLocaleString('en-IN'); }
function getInitials(s){ return(s||'').split(' ').map(w=>w[0]).join('').toUpperCase().slice(0,2)||'?'; }
function todayStr()    { return new Date().toISOString().slice(0,10); }
function ordinal(n)    { const s=['th','st','nd','rd'],v=n%100; return n+(s[(v-20)%10]||s[v]||s[0]); }


/* ══════════════════════════════════════════════════════════════
   §14  DOCUMENT GENERATOR
   ══════════════════════════════════════════════════════════════ */

function downloadDocHTML(htmlContent, filename) {
  const fname = filename.endsWith('.html') ? filename : filename+'.html';
  const win   = window.open('', '_blank');
  if (!win) { showToast('⚠️ Allow popups to preview documents.', 'warning'); return; }
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
<div id="_se_footer" style="position:fixed;bottom:0;left:0;right:0;z-index:9990;background:rgba(8,8,16,.95);backdrop-filter:blur(10px);border-top:1px solid #1E1E30;padding:9px 20px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;font-family:'DM Sans',system-ui,sans-serif;">
  <div style="display:flex;align-items:center;gap:8px;">
    <a href="https://sparkedge555.github.io/sparkedgeagency/" target="_blank" style="display:flex;align-items:center;gap:7px;text-decoration:none;">
      <div style="width:22px;height:22px;background:linear-gradient(135deg,#FF6B35,#FF3CAC);border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:900;color:#fff;font-family:system-ui,sans-serif;">S</div>
      <span style="font-size:13px;font-weight:800;font-family:system-ui,sans-serif;background:linear-gradient(135deg,#FF6B35,#FF3CAC);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">SparkEdge</span>
    </a>
    <span style="font-size:11px;color:#3A3A52;">|</span>
    <span style="font-size:11px;color:#4A4A62;">&copy; 2026 Raunak Karn &middot; All rights reserved.</span>
  </div>
</div>
<div style="height:46px;"></div>
</body></html>`);
  win.document.close();
}


/* ══════════════════════════════════════════════════════════════
   §15  EXPOSE AS GLOBAL ERP NAMESPACE
   ══════════════════════════════════════════════════════════════ */

const ERP = {
  // Auth
  authenticateAdmin,
  authenticateStudent,
  getStaffList,
  getStudentAccountIDs,
  // Session
  setAdminSession,
  getAdminSession,
  setStudentSession,
  getStudentSession,
  logoutAdmin,
  logoutStudent,
  requireAdminLogin,
  requireStudentLogin,
  // Data
  loadData,
  saveData,
  exportData,
  importData,
  // ID
  generateID,
  // Lookups
  getStudent,
  getTeacher,
  getStudentsByClass,
  getStudentMarks,
  getStudentPayments,
  getStudentFeeStatus,
  getActiveAnnouncements,
  // Grades
  getGrade,
  computeResult,
  // Format
  fmtDate,
  fmtMoney,
  getInitials,
  todayStr,
  ordinal,
  // UI
  showToast,
  confirm,
  openImportModal,
  downloadDocHTML,
  // Internal (needed for onclick handlers)
  _closeConfirm,
  _doConfirm,
  _closeImport,
  _doImport,
  // Schema (read-only access)
  DEFAULT_SCHEMA,
  // Firebase/Drive sync stubs (override if using Firebase)
  syncFromDrive: function(opts) {
    // Not configured — show message
    if (opts && typeof opts.onError === 'function') {
      opts.onError(new Error('Firebase sync not configured.'));
    }
  },
  onImportSuccess: null,
};

// Make available globally
global.ERP = ERP;
// Also expose showToast globally for legacy calls in portal files
global.showToast  = showToast;
global.erp_confirm = confirm;

})(window);
