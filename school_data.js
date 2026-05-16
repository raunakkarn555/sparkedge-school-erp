/* ============================================================
   School ERP — school_data.js
   Shared data layer for all portals (GitHub Pages / no backend)
   Include in every portal: <script src="school_data.js"></script>
   ============================================================ */

/* ══════════════════════════════════════════════════════════════
   §1  DEFAULT SCHEMA
   Full JSON structure — all portals read/write these same keys
   ══════════════════════════════════════════════════════════════ */
const DEFAULT_SCHEMA = {

  /* ── School-wide settings ── */
  settings: {
    schoolName:       'My School',
    schoolTagline:    'Empowering Minds, Shaping Futures',
    schoolAddress:    '',
    schoolPhone:      '',
    schoolEmail:      '',
    schoolLogo:       '',           // base64 or URL
    principalName:    '',
    principalSign:    '',           // base64 signature image
    affiliationNo:    '',
    schoolCode:       '',
    sessionStart:     '',           // e.g. "April"
    sessionEnd:       '',           // e.g. "March"
    currentSession:   '2025-26',
    classes:          ['Nursery','LKG','UKG','1','2','3','4','5','6','7','8','9','10','11','12'],
    sections:         ['A','B','C','D'],
    subjects:         ['English','Hindi','Mathematics','Science','Social Studies','Computer','Physical Education','Art','Music'],
    ownerPassword:    'admin123',   // change on first login
    setupDone:        false,
    createdAt:        '',
    updatedAt:        ''
  },

  /* ── Staff / Team members (admin logins) ── */
  staff: [
    /*  {
          id:          'STF-2025-001',
          name:        'Priya Sharma',
          role:        'Admin',          // Admin | Accountant | Teacher | Receptionist | Other
          email:       '',
          phone:       '',
          password:    '',              // login password for portals
          permissions: {
            dashboard:    true,
            teachers:     true,
            students:     true,
            fees:         true,
            marks:        true,
            docs:         true,
            timetable:    true,
            settings:     false
          },
          photo:       '',              // base64
          joiningDate: '',
          active:      true,
          createdAt:   ''
        }  */
  ],

  /* ── Teachers ── */
  teachers: [
    /*  {
          id:              'TCH-2025-001',
          name:            'Rakesh Verma',
          photo:           '',           // base64
          employeeCode:    'EMP-001',
          designation:     'PGT',        // Principal | VP | PGT | TGT | PRT | Other
          department:      'Science',
          subjectsTaught:  ['Physics','Chemistry'],
          classAssigned:   '10',
          sectionAssigned: 'A',
          isClassTeacher:  true,
          phone:           '',
          email:           '',
          address:         '',
          dob:             '',
          joiningDate:     '',
          qualification:   '',
          salary:          0,
          active:          true,
          createdAt:       ''
        }  */
  ],

  /* ── Students ── */
  students: [
    /*  {
          id:              'STU-2025-001',
          name:            'Ananya Singh',
          photo:           '',          // base64
          rollNumber:      '01',
          class:           '10',
          section:         'A',
          dob:             '',
          gender:          'Female',    // Male | Female | Other
          bloodGroup:      '',
          religion:        '',
          category:        '',          // General | OBC | SC | ST
          aadhaar:         '',
          admissionDate:   '',
          admissionNo:     '',
          session:         '2025-26',
          guardianName:    '',
          guardianRelation:'Father',
          guardianPhone:   '',
          guardianEmail:   '',
          guardianOccupation: '',
          address:         '',
          city:            '',
          state:           '',
          pincode:         '',
          previousSchool:  '',
          portalPassword:  '',          // for student-login.html
          active:          true,
          promoted:        false,
          createdAt:       ''
        }  */
  ],

  /* ── Fee Structures ── */
  feeStructures: [
    /*  {
          id:          'FST-2025-001',
          name:        'Tuition Fee',
          amount:      5000,
          frequency:   'Monthly',     // Monthly | Quarterly | Half-Yearly | Annually | One-Time
          classes:     ['9','10'],    // applicable classes; [] = all
          session:     '2025-26',
          dueDay:      10,            // due on day N of month
          lateFine:    50,            // per day after due date
          description: '',
          active:      true,
          createdAt:   ''
        }  */
  ],

  /* ── Fee Payments ── */
  feePayments: [
    /*  {
          id:            'RCP-2025-001',
          studentId:     'STU-2025-001',
          feeStructureId:'FST-2025-001',
          feeName:       'Tuition Fee',
          amount:        5000,
          discount:      0,
          lateFine:      0,
          netAmount:     5000,
          amountPaid:    5000,
          balance:       0,
          month:         'April',     // for monthly fees
          session:       '2025-26',
          paymentDate:   '',
          paymentMode:   'Cash',      // Cash | Online | Cheque | DD
          transactionId: '',
          chequeNo:      '',
          bankName:      '',
          remarks:       '',
          receivedBy:    '',
          status:        'Paid',      // Paid | Partial | Due | Waived
          createdAt:     ''
        }  */
  ],

  /* ── Exams ── */
  exams: [
    /*  {
          id:          'EXM-2025-001',
          name:        'Unit Test 1',  // Unit Test 1/2 | Half Yearly | Annual | Pre-Board | Other
          session:     '2025-26',
          class:       '10',
          section:     'A',           // or 'All'
          startDate:   '',
          endDate:     '',
          subjects: [
            { name:'Mathematics', maxMarks:100, passingMarks:33 },
            { name:'Science',     maxMarks:100, passingMarks:33 }
          ],
          resultDeclared: false,
          createdAt:   ''
        }  */
  ],

  /* ── Marks / Results ── */
  marks: [
    /*  {
          id:           'MRK-2025-001',
          examId:       'EXM-2025-001',
          studentId:    'STU-2025-001',
          session:      '2025-26',
          subjectMarks: [
            { subject:'Mathematics', maxMarks:100, marksObtained:87, grade:'A', passFail:'Pass' },
            { subject:'Science',     maxMarks:100, marksObtained:74, grade:'B', passFail:'Pass' }
          ],
          totalMax:      200,
          totalObtained: 161,
          percentage:    80.5,
          overallGrade:  'A',
          result:        'Pass',      // Pass | Fail | Absent | Withheld
          rank:          0,
          remarks:       '',
          createdAt:     ''
        }  */
  ],

  /* ── Documents / Certificates issued ── */
  documents: [
    /*  {
          id:          'DOC-2025-001',
          type:        'Bonafide',    // Bonafide | TC | Character | ID Card | Fee Receipt | Marksheet | Attendance
          studentId:   'STU-2025-001',
          issuedTo:    'Ananya Singh',
          purpose:     '',
          issuedBy:    '',
          issuedDate:  '',
          remarks:     '',
          serialNo:    '',
          createdAt:   ''
        }  */
  ],

  /* ── Announcements ── */
  announcements: [
    /*  {
          id:          'ANN-2025-001',
          title:       'Holiday Notice',
          body:        'School will remain closed on...',
          targetRole:  'All',        // All | Students | Teachers | Staff
          targetClass: '',           // '' = all classes
          priority:    'Normal',     // Normal | Important | Urgent
          publishDate: '',
          expiryDate:  '',
          postedBy:    '',
          active:      true,
          createdAt:   ''
        }  */
  ],

  /* ── Timetable ── */
  timetable: [
    /*  {
          id:      'TTB-2025-001',
          class:   '10',
          section: 'A',
          session: '2025-26',
          schedule: {
            Monday:    [ { period:1, subject:'Mathematics', teacherId:'TCH-2025-001', startTime:'08:00', endTime:'08:45' } ],
            Tuesday:   [],
            Wednesday: [],
            Thursday:  [],
            Friday:    [],
            Saturday:  []
          },
          updatedAt: ''
        }  */
  ]
};


