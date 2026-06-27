// ---------------------------------------------------------------------------
// Prestige Properties — bilingual Kuwait CRM dataset (KWD pricing)
// All data is fictional. Reference "today" for relative dates is 2026-06-27.
// ---------------------------------------------------------------------------

export interface Bi {
  en: string;
  ar: string;
}

export type PropertyType = "Residential" | "Commercial" | "Mixed";
export type UnitType =
  | "Studio"
  | "1BR"
  | "2BR"
  | "3BR"
  | "Office"
  | "Retail"
  | "Villa";
export type TenantStatus = "Current" | "Late" | "Notice Given" | "Vacated";
export type VacancyStatus = "Listed" | "Preparing" | "Available";
export type Priority = "Low" | "Medium" | "High" | "Urgent";
export type TicketStatus = "Open" | "In Progress" | "Resolved";

export interface Unit {
  number: string;
  unitType: UnitType;
  rent: number; // KWD / month
  occupied: boolean;
  tenantName?: Bi;
  leaseStart?: string;
  leaseEnd?: string;
  tenantStatus?: TenantStatus;
  balanceOwed?: number;
  vacancyStatus?: VacancyStatus;
  vacantSince?: string;
  lastTenant?: Bi;
}

export interface Property {
  id: string;
  name: Bi;
  area: Bi;
  block: Bi;
  type: PropertyType;
  manager: Bi;
  gradient: string;
  yearBuilt: number;
  expenses: { maintenance: number; insurance: number; taxes: number };
  units: Unit[];
}

export interface Tenant {
  id: string;
  name: Bi;
  unit: string;
  propertyId: string;
  propertyName: Bi;
  leaseStart: string;
  leaseEnd: string;
  rent: number;
  balanceOwed: number;
  status: TenantStatus;
}

export interface MaintenanceTicket {
  id: string;
  propertyId: string;
  propertyName: Bi;
  unit: string;
  tenant: Bi;
  issue: Bi;
  priority: Priority;
  assignedTo: Bi;
  status: TicketStatus;
  opened: string;
  resolved?: string;
}

// Refined charcoal photo-placeholder gradients (no bright color).
const G = {
  a: "linear-gradient(135deg, #0b0f17 0%, #1f2937 60%, #374151 100%)",
  b: "linear-gradient(135deg, #111827 0%, #1f2430 55%, #2c3440 100%)",
  c: "linear-gradient(135deg, #0f1115 0%, #1c2530 55%, #3a4452 100%)",
  d: "linear-gradient(135deg, #14171c 0%, #232a33 60%, #404a57 100%)",
};

// Managers
const M = {
  saqr: { en: "Abdulaziz Al-Saqr", ar: "عبدالعزيز الصقر" },
  bahar: { en: "Lulwa Al-Bahar", ar: "لولوة البحر" },
  otaibi: { en: "Yousef Al-Otaibi", ar: "يوسف العتيبي" },
  mutairi: { en: "Dana Al-Mutairi", ar: "دانة المطيري" },
};

const AREA = {
  salmiya: { en: "Salmiya", ar: "السالمية" },
  hawalli: { en: "Hawalli", ar: "حولي" },
  mishref: { en: "Mishref", ar: "مشرف" },
  jabriya: { en: "Jabriya", ar: "الجابرية" },
  rumaithiya: { en: "Rumaithiya", ar: "الرميثية" },
  bayan: { en: "Bayan", ar: "بيان" },
};

const blk = (n: number, ar: string): Bi => ({ en: `Block ${n}`, ar: `قطعة ${ar}` });

