/* ============================================================
   SCHOOL ERP — school_data.js  v2.0
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
   │                                                         │
   │  HOW DATA SYNCS ACROSS TEAM:                            │
   │  1. Owner enters data (students, fees, marks…)          │
   │  2. Click Export → downloads school-data-DATE.json      │
   │  3. Share JSON with teammate (WhatsApp / Drive / email) │
   │  4. They click Import on their device → data appears    │
   │  Passwords always come from this file, never localStorage│
   └─────────────────────────────────────────────────────────┘
*/

/* ══════════════════════════════════════════════════════════════
   §1  HARDCODED AUTH — EDIT THIS SECTION
   ══════════════════════════════════════════════════════════════ */

// ── OWNER ──────────────────────────────────────────────────────
// Full access: Settings, Team, every portal
const OWNER_PASSWORD = 'Raunak@123';    // ← CHANGE THIS
const OWNER_NAME     = 'School Admin';     // ← displayed after login

// ── STAFF / TEAM MEMBERS ──────────────────────────────────────
// Each person opens admin.html and logs in with their password.
// To add a member: copy one block, fill in unique id/name/password.
// To disable a member: set active: false  (do NOT delete the block).
// Permissions: set any key to false to restrict that section.
//
const STAFF_MEMBERS = [
  // ────── EXAMPLE — delete or uncomment ──────
  // {
  //   id:       'STF-2025-001',         // never change id once set
  //   name:     'Priya Sharma',
  //   role:     'Accountant',           // display only
  //   password: 'Priya@2025',           // ← unique per member
  //   active:   true,
  //   permissions: {
  //     teachers:      false,   // can see Teachers portal?
  //     students:      true,    // can see Students portal?
  //     fees:          true,    // can see Fees portal?
  //     marks:         false,
  //     docs:          true,
  //     timetable:     false,
  //     announcements: true,
  //     export:        true,    // can export / import data?
  //     settings:      false,   // can change school settings?
  //   }
  // },
  // ──────────────────────────────────────────

    {
    id:       'STF-2026-001',
    name:     'Rahul Raj',
    role:     'Science, Teacher',
    password: 'Rahul@123',
    active:   true,
    permissions: {
      teachers:      true ,   // Teachers portal
      students:      true ,   // Students portal
      fees:          false,   // Fee Management
      marks:         true ,   // Marks & Results
      docs:          true ,   // Certificates
      timetable:     true ,   // Timetable
      announcements: false,   // Announcements
      export:        true ,   // Export / Import data
      settings:      false,   // School Settings
    }
  },
  
];

// ── STUDENT ACCOUNTS ──────────────────────────────────────────
// Powers student-login.html.  The `id` MUST exactly match the
// student's id in the data store (e.g. STU-2025-007).
//
// STEP-BY-STEP GUIDE TO ADD A STUDENT LOGIN:
//   1. Enroll the student in students.html
//   2. Note their auto-generated ID shown on their profile card
//      (format: STU-YYYY-NNN, e.g. STU-2025-007)
//   3. Add a block below with that exact id and a password
//   4. git add . → git commit → git push
//   5. Student opens student-login.html, types their ID + password
//
// PASSWORD TIPS:
//   - Simple format works great: FirstName + @  + roll number
//     e.g.  Ananya@01   or   Rahul@22
//   - Share the ID and password with the student/guardian via WhatsApp
//
const STUDENT_ACCOUNTS = [
  // ────── EXAMPLE — delete or uncomment ──────
  // {
  //   id:       'STU-2025-001',   // ← copy exact id from students.html
  //   password: 'Ananya@01',      // ← share this with the student
  // },
  // {
  //   id:       'STU-2025-002',
  //   password: 'Rahul@22',
  // },
  // ──────────────────────────────────────────
];


// ── TEACHER ACCOUNTS ──────────────────────────────────────────
// Powers teacher-login.html portal.
// The `id` MUST exactly match the teacher's auto-generated ID
// (format: TCH-YYYY-NNN, e.g. TCH-2025-003).
//
// STEP-BY-STEP:
//   1. Add teacher in teachers.html → note auto-generated ID shown on their card
//   2. Add a block below with that id + a password
//   3. git push → teacher opens teacher-login.html and logs in from anywhere
//
// If TEACHER_ACCOUNTS is empty or id not found, teacher can use OWNER_PASSWORD
// as a fallback (useful for initial setup and testing).
//
const TEACHER_ACCOUNTS = [
  // ────── EXAMPLE — delete or uncomment ──────
  // {
  //   id:       'TCH-2025-001',   // ← copy exact id from teachers.html
  //   password: 'Rahul@teach1',   // ← share this with the teacher
  // },
  // {
  //   id:       'TCH-2025-002',
  //   password: 'Priya@teach2',
  // },
  // ──────────────────────────────────────────
];