/* ══════════════════════════════════════════════════════════════
   §2  CORE DATA FUNCTIONS
   ══════════════════════════════════════════════════════════════ */

const STORAGE_KEY = 'school_erp_data';

/** Returns full data object from localStorage (merged with schema defaults) */
function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return _deepClone(DEFAULT_SCHEMA);
    const parsed = JSON.parse(raw);
    // Forward-merge: new schema keys appear without wiping existing data
    return _deepMergeSchema(_deepClone(DEFAULT_SCHEMA), parsed);
  } catch(e) {
    console.error('[SchoolERP] loadData error:', e);
    return _deepClone(DEFAULT_SCHEMA);
  }
}

/** Saves full data object to localStorage */
function saveData(data) {
  try {
    data.settings.updatedAt = new Date().toISOString();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch(e) {
    console.error('[SchoolERP] saveData error:', e);
    showToast('❌ Failed to save. Storage may be full.', 'error');
    return false;
  }
}

/** Downloads school_erp_data as a JSON file */
function exportData() {
  try {
    const data  = loadData();
    const today = new Date().toISOString().slice(0,10);
    const blob  = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url   = URL.createObjectURL(blob);
    const a     = document.createElement('a');
    a.href      = url;
    a.download  = `school-data-${today}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('✅ Data exported successfully!', 'success');
  } catch(e) {
    console.error('[SchoolERP] exportData error:', e);
    showToast('❌ Export failed. Try again.', 'error');
  }
}

/**
 * Merges imported JSON string into existing localStorage data.
 * Arrays are merged by id (new records added, existing updated).
 * Settings are merged field-by-field (existing values preserved unless imported value differs).
 * Returns the merged data object (caller must call saveData() if they want to persist).
 */
function importData(jsonString) {
  try {
    const incoming = JSON.parse(jsonString);
    const current  = loadData();
    const merged   = _deepClone(current);

    // Merge settings (non-destructive: only overwrite if incoming has a value)
    if (incoming.settings) {
      Object.entries(incoming.settings).forEach(([k, v]) => {
        if (v !== undefined && v !== null && v !== '') {
          merged.settings[k] = v;
        }
      });
    }

    // Merge all array sections by id
    const arraySections = ['staff','teachers','students','feeStructures','feePayments','exams','marks','documents','announcements','timetable'];
    arraySections.forEach(section => {
      if (!Array.isArray(incoming[section])) return;
      if (!Array.isArray(merged[section]))   merged[section] = [];

      incoming[section].forEach(inItem => {
        if (!inItem.id) return;
        const idx = merged[section].findIndex(ex => ex.id === inItem.id);
        if (idx > -1) {
          merged[section][idx] = { ...merged[section][idx], ...inItem }; // update
        } else {
          merged[section].push(inItem); // add new
        }
      });
    });

    return merged;
  } catch(e) {
    console.error('[SchoolERP] importData error:', e);
    showToast('❌ Import failed. Make sure the JSON is valid.', 'error');
    return null;
  }
}

/**
 * Generates a unique ID.
 * Format: PREFIX-YYYY-NNN (e.g. STU-2025-007)
 * Counter is based on the current max ID for that prefix in storage.
 */
function generateID(prefix) {
  const year    = new Date().getFullYear();
  const data    = loadData();
  const section = _prefixToSection(prefix);
  const arr     = section ? (data[section] || []) : [];

  let max = 0;
  arr.forEach(item => {
    if (item.id && item.id.startsWith(prefix + '-')) {
      const parts = item.id.split('-');
      const n = parseInt(parts[parts.length - 1], 10);
      if (!isNaN(n) && n > max) max = n;
    }
  });

  return `${prefix}-${year}-${String(max + 1).padStart(3, '0')}`;
}


/* ══════════════════════════════════════════════════════════════
   §3  TOAST NOTIFICATION SYSTEM
   Works on any page that includes this file.
   Usage: showToast('Saved!', 'success')
          showToast('Error!', 'error')
          showToast('Note',   'info')
          showToast('Warn',   'warning')
   ══════════════════════════════════════════════════════════════ */

(function _injectToastStyles() {
  if (document.getElementById('erp-toast-style')) return;
  const s = document.createElement('style');
  s.id = 'erp-toast-style';
  s.textContent = `
    #erp-toast-container {
      position: fixed; bottom: 24px; right: 24px; z-index: 99999;
      display: flex; flex-direction: column; gap: 10px; align-items: flex-end;
      pointer-events: none;
    }
    .erp-toast {
      display: flex; align-items: center; gap: 10px;
      padding: 13px 18px;
      border-radius: 11px;
      font-family: 'DM Sans', system-ui, sans-serif;
      font-size: 13px; font-weight: 600;
      backdrop-filter: blur(12px);
      box-shadow: 0 8px 32px rgba(0,0,0,.4);
      transform: translateX(120px); opacity: 0;
      transition: transform .3s cubic-bezier(.34,1.56,.64,1), opacity .3s ease;
      pointer-events: all; max-width: 360px; line-height: 1.4;
    }
    .erp-toast.visible { transform: none; opacity: 1; }
    .erp-toast.hiding  { transform: translateX(120px); opacity: 0; }
    .erp-toast.success { background: #0E1A14; border: 1px solid rgba(34,197,94,.4);  color: #22C55E; }
    .erp-toast.error   { background: #1A0E0E; border: 1px solid rgba(239,68,68,.4);  color: #EF4444; }
    .erp-toast.info    { background: #0E1018; border: 1px solid rgba(59,130,246,.4); color: #3B82F6; }
    .erp-toast.warning { background: #1A160E; border: 1px solid rgba(245,158,11,.4); color: #F59E0B; }
    .erp-toast-icon { font-size: 16px; flex-shrink: 0; }
    .erp-toast-msg  { flex: 1; }
    .erp-toast-close {
      background: none; border: none; color: inherit; opacity: .6;
      cursor: pointer; font-size: 16px; line-height: 1; padding: 0 2px;
      flex-shrink: 0; pointer-events: all;
    }
    .erp-toast-close:hover { opacity: 1; }
  `;
  document.head.appendChild(s);
})();

function _getToastContainer() {
  let c = document.getElementById('erp-toast-container');
  if (!c) {
    c = document.createElement('div');
    c.id = 'erp-toast-container';
    document.body.appendChild(c);
  }
  return c;
}

function showToast(msg, type = 'success', duration = 3500) {
  const icons = { success:'✅', error:'❌', info:'ℹ️', warning:'⚠️' };
  const container = _getToastContainer();

  const toast = document.createElement('div');
  toast.className = `erp-toast ${type}`;
  toast.innerHTML = `
    <span class="erp-toast-icon">${icons[type] || 'ℹ️'}</span>
    <span class="erp-toast-msg">${msg}</span>
    <button class="erp-toast-close" onclick="this.parentElement._dismiss()">✕</button>
  `;

  toast._dismiss = function() {
    toast.classList.add('hiding');
    setTimeout(() => toast.remove(), 320);
  };

  container.appendChild(toast);
  requestAnimationFrame(() => {
    requestAnimationFrame(() => toast.classList.add('visible'));
  });

  setTimeout(() => {
    if (toast.parentElement) toast._dismiss();
  }, duration);
}


/* ══════════════════════════════════════════════════════════════
   §4  GRADING HELPER
   ══════════════════════════════════════════════════════════════ */

/**
 * Returns grade letter from percentage
 * A+ ≥ 90 | A ≥ 80 | B ≥ 70 | C ≥ 60 | D ≥ 50 | E ≥ 33 | F < 33
 */
function getGrade(percentage) {
  if (percentage >= 90) return 'A+';
  if (percentage >= 80) return 'A';
  if (percentage >= 70) return 'B+';
  if (percentage >= 60) return 'B';
  if (percentage >= 50) return 'C';
  if (percentage >= 33) return 'D';
  return 'F';
}

/** Computes result object from subjectMarks array */
function computeResult(subjectMarks) {
  let totalMax = 0, totalObtained = 0, failed = false;
  subjectMarks.forEach(sm => {
    totalMax       += (sm.maxMarks || 0);
    totalObtained  += (sm.marksObtained || 0);
    if ((sm.marksObtained || 0) < (sm.passingMarks || 33)) failed = true;
  });
  const percentage   = totalMax > 0 ? Math.round((totalObtained / totalMax) * 1000) / 10 : 0;
  const overallGrade = getGrade(percentage);
  const result       = failed ? 'Fail' : (totalObtained >= (totalMax * 0.33) ? 'Pass' : 'Fail');
  return { totalMax, totalObtained, percentage, overallGrade, result };
}


/* ══════════════════════════════════════════════════════════════
   §5  FEE HELPERS
   ══════════════════════════════════════════════════════════════ */

/** Returns all fee payments for a given studentId */
function getStudentFeePayments(studentId) {
  const data = loadData();
  return data.feePayments.filter(p => p.studentId === studentId);
}

/** Returns total paid, total due for a student across all fee structures */
function getStudentFeeStatus(studentId) {
  const payments = getStudentFeePayments(studentId);
  const paid  = payments.filter(p => p.status === 'Paid').reduce((s,p) => s + (p.netAmount || 0), 0);
  const partial = payments.filter(p => p.status === 'Partial').reduce((s,p) => s + (p.balance || 0), 0);
  const due   = payments.filter(p => p.status === 'Due').reduce((s,p) => s + (p.netAmount || 0), 0);
  return { paid, partial, due, total: paid + partial + due };
}


/* ══════════════════════════════════════════════════════════════
   §6  STUDENT LOOKUP HELPERS
   ══════════════════════════════════════════════════════════════ */

/** Returns student object by ID or null */
function getStudent(studentId) {
  return loadData().students.find(s => s.id === studentId) || null;
}

/** Returns all students in a given class (and optionally section) */
function getStudentsByClass(cls, section = '') {
  const data = loadData();
  return data.students.filter(s =>
    s.active && s.class === cls && (section === '' || s.section === section)
  );
}

/** Authenticate student — returns student obj or null */
function authenticateStudent(studentId, password) {
  const data = loadData();
  return data.students.find(s =>
    s.id === studentId && s.portalPassword === password && s.active
  ) || null;
}

/** Authenticate staff/admin — returns staff obj or null; 'owner' uses ownerPassword */
function authenticateAdmin(password) {
  const data = loadData();
  // Check owner password
  if (password === data.settings.ownerPassword) {
    return { id: 'owner', name: data.settings.schoolName + ' Admin', role: 'Owner', isOwner: true };
  }
  // Check staff passwords
  return data.staff.find(s => s.password === password && s.active) || null;
}


/* ══════════════════════════════════════════════════════════════
   §7  IMPORT MODAL (ready-to-use UI component)
   Call: ERP.openImportModal()  and hook ERP.onImportSuccess = fn
   ══════════════════════════════════════════════════════════════ */

(function _injectImportModal() {
  if (document.getElementById('erp-import-modal')) return;

  const html = `
  <div id="erp-import-overlay" style="
    display:none;position:fixed;inset:0;background:rgba(0,0,0,.72);
    z-index:9000;align-items:center;justify-content:center;padding:16px;
  ">
    <div style="
      background:#0E0E1A;border:1px solid #2A2A40;border-radius:16px;
      width:100%;max-width:520px;overflow:hidden;
      animation:erpModalIn .2s ease;max-height:90vh;overflow-y:auto;
    ">
      <style>@keyframes erpModalIn{from{transform:scale(.95);opacity:0}to{transform:scale(1);opacity:1}}</style>
      <div style="padding:20px 24px;border-bottom:1px solid #1E1E30;display:flex;align-items:center;justify-content:space-between;">
        <div style="font-family:'Syne',system-ui,sans-serif;font-size:16px;font-weight:800;color:#F0F0FA;">⬆ Import Data</div>
        <button onclick="ERP.closeImportModal()" style="background:none;border:none;color:#7A7A9A;font-size:20px;cursor:pointer;padding:2px 6px;border-radius:6px;line-height:1;">✕</button>
      </div>
      <div style="padding:24px;display:flex;flex-direction:column;gap:14px;">
        <p style="font-size:13px;color:#7A7A9A;line-height:1.7;">
          Paste exported JSON from another device or team member.<br>
          <strong style="color:#F0F0FA;">Merge rules:</strong> New records added · Existing records (same ID) updated · Nothing deleted.
        </p>
        <div style="display:flex;flex-direction:column;gap:5px;">
          <label style="font-size:11px;font-weight:700;letter-spacing:.5px;color:#7A7A9A;">Paste JSON Data</label>
          <textarea id="erp-import-text" style="
            background:#141422;border:1px solid #1E1E30;border-radius:8px;
            padding:10px 12px;font-family:monospace;font-size:11px;color:#F0F0FA;
            min-height:160px;resize:vertical;outline:none;line-height:1.5;
          " placeholder='{"settings":{...},"students":[...],...}'
          onfocus="this.style.borderColor='rgba(255,107,53,.5)'"
          onblur="this.style.borderColor='#1E1E30'"></textarea>
        </div>
        <div style="display:flex;align-items:center;gap:10px;">
          <label style="font-size:12px;font-weight:600;color:#7A7A9A;cursor:pointer;
            background:#141422;border:1px solid #1E1E30;border-radius:8px;
            padding:7px 14px;transition:border-color .15s;"
            onmouseover="this.style.borderColor='#2A2A40'" onmouseout="this.style.borderColor='#1E1E30'">
            📂 Or upload .json file
            <input type="file" accept=".json" onchange="ERP._handleImportFile(event)" style="display:none"/>
          </label>
          <span id="erp-import-filename" style="font-size:11px;color:#7A7A9A;"></span>
        </div>
        <p style="font-size:11px;color:#EF4444;">⚠️ Records with matching IDs will be overwritten. Your existing data is never deleted.</p>
      </div>
      <div style="padding:16px 24px;border-top:1px solid #1E1E30;display:flex;gap:10px;justify-content:flex-end;">
        <button onclick="ERP.closeImportModal()" style="
          background:#141422;border:1px solid #1E1E30;border-radius:8px;
          padding:9px 18px;font-family:'DM Sans',system-ui,sans-serif;font-size:13px;
          font-weight:600;color:#7A7A9A;cursor:pointer;">Cancel</button>
        <button onclick="ERP._doImport()" style="
          background:linear-gradient(135deg,#FF6B35,#FF3CAC);border:none;border-radius:8px;
          padding:9px 20px;font-family:'DM Sans',system-ui,sans-serif;font-size:13px;
          font-weight:700;color:#fff;cursor:pointer;">Import & Merge</button>
      </div>
    </div>
  </div>`;

  document.body.insertAdjacentHTML('beforeend', html);
})();


/* ══════════════════════════════════════════════════════════════
   §8  SIDEBAR + TOPBAR RENDERER
   Call: ERP.renderLayout({ activePage:'students', title:'Students', sub:'Manage all students' })
   Injects sidebar + topbar into any portal page.
   Requires page to have: <div id="erp-layout-root"></div>
   ══════════════════════════════════════════════════════════════ */

const NAV_ITEMS = [
  { label:'MAIN',      isSection: true },
  { id:'dashboard',    icon:'🏠', label:'Dashboard',    href:'admin.html' },
  { label:'ACADEMIC',  isSection: true },
  { id:'teachers',     icon:'👩‍🏫', label:'Teachers',     href:'teachers.html' },
  { id:'students',     icon:'🎒', label:'Students',      href:'students.html' },
  { id:'timetable',    icon:'📅', label:'Timetable',     href:'timetable.html' },
  { label:'FINANCE',   isSection: true },
  { id:'fees',         icon:'💰', label:'Fee Management',href:'fees.html' },
  { label:'RESULTS',   isSection: true },
  { id:'marks',        icon:'📊', label:'Marks & Results',href:'marks.html' },
  { label:'DOCUMENTS', isSection: true },
  { id:'docs',         icon:'📄', label:'Certificates',  href:'docs.html' },
  { label:'PORTALS',   isSection: true },
  { id:'student-login',icon:'👤', label:'Student Portal',href:'student-login.html' },
];

function renderLayout(opts = {}) {
  const { activePage = '', title = '', sub = '' } = opts;
  const data     = loadData();
  const school   = data.settings.schoolName || 'School ERP';
  const session  = data.settings.currentSession || '';
  const user     = _getSessionUser();

  const navHTML = NAV_ITEMS.map(item => {
    if (item.isSection) {
      return `<div class="nav-section-label">${item.label}</div>`;
    }
    const active = activePage === item.id ? 'active' : '';
    return `
      <a href="${item.href}" class="nav-item ${active}" style="text-decoration:none;">
        <span class="nav-item-icon">${item.icon}</span> ${item.label}
      </a>`;
  }).join('');

  const sidebarHTML = `
    <div class="sidebar" id="erp-sidebar">
      <div class="sidebar-brand">
        <div class="sb-icon">🏫</div>
        <div>
          <div class="sb-name">${_truncate(school, 16)}</div>
          <div class="sb-tag">${session}</div>
        </div>
      </div>
      <nav class="sidebar-nav">${navHTML}</nav>
      <div class="sidebar-footer">
        <a href="admin.html">⚙️ Settings</a>
        <a href="#" onclick="ERP.logout(); return false;">🚪 Logout</a>
      </div>
    </div>`;

  const topbarHTML = `
    <div class="topbar">
      <div class="topbar-left">
        <div>
          <div class="page-title">${title}</div>
          ${sub ? `<div class="page-sub">${sub}</div>` : ''}
        </div>
      </div>
      <div class="topbar-right">
        <button class="btn btn-green btn-sm" onclick="exportData()">⬇ Export</button>
        <button class="btn btn-secondary btn-sm" onclick="ERP.openImportModal()">⬆ Import</button>
        ${user ? `<div style="font-size:12px;color:var(--text-muted);padding:0 6px;">👤 ${user.name}</div>` : ''}
      </div>
    </div>`;

  const root = document.getElementById('erp-layout-root');
  if (root) root.innerHTML = sidebarHTML;

  const main = document.querySelector('.main');
  if (main) {
    const existingTopbar = main.querySelector('.topbar');
    if (!existingTopbar) main.insertAdjacentHTML('afterbegin', topbarHTML);
  }
}


/* ══════════════════════════════════════════════════════════════
   §9  SESSION MANAGEMENT
   ══════════════════════════════════════════════════════════════ */

const SESSION_KEY = 'erp_session';

function setSession(user) {
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(user));
}

function _getSessionUser() {
  try {
    return JSON.parse(sessionStorage.getItem(SESSION_KEY));
  } catch(e) { return null; }
}

function requireAdminLogin(redirectTo = 'admin.html') {
  const user = _getSessionUser();
  if (!user) { window.location.href = redirectTo; return null; }
  return user;
}

function requireStudentLogin(redirectTo = 'student-login.html') {
  const s = sessionStorage.getItem('erp_student');
  if (!s) { window.location.href = redirectTo; return null; }
  try { return JSON.parse(s); } catch(e) { return null; }
}

function logout() {
  sessionStorage.removeItem(SESSION_KEY);
  window.location.href = 'admin.html';
}


/* ══════════════════════════════════════════════════════════════
   §10  DOCUMENT / CERTIFICATE GENERATOR
   Call: ERP.downloadDocHTML(htmlString, filename)
   ══════════════════════════════════════════════════════════════ */

function downloadDocHTML(htmlContent, filename) {
  const full = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>${filename}</title>
<style>
  body { font-family: 'Times New Roman', serif; background: #fff; color: #000; margin: 0; }
  @media print {
    body { margin: 0; }
    .no-print { display: none !important; }
    @page { margin: 15mm; }
  }
  .print-btn {
    position: fixed; top: 16px; right: 16px;
    background: #FF6B35; color: #fff; border: none; border-radius: 8px;
    padding: 10px 20px; font-size: 14px; font-weight: 700; cursor: pointer;
    z-index: 999; font-family: system-ui, sans-serif;
  }
  .download-btn {
    position: fixed; top: 16px; right: 140px;
    background: #22C55E; color: #fff; border: none; border-radius: 8px;
    padding: 10px 20px; font-size: 14px; font-weight: 700; cursor: pointer;
    z-index: 999; font-family: system-ui, sans-serif;
  }
</style>
</head>
<body>
<button class="print-btn no-print" onclick="window.print()">🖨️ Print</button>
<button class="download-btn no-print" onclick="downloadSelf()">💾 Save HTML</button>
${htmlContent}
<script>
function downloadSelf(){
  const html = document.documentElement.outerHTML;
  const blob = new Blob([html],{type:'text/html'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = '${filename}';
  a.click();
}
<\/script>
</body>
</html>`;

  const blob = new Blob([full], { type: 'text/html' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = filename.endsWith('.html') ? filename : filename + '.html';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast('📄 Document downloaded!', 'success');
}

/** Opens document in a new tab for printing */
function previewDocHTML(htmlContent, windowTitle) {
  const win = window.open('', '_blank');
  if (!win) { showToast('⚠️ Popup blocked. Please allow popups.', 'warning'); return; }
  win.document.write(`<!DOCTYPE html><html lang="en"><head>
    <meta charset="UTF-8"/><title>${windowTitle || 'Document'}</title>
    <style>
      body{font-family:'Times New Roman',serif;background:#fff;color:#000;margin:20px;}
      @media print{.no-print{display:none!important}@page{margin:15mm}}
      .action-bar{display:flex;gap:10px;margin-bottom:20px;font-family:system-ui,sans-serif;}
      .action-bar button{padding:9px 18px;border:none;border-radius:8px;font-size:13px;font-weight:700;cursor:pointer;}
      .btn-print{background:#FF6B35;color:#fff;}
      .btn-close{background:#1E1E30;color:#F0F0FA;}
    </style>
  </head><body>
    <div class="action-bar no-print">
      <button class="btn-print" onclick="window.print()">🖨️ Print</button>
      <button class="btn-close" onclick="window.close()">✕ Close</button>
    </div>
    ${htmlContent}
  </body></html>`);
  win.document.close();
}


/* ══════════════════════════════════════════════════════════════
   §11  CONFIRM DIALOG
   Usage: ERP.confirm('Delete this student?', () => doDelete())
   ══════════════════════════════════════════════════════════════ */

(function _injectConfirmDialog() {
  if (document.getElementById('erp-confirm-overlay')) return;
  document.body.insertAdjacentHTML('beforeend', `
  <div id="erp-confirm-overlay" style="
    display:none;position:fixed;inset:0;background:rgba(0,0,0,.72);
    z-index:9999;align-items:center;justify-content:center;padding:16px;">
    <div style="
      background:#0E0E1A;border:1px solid #2A2A40;border-radius:14px;
      width:100%;max-width:380px;overflow:hidden;">
      <div style="padding:24px 24px 8px;">
        <div style="font-family:'Syne',system-ui,sans-serif;font-size:15px;font-weight:800;color:#F0F0FA;margin-bottom:8px;"
          id="erp-confirm-title">Are you sure?</div>
        <div style="font-size:13px;color:#7A7A9A;line-height:1.6;"
          id="erp-confirm-msg"></div>
      </div>
      <div style="padding:16px 24px;display:flex;gap:10px;justify-content:flex-end;">
        <button id="erp-confirm-cancel" style="
          background:#141422;border:1px solid #1E1E30;border-radius:8px;
          padding:9px 18px;font-family:'DM Sans',system-ui,sans-serif;
          font-size:13px;font-weight:600;color:#7A7A9A;cursor:pointer;">Cancel</button>
        <button id="erp-confirm-ok" style="
          background:linear-gradient(135deg,#EF4444,#B91C1C);border:none;border-radius:8px;
          padding:9px 20px;font-family:'DM Sans',system-ui,sans-serif;
          font-size:13px;font-weight:700;color:#fff;cursor:pointer;">Confirm</button>
      </div>
    </div>
  </div>`);
})();


/* ══════════════════════════════════════════════════════════════
   §12  FORMAT HELPERS
   ══════════════════════════════════════════════════════════════ */

/** Format date string to DD/MM/YYYY */
function fmtDate(dateStr) {
  if (!dateStr) return '—';
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-IN', { day:'2-digit', month:'2-digit', year:'numeric' });
  } catch(e) { return dateStr; }
}

/** Format number as Indian currency */
function fmtMoney(n) {
  return '₹' + Number(n || 0).toLocaleString('en-IN');
}

/** Returns ordinal suffix string: 1 → '1st', 2 → '2nd', etc. */
function ordinal(n) {
  const s = ['th','st','nd','rd'];
  const v = n % 100;
  return n + (s[(v-20)%10] || s[v] || s[0]);
}

/** Returns initials from name: "Ananya Singh" → "AS" */
function getInitials(name = '') {
  return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
}

/** Truncates string to maxLen with ellipsis */
function _truncate(str, maxLen) {
  return str && str.length > maxLen ? str.slice(0, maxLen) + '…' : (str || '');
}


/* ══════════════════════════════════════════════════════════════
   §13  INTERNAL UTILITIES (private, prefixed _)
   ══════════════════════════════════════════════════════════════ */

function _deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

/** Merges schema defaults into saved data (adds missing keys, doesn't overwrite) */
function _deepMergeSchema(defaults, saved) {
  const out = { ...defaults };
  Object.keys(saved).forEach(k => {
    if (Array.isArray(saved[k])) {
      out[k] = saved[k]; // arrays come from saved as-is
    } else if (saved[k] && typeof saved[k] === 'object' && !Array.isArray(saved[k])) {
      out[k] = { ...defaults[k], ...saved[k] };
    } else {
      out[k] = saved[k];
    }
  });
  return out;
}

function _prefixToSection(prefix) {
  const map = {
    STF: 'staff', TCH: 'teachers', STU: 'students',
    FST: 'feeStructures', RCP: 'feePayments',
    EXM: 'exams', MRK: 'marks',
    DOC: 'documents', ANN: 'announcements', TTB: 'timetable'
  };
  return map[prefix] || '';
}


/* ══════════════════════════════════════════════════════════════
   §14  PUBLIC API NAMESPACE — window.ERP
   All portals use: ERP.loadData(), ERP.showToast(), etc.
   ══════════════════════════════════════════════════════════════ */

window.ERP = {
  /* Core */
  loadData,
  saveData,
  exportData,
  importData,
  generateID,

  /* Auth */
  authenticateAdmin,
  authenticateStudent,
  setSession,
  logout,
  requireAdminLogin,
  requireStudentLogin,

  /* Helpers */
  showToast,
  getGrade,
  computeResult,
  getStudent,
  getStudentsByClass,
  getStudentFeePayments,
  getStudentFeeStatus,
  fmtDate,
  fmtMoney,
  ordinal,
  getInitials,
  renderLayout,

  /* Documents */
  downloadDocHTML,
  previewDocHTML,

  /* Import modal */
  openImportModal() {
    const el = document.getElementById('erp-import-overlay');
    if (el) { el.style.display = 'flex'; }
  },
  closeImportModal() {
    const el = document.getElementById('erp-import-overlay');
    if (el) { el.style.display = 'none'; }
    const ta = document.getElementById('erp-import-text');
    if (ta) ta.value = '';
    const fn = document.getElementById('erp-import-filename');
    if (fn) fn.textContent = '';
  },
  _handleImportFile(evt) {
    const file = evt.target.files[0];
    if (!file) return;
    const fn = document.getElementById('erp-import-filename');
    if (fn) fn.textContent = file.name;
    const reader = new FileReader();
    reader.onload = e => {
      const ta = document.getElementById('erp-import-text');
      if (ta) ta.value = e.target.result;
    };
    reader.readAsText(file);
  },
  _doImport() {
    const ta = document.getElementById('erp-import-text');
    if (!ta || !ta.value.trim()) {
      showToast('⚠️ Please paste or upload JSON data first.', 'warning');
      return;
    }
    const merged = importData(ta.value.trim());
    if (!merged) return;
    saveData(merged);
    showToast('✅ Data imported and merged successfully!', 'success');
    ERP.closeImportModal();
    if (typeof ERP.onImportSuccess === 'function') ERP.onImportSuccess(merged);
    else setTimeout(() => location.reload(), 800);
  },
  onImportSuccess: null, // pages can override: ERP.onImportSuccess = fn

  /* Confirm dialog */
  confirm(msg, onOk, title = 'Are you sure?') {
    const overlay  = document.getElementById('erp-confirm-overlay');
    const titleEl  = document.getElementById('erp-confirm-title');
    const msgEl    = document.getElementById('erp-confirm-msg');
    const okBtn    = document.getElementById('erp-confirm-ok');
    const cancelBtn= document.getElementById('erp-confirm-cancel');
    if (!overlay) { if (window.confirm(msg)) onOk(); return; }
    titleEl.textContent = title;
    msgEl.textContent   = msg;
    overlay.style.display = 'flex';
    const close = () => { overlay.style.display = 'none'; };
    okBtn.onclick     = () => { close(); onOk(); };
    cancelBtn.onclick = close;
    overlay.onclick   = e => { if (e.target === overlay) close(); };
  },

  /* Expose schema for reference */
  DEFAULT_SCHEMA,
  STORAGE_KEY
};

/* Also expose top-level for backward compat and convenience */
window.loadData       = loadData;
window.saveData       = saveData;
window.exportData     = exportData;
window.showToast      = showToast;
window.generateID     = generateID;
window.fmtDate        = fmtDate;
window.fmtMoney       = fmtMoney;
window.getGrade       = getGrade;
window.computeResult  = computeResult;

console.log('%c[School ERP] school_data.js loaded ✓', 'color:#FF6B35;font-weight:bold;font-size:13px;');