export const properties: Property[] = [
  {
    id: "salmiya-heights",
    name: { en: "Salmiya Heights", ar: "أبراج السالمية" },
    area: AREA.salmiya,
    block: blk(4, "٤"),
    type: "Residential",
    manager: M.saqr,
    gradient: G.a,
    yearBuilt: 2018,
    expenses: { maintenance: 620, insurance: 240, taxes: 180 },
    units: [
      { number: "101", unitType: "1BR", rent: 280, occupied: true, tenantName: { en: "Fatima Al-Ali", ar: "فاطمة العلي" }, leaseStart: "2025-02-01", leaseEnd: "2026-01-31", tenantStatus: "Current", balanceOwed: 0 },
      { number: "102", unitType: "Studio", rent: 210, occupied: true, tenantName: { en: "Mohammed Al-Rashid", ar: "محمد الرشيد" }, leaseStart: "2024-09-15", leaseEnd: "2026-08-14", tenantStatus: "Current", balanceOwed: 0 },
      { number: "103", unitType: "2BR", rent: 430, occupied: true, tenantName: { en: "Noura Al-Sabah", ar: "نورة الصباح" }, leaseStart: "2025-06-01", leaseEnd: "2026-05-31", tenantStatus: "Notice Given", balanceOwed: 0 },
      { number: "201", unitType: "1BR", rent: 300, occupied: true, tenantName: { en: "Khaled Al-Fadhli", ar: "خالد الفضلي" }, leaseStart: "2025-01-10", leaseEnd: "2026-07-09", tenantStatus: "Late", balanceOwed: 300 },
      { number: "202", unitType: "2BR", rent: 450, occupied: true, tenantName: { en: "Mariam Al-Kandari", ar: "مريم الكندري" }, leaseStart: "2024-11-01", leaseEnd: "2026-10-31", tenantStatus: "Current", balanceOwed: 0 },
      { number: "203", unitType: "Studio", rent: 200, occupied: false, vacancyStatus: "Listed", vacantSince: "2026-05-12", lastTenant: { en: "Ahmad Al-Ajmi", ar: "أحمد العجمي" } },
      { number: "301", unitType: "3BR", rent: 620, occupied: true, tenantName: { en: "Aisha Al-Qattan", ar: "عائشة القطان" }, leaseStart: "2025-03-01", leaseEnd: "2026-08-31", tenantStatus: "Current", balanceOwed: 0 },
      { number: "302", unitType: "1BR", rent: 290, occupied: false, vacancyStatus: "Preparing", vacantSince: "2026-06-08", lastTenant: { en: "Sara Al-Khalifa", ar: "سارة الخليفة" } },
    ],
  },
  {
    id: "mishref-villas",
    name: { en: "Mishref Villas", ar: "فلل مشرف" },
    area: AREA.mishref,
    block: blk(6, "٦"),
    type: "Residential",
    manager: M.otaibi,
    gradient: G.b,
    yearBuilt: 2015,
    expenses: { maintenance: 880, insurance: 420, taxes: 240 },
    units: [
      { number: "Villa 1", unitType: "Villa", rent: 1500, occupied: true, tenantName: { en: "Abdullah Al-Dosari", ar: "عبدالله الدوسري" }, leaseStart: "2024-08-01", leaseEnd: "2026-07-31", tenantStatus: "Current", balanceOwed: 0 },
      { number: "Villa 2", unitType: "Villa", rent: 1650, occupied: true, tenantName: { en: "Hessa Al-Roumi", ar: "حصة الرومي" }, leaseStart: "2025-05-15", leaseEnd: "2026-05-14", tenantStatus: "Late", balanceOwed: 1650 },
      { number: "Villa 3", unitType: "Villa", rent: 1400, occupied: true, tenantName: { en: "Faisal Al-Enezi", ar: "فيصل العنزي" }, leaseStart: "2025-04-01", leaseEnd: "2026-09-30", tenantStatus: "Current", balanceOwed: 0 },
      { number: "Villa 4", unitType: "Villa", rent: 1550, occupied: false, vacancyStatus: "Available", vacantSince: "2026-04-02", lastTenant: { en: "Latifa Al-Mansour", ar: "لطيفة المنصور" } },
      { number: "Villa 5", unitType: "Villa", rent: 1800, occupied: true, tenantName: { en: "Omar Al-Hashemi", ar: "عمر الهاشمي" }, leaseStart: "2024-12-01", leaseEnd: "2026-11-30", tenantStatus: "Current", balanceOwed: 0 },
    ],
  },
  {
    id: "jabriya-residences",
    name: { en: "Jabriya Residences", ar: "مساكن الجابرية" },
    area: AREA.jabriya,
    block: blk(9, "٩"),
    type: "Residential",
    manager: M.bahar,
    gradient: G.c,
    yearBuilt: 2020,
    expenses: { maintenance: 700, insurance: 280, taxes: 200 },
    units: [
      { number: "1A", unitType: "1BR", rent: 260, occupied: true, tenantName: { en: "Dalal Al-Saleh", ar: "دلال الصالح" }, leaseStart: "2025-01-01", leaseEnd: "2026-07-31", tenantStatus: "Current", balanceOwed: 0 },
      { number: "1B", unitType: "1BR", rent: 250, occupied: true, tenantName: { en: "Bader Al-Mutawa", ar: "بدر المطوع" }, leaseStart: "2024-10-01", leaseEnd: "2026-09-30", tenantStatus: "Current", balanceOwed: 0 },
      { number: "1C", unitType: "Studio", rent: 190, occupied: true, tenantName: { en: "Reem Al-Failakawi", ar: "ريم الفيلكاوي" }, leaseStart: "2025-08-01", leaseEnd: "2026-07-31", tenantStatus: "Current", balanceOwed: 0 },
      { number: "2A", unitType: "2BR", rent: 410, occupied: true, tenantName: { en: "Yaqoub Al-Sane", ar: "يعقوب الصانع" }, leaseStart: "2025-02-15", leaseEnd: "2026-08-14", tenantStatus: "Late", balanceOwed: 410 },
      { number: "2B", unitType: "2BR", rent: 420, occupied: true, tenantName: { en: "Shaikha Al-Sayer", ar: "شيخة الساير" }, leaseStart: "2024-09-01", leaseEnd: "2026-08-31", tenantStatus: "Current", balanceOwed: 0 },
      { number: "2C", unitType: "Studio", rent: 185, occupied: false, vacancyStatus: "Listed", vacantSince: "2026-05-28", lastTenant: { en: "Nasser Al-Ghanim", ar: "ناصر الغانم" } },
      { number: "3A", unitType: "3BR", rent: 560, occupied: true, tenantName: { en: "Maryam Al-Hajri", ar: "مريم الهاجري" }, leaseStart: "2025-03-01", leaseEnd: "2026-08-28", tenantStatus: "Current", balanceOwed: 0 },
      { number: "3B", unitType: "2BR", rent: 440, occupied: true, tenantName: { en: "Talal Al-Wazzan", ar: "طلال الوزان" }, leaseStart: "2024-12-15", leaseEnd: "2026-12-14", tenantStatus: "Current", balanceOwed: 0 },
      { number: "3C", unitType: "1BR", rent: 270, occupied: false, vacancyStatus: "Preparing", vacantSince: "2026-06-15", lastTenant: { en: "Hamad Al-Rumaihi", ar: "حمد الرميحي" } },
    ],
  },
  {
    id: "rumaithiya-gardens",
    name: { en: "Rumaithiya Gardens", ar: "حدائق الرميثية" },
    area: AREA.rumaithiya,
    block: blk(2, "٢"),
    type: "Residential",
    manager: M.saqr,
    gradient: G.d,
    yearBuilt: 2017,
    expenses: { maintenance: 560, insurance: 230, taxes: 170 },
    units: [
      { number: "G1", unitType: "1BR", rent: 240, occupied: true, tenantName: { en: "Salem Al-Azmi", ar: "سالم العازمي" }, leaseStart: "2025-04-01", leaseEnd: "2026-08-31", tenantStatus: "Current", balanceOwed: 0 },
      { number: "G2", unitType: "2BR", rent: 380, occupied: true, tenantName: { en: "Munira Al-Sabah", ar: "منيرة الصباح" }, leaseStart: "2024-11-15", leaseEnd: "2026-11-14", tenantStatus: "Current", balanceOwed: 0 },
      { number: "F1", unitType: "2BR", rent: 400, occupied: true, tenantName: { en: "Jassim Al-Kharafi", ar: "جاسم الخرافي" }, leaseStart: "2025-06-15", leaseEnd: "2026-06-14", tenantStatus: "Late", balanceOwed: 800 },
      { number: "F2", unitType: "3BR", rent: 520, occupied: true, tenantName: { en: "Ghaya Al-Mulla", ar: "غايا الملا" }, leaseStart: "2025-02-01", leaseEnd: "2026-07-31", tenantStatus: "Current", balanceOwed: 0 },
      { number: "S1", unitType: "Studio", rent: 180, occupied: true, tenantName: { en: "Hamad Al-Shemmari", ar: "حمد الشمري" }, leaseStart: "2024-10-01", leaseEnd: "2026-09-30", tenantStatus: "Current", balanceOwed: 0 },
      { number: "S2", unitType: "1BR", rent: 250, occupied: false, vacancyStatus: "Available", vacantSince: "2026-05-01", lastTenant: { en: "Wadha Al-Otaibi", ar: "وضحة العتيبي" } },
    ],
  },
  {
    id: "hawalli-plaza",
    name: { en: "Hawalli Plaza", ar: "بلازا حولي" },
    area: AREA.hawalli,
    block: blk(12, "١٢"),
    type: "Commercial",
    manager: M.bahar,
    gradient: G.a,
    yearBuilt: 2012,
    expenses: { maintenance: 940, insurance: 520, taxes: 360 },
    units: [
      { number: "Shop 1", unitType: "Retail", rent: 850, occupied: true, tenantName: { en: "Al-Masa Restaurant", ar: "مطعم الماسة" }, leaseStart: "2023-06-01", leaseEnd: "2026-05-31", tenantStatus: "Notice Given", balanceOwed: 0 },
      { number: "Shop 2", unitType: "Retail", rent: 780, occupied: true, tenantName: { en: "Marina Pharmacy", ar: "صيدلية المارينا" }, leaseStart: "2024-01-01", leaseEnd: "2026-12-31", tenantStatus: "Current", balanceOwed: 0 },
      { number: "Office 1", unitType: "Office", rent: 950, occupied: true, tenantName: { en: "Al-Bahar Trading Co.", ar: "شركة البحر التجارية" }, leaseStart: "2024-03-01", leaseEnd: "2027-02-28", tenantStatus: "Current", balanceOwed: 0 },
      { number: "Office 2", unitType: "Office", rent: 900, occupied: false, vacancyStatus: "Available", vacantSince: "2026-02-18", lastTenant: { en: "Diwan Law Firm", ar: "مكتب الديوان للمحاماة" } },
      { number: "Office 3", unitType: "Office", rent: 1100, occupied: true, tenantName: { en: "Kuwait Tech Solutions", ar: "حلول الكويت التقنية" }, leaseStart: "2025-01-15", leaseEnd: "2026-08-14", tenantStatus: "Late", balanceOwed: 1100 },
    ],
  },
  {
    id: "salmiya-souq",
    name: { en: "Salmiya Souq Center", ar: "مجمع سوق السالمية" },
    area: AREA.salmiya,
    block: blk(10, "١٠"),
    type: "Mixed",
    manager: M.mutairi,
    gradient: G.b,
    yearBuilt: 2019,
    expenses: { maintenance: 820, insurance: 460, taxes: 300 },
    units: [
      { number: "R1", unitType: "Retail", rent: 700, occupied: true, tenantName: { en: "Boutique Café", ar: "مقهى بوتيك" }, leaseStart: "2024-05-01", leaseEnd: "2026-09-30", tenantStatus: "Current", balanceOwed: 0 },
      { number: "R2", unitType: "Retail", rent: 650, occupied: false, vacancyStatus: "Listed", vacantSince: "2026-03-20", lastTenant: { en: "Zain Telecom Branch", ar: "فرع زين للاتصالات" } },
      { number: "A1", unitType: "1BR", rent: 300, occupied: true, tenantName: { en: "Abdulrahman Al-Sayegh", ar: "عبدالرحمن الصايغ" }, leaseStart: "2025-04-01", leaseEnd: "2026-08-31", tenantStatus: "Current", balanceOwed: 0 },
      { number: "A2", unitType: "2BR", rent: 470, occupied: true, tenantName: { en: "Bibi Al-Awadhi", ar: "بيبي العوضي" }, leaseStart: "2024-11-15", leaseEnd: "2026-11-14", tenantStatus: "Current", balanceOwed: 0 },
      { number: "A3", unitType: "2BR", rent: 480, occupied: true, tenantName: { en: "Saad Al-Ajmi", ar: "سعد العجمي" }, leaseStart: "2025-06-15", leaseEnd: "2026-06-14", tenantStatus: "Late", balanceOwed: 480 },
      { number: "A4", unitType: "1BR", rent: 310, occupied: true, tenantName: { en: "Eman Al-Khaldi", ar: "إيمان الخالدي" }, leaseStart: "2025-02-01", leaseEnd: "2026-07-31", tenantStatus: "Current", balanceOwed: 0 },
      { number: "A5", unitType: "3BR", rent: 680, occupied: true, tenantName: { en: "Waleed Al-Rashidi", ar: "وليد الرشيدي" }, leaseStart: "2024-10-01", leaseEnd: "2026-09-30", tenantStatus: "Current", balanceOwed: 0 },
      { number: "A6", unitType: "1BR", rent: 320, occupied: false, vacancyStatus: "Preparing", vacantSince: "2026-06-20", lastTenant: { en: "Dana Al-Sahli", ar: "دانة السهلي" } },
    ],
  },
  {
    id: "bayan-tower",
    name: { en: "Bayan Commercial Tower", ar: "برج بيان التجاري" },
    area: AREA.bayan,
    block: blk(7, "٧"),
    type: "Commercial",
    manager: M.otaibi,
    gradient: G.c,
    yearBuilt: 2010,
    expenses: { maintenance: 760, insurance: 480, taxes: 340 },
    units: [
      { number: "Floor 1", unitType: "Office", rent: 1200, occupied: true, tenantName: { en: "Gulf Finance House", ar: "بيت التمويل الخليجي" }, leaseStart: "2024-02-01", leaseEnd: "2027-01-31", tenantStatus: "Current", balanceOwed: 0 },
      { number: "Floor 2", unitType: "Office", rent: 1050, occupied: true, tenantName: { en: "Vertex Design Studio", ar: "استوديو فيرتكس للتصميم" }, leaseStart: "2025-01-01", leaseEnd: "2026-08-31", tenantStatus: "Current", balanceOwed: 0 },
      { number: "Floor 3", unitType: "Office", rent: 1000, occupied: false, vacancyStatus: "Listed", vacantSince: "2026-01-15", lastTenant: { en: "Helix Biotech", ar: "هيليكس للتقنية الحيوية" } },
      { number: "Floor 4", unitType: "Office", rent: 1150, occupied: true, tenantName: { en: "Quill & Co. Consulting", ar: "كويل وشركاه للاستشارات" }, leaseStart: "2024-09-01", leaseEnd: "2026-08-31", tenantStatus: "Current", balanceOwed: 0 },
    ],
  },
];