/* ══════════════════════════════════════════════════════════════
   §2  AUTH FUNCTIONS  (do not edit below this line normally)
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
  // Check TEACHER_ACCOUNTS
  const acc = TEACHER_ACCOUNTS.find(a => a.id === teacherId && a.password === password);
  if (acc) {
    return loadData().teachers.find(t => t.id === teacherId && t.active !== false) || null;
  }
  // Fallback: owner password lets any teacher log in
  if (password === OWNER_PASSWORD) {
    return loadData().teachers.find(t => t.id === teacherId && t.active !== false) || null;
  }
  return null;
}

function authenticateStudent(studentId, password) {
  const acc = STUDENT_ACCOUNTS.find(a => a.id === studentId && a.password === password);
  if (!acc) return null;
  return loadData().students.find(s => s.id === studentId && s.active !== false) || null;
}

// Safe read-only list for display (no passwords exposed)
function getStaffList() {
  return STAFF_MEMBERS.filter(m => m.active !== false).map(m => ({
    id:m.id, name:m.name, role:m.role, permissions:m.permissions||{}
  }));
}
function getStudentAccountIDs() { return STUDENT_ACCOUNTS.map(a => a.id); }


/* ══════════════════════════════════════════════════════════════
   §3  SESSION  (sessionStorage — clears on tab close)
   ══════════════════════════════════════════════════════════════ */

function setAdminSession(u)   { sessionStorage.setItem('erp_admin', JSON.stringify(u)); }
function getAdminSession()    { try { return JSON.parse(sessionStorage.getItem('erp_admin')); } catch(e){ return null; } }
function setStudentSession(s) { sessionStorage.setItem('erp_stu',   JSON.stringify(s)); }
function getStudentSession()  { try { return JSON.parse(sessionStorage.getItem('erp_stu'));   } catch(e){ return null; } }
function logoutAdmin()        { sessionStorage.removeItem('erp_admin'); window.location.href='admin.html'; }
function logoutStudent()      { sessionStorage.removeItem('erp_stu');   window.location.href='student-login.html'; }

function requireAdminLogin(redir) {
  const u = getAdminSession();
  if (!u) { window.location.href = redir||'admin.html'; return null; }
  return u;
}
function requireStudentLogin(redir) {
  const s = getStudentSession();
  if (!s) { window.location.href = redir||'student-login.html'; return null; }
  return s;
}