// --- Derived collections --------------------------------------------------

export function getProperty(id: string): Property | undefined {
  return properties.find((p) => p.id === id);
}

export const tenants: Tenant[] = properties.flatMap((p) =>
  p.units
    .filter((u) => u.occupied && u.tenantName)
    .map((u) => ({
      id: `${p.id}-${u.number}`.toLowerCase().replace(/\s+/g, "-"),
      name: u.tenantName!,
      unit: u.number,
      propertyId: p.id,
      propertyName: p.name,
      leaseStart: u.leaseStart!,
      leaseEnd: u.leaseEnd!,
      rent: u.rent,
      balanceOwed: u.balanceOwed ?? 0,
      status: u.tenantStatus!,
    }))
);

export function getTenant(id: string): Tenant | undefined {
  return tenants.find((t) => t.id === id);
}

export interface VacantUnit {
  propertyId: string;
  propertyName: Bi;
  area: Bi;
  unit: string;
  unitType: UnitType;
  rent: number;
  vacantSince: string;
  lastTenant: Bi;
  vacancyStatus: VacancyStatus;
}

export const vacancies: VacantUnit[] = properties.flatMap((p) =>
  p.units
    .filter((u) => !u.occupied)
    .map((u) => ({
      propertyId: p.id,
      propertyName: p.name,
      area: p.area,
      unit: u.number,
      unitType: u.unitType,
      rent: u.rent,
      vacantSince: u.vacantSince!,
      lastTenant: u.lastTenant ?? { en: "—", ar: "—" },
      vacancyStatus: u.vacancyStatus ?? "Available",
    }))
);

// --- Maintenance ----------------------------------------------------------

const VENDOR = {
  plumb: { en: "Reliable Plumbing Co.", ar: "شركة السباكة الموثوقة" },
  hvac: { en: "Gulf HVAC Services", ar: "خدمات الخليج للتكييف" },
  inhouse: { en: "In-house Maintenance", ar: "الصيانة الداخلية" },
  electric: { en: "Al-Salem Electric", ar: "السالم للكهرباء" },
  reno: { en: "Coastline Renovations", ar: "الساحل للتجديدات" },
  otis: { en: "Otis Service", ar: "خدمة أوتيس" },
};

const pName = (id: string): Bi => getProperty(id)!.name;

export const maintenance: MaintenanceTicket[] = [
  { id: "MT-2041", propertyId: "salmiya-heights", propertyName: pName("salmiya-heights"), unit: "201", tenant: { en: "Khaled Al-Fadhli", ar: "خالد الفضلي" }, issue: { en: "Kitchen faucet leaking under the sink", ar: "تسرّب من حنفية المطبخ تحت الحوض" }, priority: "Medium", assignedTo: VENDOR.plumb, status: "In Progress", opened: "2026-06-18" },
  { id: "MT-2042", propertyId: "jabriya-residences", propertyName: pName("jabriya-residences"), unit: "2A", tenant: { en: "Yaqoub Al-Sane", ar: "يعقوب الصانع" }, issue: { en: "No hot water in the master bathroom", ar: "لا يوجد ماء ساخن في الحمام الرئيسي" }, priority: "Urgent", assignedTo: VENDOR.hvac, status: "Open", opened: "2026-06-25" },
  { id: "MT-2043", propertyId: "bayan-tower", propertyName: pName("bayan-tower"), unit: "Floor 2", tenant: { en: "Vertex Design Studio", ar: "استوديو فيرتكس للتصميم" }, issue: { en: "AC not cooling on the second floor", ar: "المكيف لا يبرّد في الطابق الثاني" }, priority: "High", assignedTo: VENDOR.hvac, status: "Open", opened: "2026-06-23" },
  { id: "MT-2044", propertyId: "salmiya-souq", propertyName: pName("salmiya-souq"), unit: "R1", tenant: { en: "Boutique Café", ar: "مقهى بوتيك" }, issue: { en: "Walk-in cooler tripping the breaker", ar: "ثلاجة المحل تفصل القاطع الكهربائي" }, priority: "Urgent", assignedTo: VENDOR.electric, status: "In Progress", opened: "2026-06-20" },
  { id: "MT-2045", propertyId: "mishref-villas", propertyName: pName("mishref-villas"), unit: "Villa 2", tenant: { en: "Hessa Al-Roumi", ar: "حصة الرومي" }, issue: { en: "Garden irrigation pump failure", ar: "عطل في مضخة ري الحديقة" }, priority: "Low", assignedTo: VENDOR.inhouse, status: "Open", opened: "2026-06-24" },
  { id: "MT-2046", propertyId: "rumaithiya-gardens", propertyName: pName("rumaithiya-gardens"), unit: "F1", tenant: { en: "Jassim Al-Kharafi", ar: "جاسم الخرافي" }, issue: { en: "Main entrance door lock malfunction", ar: "خلل في قفل باب المدخل الرئيسي" }, priority: "Medium", assignedTo: VENDOR.inhouse, status: "Open", opened: "2026-06-19" },
  { id: "MT-2047", propertyId: "salmiya-heights", propertyName: pName("salmiya-heights"), unit: "302", tenant: { en: "—", ar: "—" }, issue: { en: "Repaint and deep clean for turnover", ar: "إعادة دهان وتنظيف شامل للتجهيز" }, priority: "Medium", assignedTo: VENDOR.reno, status: "In Progress", opened: "2026-06-09" },
  { id: "MT-2048", propertyId: "bayan-tower", propertyName: pName("bayan-tower"), unit: "Floor 1", tenant: { en: "Gulf Finance House", ar: "بيت التمويل الخليجي" }, issue: { en: "Elevator inspection overdue", ar: "فحص المصعد متأخر" }, priority: "High", assignedTo: VENDOR.otis, status: "Open", opened: "2026-06-22" },
  { id: "MT-2031", propertyId: "jabriya-residences", propertyName: pName("jabriya-residences"), unit: "1B", tenant: { en: "Bader Al-Mutawa", ar: "بدر المطوع" }, issue: { en: "Replace smoke detector batteries", ar: "استبدال بطاريات كاشف الدخان" }, priority: "Low", assignedTo: VENDOR.inhouse, status: "Resolved", opened: "2026-05-30", resolved: "2026-06-02" },
  { id: "MT-2032", propertyId: "mishref-villas", propertyName: pName("mishref-villas"), unit: "Villa 5", tenant: { en: "Omar Al-Hashemi", ar: "عمر الهاشمي" }, issue: { en: "Replace balcony door weather seal", ar: "استبدال عازل باب الشرفة" }, priority: "Medium", assignedTo: VENDOR.reno, status: "Resolved", opened: "2026-05-21", resolved: "2026-06-04" },
  { id: "MT-2033", propertyId: "salmiya-souq", propertyName: pName("salmiya-souq"), unit: "A3", tenant: { en: "Saad Al-Ajmi", ar: "سعد العجمي" }, issue: { en: "Bedroom window won't latch", ar: "نافذة غرفة النوم لا تُغلق" }, priority: "Low", assignedTo: VENDOR.inhouse, status: "Resolved", opened: "2026-05-18", resolved: "2026-05-22" },
  { id: "MT-2034", propertyId: "hawalli-plaza", propertyName: pName("hawalli-plaza"), unit: "Shop 2", tenant: { en: "Marina Pharmacy", ar: "صيدلية المارينا" }, issue: { en: "Storefront signage light flickering", ar: "إضاءة لوحة المحل تومض" }, priority: "Low", assignedTo: VENDOR.electric, status: "Resolved", opened: "2026-05-11", resolved: "2026-05-15" },
];