/* ══════════════════════════════════════════════════════════════
   §4  DATA SCHEMA
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
  teachers:[],      // { id, name, photo(b64), employeeCode, designation, department,
                    //   subjectsTaught[],         ← comma-sep string e.g. 'Maths,Physics'
                    //   classAssigned,            ← primary class (string) for classteacher
                    //   sectionAssigned,          ← primary section
                    //   isClassTeacher,
                    //   classesAssigned:[],       ← NEW: [{class,section,subjects[]}] multi-class
                    //   phone, email, address, dob, joiningDate, qualification, salary, active, createdAt }
  students:[],      // { id, name, photo(b64), rollNumber, class, section, dob, gender,
                    //   bloodGroup, category, aadhaar, admissionDate, admissionNo, session,
                    //   guardianName, guardianRelation, guardianPhone, guardianEmail,
                    //   guardianOccupation, address, city, state, pincode, previousSchool, active, createdAt }
  feeStructures:[], // { id, name, amount, frequency, classes[], session, dueDay, lateFine, active, createdAt }
  feePayments:[],   // { id, studentId, feeStructureId, feeName, amount, discount, lateFine, netAmount,
                    //   amountPaid, balance, month, session, paymentDate, paymentMode, transactionId,
                    //   chequeNo, bankName, remarks, receivedBy, status, createdAt }
  exams:[],         // { id, name, session, class, section, startDate, endDate,
                    //   subjects[{name,maxMarks,passingMarks}], resultDeclared, createdAt }
  marks:[],         // { id, examId, studentId, session,
                    //   subjectMarks[{subject,maxMarks,marksObtained,grade,passFail,passingMarks}],
                    //   totalMax, totalObtained, percentage, overallGrade, result, rank, remarks, createdAt }
  documents:[],     // { id, type, studentId, issuedTo, purpose, issuedBy, issuedDate, remarks, serialNo, createdAt }
  announcements:[], // { id, title, body, targetRole, targetClass, priority, publishDate, expiryDate, postedBy, active, createdAt }
  timetable:[],     // { id, class, section, session, schedule{Mon:[{period,subject,teacherId,startTime,endTime}]}, updatedAt }
};


/* ══════════════════════════════════════════════════════════════
   §5  CORE DATA FUNCTIONS
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
      let _skipped=0;
      inc[key].forEach(item => {
        if (!item.id) { _skipped++; return; }
        const i = merged[key].findIndex(e=>e.id===item.id);
        i>-1 ? (merged[key][i]={...merged[key][i],...item}) : merged[key].push(item);
      });
      if(_skipped>0) console.warn('[SchoolERP] importData: '+_skipped+' records in '+key+' skipped (missing id field)');
    });
    return merged;
  } catch(e) { showToast('❌ Import failed — invalid JSON.','error'); return null; }
}


/* ══════════════════════════════════════════════════════════════
   §6  ID GENERATOR  →  PREFIX-YYYY-NNN  e.g. STU-2025-007
   ══════════════════════════════════════════════════════════════ */

const _idCounters = {};
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
  _idCounters[prefix] = Math.max(max, _idCounters[prefix]||0) + 1;
  return `${prefix}-${yr}-${String(_idCounters[prefix]).padStart(3,'0')}`;
}


/* ══════════════════════════════════════════════════════════════
   §7  LOOKUP HELPERS
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
   §8  GRADE & RESULT
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
   §9  FORMAT HELPERS
   ══════════════════════════════════════════════════════════════ */

function fmtDate(d)    { if(!d)return'—'; try{return new Date(d).toLocaleDateString('en-IN',{day:'2-digit',month:'2-digit',year:'numeric'});}catch(e){return d;} }
function fmtMoney(n)   { return'₹'+Number(n||0).toLocaleString('en-IN'); }
function getInitials(s){ return(s||'').split(' ').map(w=>w[0]).join('').toUpperCase().slice(0,2)||'?'; }
function todayStr()    { return new Date().toISOString().slice(0,10); }
function ordinal(n)    { const s=['th','st','nd','rd'],v=n%100; return n+(s[(v-20)%10]||s[v]||s[0]); }


/* ══════════════════════════════════════════════════════════════
   §10  DOCUMENT GENERATOR
   Opens a printable HTML in new tab + Save as HTML button
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
   §11  TOAST
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
   §12  CONFIRM DIALOG
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
   §13  IMPORT MODAL
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
      <p style="font-size:13px;color:#7A7A9A;line-height:1.7;margin:0;">Paste or upload a <strong style="color:#F0F0FA;">school-data-*.json</strong> export file. New records will be added, existing records updated. Nothing is deleted.</p>
      <textarea id="_im_ta" style="background:#141422;border:1px solid #1E1E30;border-radius:8px;padding:10px 12px;font-family:monospace;font-size:11px;color:#F0F0FA;min-height:140px;resize:vertical;outline:none;line-height:1.5;width:100%;" placeholder='{"settings":{...},"students":[...],...}'
        onfocus="this.style.borderColor='rgba(255,107,53,.45)'" onblur="this.style.borderColor='#1E1E30'"></textarea>
      <label style="font-size:12px;font-weight:600;color:#7A7A9A;cursor:pointer;background:#141422;border:1px solid #1E1E30;border-radius:8px;padding:8px 14px;display:inline-flex;align-items:center;gap:8px;width:fit-content;">
        📂 Upload .json file
        <input type="file" accept=".json" onchange="ERP._imFile(event)" style="display:none"/>
      </label>
      <p style="font-size:11px;color:#EF4444;margin:0;">⚠ Records with matching IDs will be overwritten.</p>
    </div>
    <div style="padding:14px 22px;border-top:1px solid #1E1E30;display:flex;gap:10px;justify-content:flex-end;">
      <button onclick="ERP.closeImportModal()" style="background:#141422;border:1px solid #1E1E30;border-radius:8px;padding:9px 18px;font-family:'DM Sans',system-ui,sans-serif;font-size:13px;font-weight:600;color:#7A7A9A;cursor:pointer;">Cancel</button>
      <button onclick="ERP._doImport()" style="background:linear-gradient(135deg,#FF6B35,#FF3CAC);border:none;border-radius:8px;padding:9px 20px;font-family:'DM Sans',system-ui,sans-serif;font-size:13px;font-weight:700;color:#fff;cursor:pointer;">Import & Merge</button>
    </div>
  </div>`;
  document.body.appendChild(d);
})();


/* ══════════════════════════════════════════════════════════════
   §14  INTERNAL UTILS
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
   §15  PUBLIC API — window.ERP
   ══════════════════════════════════════════════════════════════ */