export function maintenanceForProperty(id: string): MaintenanceTicket[] {
  return maintenance.filter((m) => m.propertyId === id);
}

// --- KPI / financial helpers ---------------------------------------------

export interface PropertyStats {
  unitsTotal: number;
  unitsOccupied: number;
  unitsVacant: number;
  occupancyRate: number;
  monthlyRevenue: number;
  grossPotentialRent: number;
  vacancyLoss: number;
}

export function propertyStats(p: Property): PropertyStats {
  const unitsTotal = p.units.length;
  const occupied = p.units.filter((u) => u.occupied);
  const unitsOccupied = occupied.length;
  const unitsVacant = unitsTotal - unitsOccupied;
  const monthlyRevenue = occupied.reduce((s, u) => s + u.rent, 0);
  const grossPotentialRent = p.units.reduce((s, u) => s + u.rent, 0);
  return {
    unitsTotal,
    unitsOccupied,
    unitsVacant,
    occupancyRate: unitsTotal ? (unitsOccupied / unitsTotal) * 100 : 0,
    monthlyRevenue,
    grossPotentialRent,
    vacancyLoss: grossPotentialRent - monthlyRevenue,
  };
}

export interface PropertyFinancials {
  grossRent: number;
  vacancyLoss: number;
  collected: number;
  maintenance: number;
  managementFee: number;
  insurance: number;
  taxes: number;
  operatingExpenses: number;
  noi: number;
}

const MGMT_FEE_RATE = 0.08;

export function propertyFinancials(p: Property, months = 1): PropertyFinancials {
  const s = propertyStats(p);
  const grossRent = s.grossPotentialRent * months;
  const vacancyLoss = s.vacancyLoss * months;
  const collected = s.monthlyRevenue * months;
  const maintenance = p.expenses.maintenance * months;
  const insurance = p.expenses.insurance * months;
  const taxes = p.expenses.taxes * months;
  const managementFee = Math.round(collected * MGMT_FEE_RATE);
  const operatingExpenses = maintenance + insurance + taxes + managementFee;
  return {
    grossRent,
    vacancyLoss,
    collected,
    maintenance,
    managementFee,
    insurance,
    taxes,
    operatingExpenses,
    noi: collected - operatingExpenses,
  };
}

export interface PortfolioKpis {
  totalProperties: number;
  totalUnits: number;
  occupiedUnits: number;
  vacantUnits: number;
  occupancyRate: number;
  monthlyRevenue: number;
  outstandingRent: number;
  openMaintenance: number;
}

export function portfolioKpis(): PortfolioKpis {
  const stats = properties.map(propertyStats);
  const totalUnits = stats.reduce((s, x) => s + x.unitsTotal, 0);
  const occupiedUnits = stats.reduce((s, x) => s + x.unitsOccupied, 0);
  const monthlyRevenue = stats.reduce((s, x) => s + x.monthlyRevenue, 0);
  return {
    totalProperties: properties.length,
    totalUnits,
    occupiedUnits,
    vacantUnits: totalUnits - occupiedUnits,
    occupancyRate: totalUnits ? (occupiedUnits / totalUnits) * 100 : 0,
    monthlyRevenue,
    outstandingRent: tenants.reduce((s, t) => s + t.balanceOwed, 0),
    openMaintenance: maintenance.filter((m) => m.status !== "Resolved").length,
  };
}