/* ══════════════════════════════════════════════════════════════
   §16  GOOGLE DRIVE SYNC  ← EDIT THIS URL
   ══════════════════════════════════════════════════════════════

   HOW TO SET UP (one-time, 5 minutes):
   1. Admin exports JSON  → school-data-DATE.json
   2. Upload to Google Drive
   3. Right-click file → Share → Anyone with link → Viewer
   4. Copy the share link.  It looks like:
      https://drive.google.com/file/d/FILE_ID/view?usp=sharing
   5. Replace FILE_ID below in DRIVE_FILE_ID
   6. git push → done. Students click Sync and get latest data.

   TO UPDATE DATA:
   - Export new JSON from admin panel
   - In Google Drive, right-click old file → Manage versions → Upload new version
     (the FILE_ID stays the same — no need to change the code)
   ══════════════════════════════════════════════════════════════ */

const DRIVE_FILE_ID = 'YOUR_GOOGLE_DRIVE_FILE_ID_HERE'; // ← PASTE FILE_ID HERE

function buildDriveDirectURL(fileId) {
  return 'https://drive.google.com/uc?export=download&id=' + fileId;
}

async function syncFromDrive(onSuccess, onError) {
  if (!DRIVE_FILE_ID || DRIVE_FILE_ID === 'YOUR_GOOGLE_DRIVE_FILE_ID_HERE') {
    showToast('⚠️ Drive sync not configured. Edit DRIVE_FILE_ID in school_data.js', 'warning', 5000);
    if (onError) onError(new Error('Not configured'));
    return;
  }
  try {
    showToast('🔄 Syncing from school server…', 'info', 8000);
    const url  = buildDriveDirectURL(DRIVE_FILE_ID);
    const resp = await fetch(url);
    if (!resp.ok) throw new Error('HTTP ' + resp.status);
    const json = await resp.text();
    const merged = importData(json);
    if (!merged) throw new Error('Parse failed');
    saveData(merged);
    showToast('✅ School data synced successfully!', 'success', 4000);
    if (onSuccess) onSuccess(merged);
  } catch(e) {
    console.error('[SchoolERP] syncFromDrive:', e);
    showToast('❌ Sync failed. Try importing manually or check Drive link.', 'error', 5000);
    if (onError) onError(e);
  }
}

window.ERP = {
  // ── Auth ──────────────────────────────────────
  authenticateAdmin, authenticateStudent, authenticateTeacher,
  getStaffList, getStudentAccountIDs,
  TEACHER_ACCOUNTS,
  setAdminSession,   getAdminSession,
  setStudentSession, getStudentSession,
  logoutAdmin,       logoutStudent,
  requireAdminLogin, requireStudentLogin,
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

  // ── Drive Sync ────────────────────────────────
  syncFromDrive,
  DRIVE_FILE_ID: () => DRIVE_FILE_ID,
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
};

// Convenience globals for portal pages
window.loadData   = loadData;
window.saveData   = saveData;
window.showToast  = showToast;
window.generateID = generateID;
window.fmtDate    = fmtDate;
window.fmtMoney   = fmtMoney;
window.getGrade   = getGrade;

console.log('%c[School ERP] school_data.js v2 ✓  Staff:'+STAFF_MEMBERS.length+'  Students:'+STUDENT_ACCOUNTS.length,'color:#FF6B35;font-weight:800;font-size:12px;');