// --- Charts data ----------------------------------------------------------

export const MONTH_LABELS: Bi[] = [
  { en: "Jul", ar: "يوليو" },
  { en: "Aug", ar: "أغسطس" },
  { en: "Sep", ar: "سبتمبر" },
  { en: "Oct", ar: "أكتوبر" },
  { en: "Nov", ar: "نوفمبر" },
  { en: "Dec", ar: "ديسمبر" },
  { en: "Jan", ar: "يناير" },
  { en: "Feb", ar: "فبراير" },
  { en: "Mar", ar: "مارس" },
  { en: "Apr", ar: "أبريل" },
  { en: "May", ar: "مايو" },
  { en: "Jun", ar: "يونيو" },
];

const _kpis = portfolioKpis();

// Trailing 12 months, trending up toward the current collected revenue.
const REV_FACTORS = [
  0.9, 0.91, 0.93, 0.94, 0.95, 0.96, 0.965, 0.975, 0.98, 0.985, 0.995, 1,
];
export const revenueByMonth: number[] = REV_FACTORS.map((f) =>
  Math.round(_kpis.monthlyRevenue * f)
);

// Trailing 12 months of occupancy, ending at the current rate.
export const occupancyTrend: number[] = [
  88.5, 89.1, 90.2, 89.6, 91, 91.8, 90.4, 92.1, 91.3, 92.7, 86, _kpis.occupancyRate,
].map((v) => Math.round(v * 10) / 10);

export interface RevenueSlice {
  propertyId: string;
  name: Bi;
  value: number;
  color: string;
}

const PIE_COLORS = [
  "#D4AF37",
  "#B8962E",
  "#8a7320",
  "#6b5818",
  "#caa84a",
  "#9c8228",
  "#e0c468",
];

export const revenueByProperty: RevenueSlice[] = properties.map((p, i) => ({
  propertyId: p.id,
  name: p.name,
  value: propertyStats(p).monthlyRevenue,
  color: PIE_COLORS[i % PIE_COLORS.length],
}));

// --- Tenant profile synthesis (deterministic) ----------------------------

export interface Payment {
  month: Bi;
  amount: number;
  status: "Paid" | "Late" | "Outstanding";
  date: string;
}

const PAY_MONTHS: { label: Bi; date: string }[] = [
  { label: { en: "January 2026", ar: "يناير ٢٠٢٦" }, date: "2026-01-01" },
  { label: { en: "February 2026", ar: "فبراير ٢٠٢٦" }, date: "2026-02-01" },
  { label: { en: "March 2026", ar: "مارس ٢٠٢٦" }, date: "2026-03-01" },
  { label: { en: "April 2026", ar: "أبريل ٢٠٢٦" }, date: "2026-04-01" },
  { label: { en: "May 2026", ar: "مايو ٢٠٢٦" }, date: "2026-05-01" },
  { label: { en: "June 2026", ar: "يونيو ٢٠٢٦" }, date: "2026-06-01" },
];

export function tenantPayments(t: Tenant): Payment[] {
  return PAY_MONTHS.map((m, i) => {
    const isCurrentMonth = i === PAY_MONTHS.length - 1;
    if (t.status === "Late" && isCurrentMonth) {
      return { month: m.label, amount: t.rent, status: "Outstanding", date: m.date };
    }
    const late = t.status === "Late" && i === PAY_MONTHS.length - 3;
    return {
      month: m.label,
      amount: t.rent,
      status: late ? "Late" : "Paid",
      date: late ? m.date.replace("-01", "-09") : m.date.replace("-01", "-02"),
    };
  });
}

export interface CommLog {
  date: string;
  channel: "Email" | "Phone" | "SMS" | "Portal";
  summary: Bi;
}

export function tenantCommLog(t: Tenant): CommLog[] {
  const base: CommLog[] = [
    { date: "2026-06-01", channel: "Portal", summary: { en: "Automated rent invoice delivered for June.", ar: "تم إرسال فاتورة الإيجار الآلية لشهر يونيو." } },
    { date: "2026-04-14", channel: "Email", summary: { en: "Confirmed annual AC servicing schedule.", ar: "تم تأكيد جدول الصيانة السنوية للمكيفات." } },
  ];
  if (t.status === "Late") {
    base.unshift({ date: "2026-06-21", channel: "Phone", summary: { en: "Discussed past-due balance; tenant committed to pay by month end.", ar: "نوقش الرصيد المتأخر؛ التزم المستأجر بالسداد قبل نهاية الشهر." } });
  }
  if (t.status === "Notice Given") {
    base.unshift({ date: "2026-06-05", channel: "Email", summary: { en: "Received notice to vacate; turnover scheduling started.", ar: "تم استلام إشعار الإخلاء؛ بدأ جدولة التجهيز." } });
  }
  return base;
}

export function tenantDocs(t: Tenant): { name: Bi; date: string }[] {
  return [
    { name: { en: "Signed Lease Agreement.pdf", ar: "عقد الإيجار الموقّع.pdf" }, date: t.leaseStart },
    { name: { en: "Move-in Inspection Report.pdf", ar: "تقرير فحص الاستلام.pdf" }, date: t.leaseStart },
    { name: { en: "Security Deposit Receipt.pdf", ar: "إيصال التأمين.pdf" }, date: t.leaseStart },
    { name: { en: "Civil ID Copy.pdf", ar: "صورة البطاقة المدنية.pdf" }, date: t.leaseStart },
  ];
}
