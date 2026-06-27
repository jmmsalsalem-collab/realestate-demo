"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export type Lang = "en" | "ar";

type Dict = Record<string, { en: string; ar: string }>;

export const translations: Dict = {
  // Brand / nav
  brandTagline: { en: "Property CRM", ar: "إدارة العقارات" },
  demoEnv: { en: "Demo environment · fictional data", ar: "بيئة تجريبية · بيانات افتراضية" },
  nav_dashboard: { en: "Dashboard", ar: "لوحة التحكم" },
  nav_properties: { en: "Properties", ar: "العقارات" },
  nav_tenants: { en: "Tenants", ar: "المستأجرون" },
  nav_vacancies: { en: "Vacancies", ar: "الوحدات الشاغرة" },
  nav_financials: { en: "Financials", ar: "الماليات" },
  nav_maintenance: { en: "Maintenance", ar: "الصيانة" },
  nav_ai: { en: "AI Assistant", ar: "المساعد الذكي" },
  nav_settings: { en: "Settings", ar: "الإعدادات" },
  askAi: { en: "Ask AI", ar: "اسأل الذكاء" },

  // Generic
  viewAll: { en: "View all", ar: "عرض الكل" },
  details: { en: "Details", ar: "التفاصيل" },
  manager: { en: "Manager", ar: "المدير" },
  type: { en: "Type", ar: "النوع" },
  status: { en: "Status", ar: "الحالة" },
  unit: { en: "Unit", ar: "الوحدة" },
  units: { en: "Units", ar: "الوحدات" },
  tenant: { en: "Tenant", ar: "المستأجر" },
  property: { en: "Property", ar: "العقار" },
  rent: { en: "Rent", ar: "الإيجار" },
  monthlyRent: { en: "Monthly Rent", ar: "الإيجار الشهري" },
  balance: { en: "Balance", ar: "الرصيد" },
  action: { en: "Action", ar: "إجراء" },
  occupied: { en: "Occupied", ar: "مشغول" },
  vacant: { en: "Vacant", ar: "شاغر" },
  lease: { en: "Lease", ar: "العقد" },
  leaseStart: { en: "Lease Start", ar: "بداية العقد" },
  leaseEnd: { en: "Lease End", ar: "نهاية العقد" },
  built: { en: "Built", ar: "سنة البناء" },
  of: { en: "of", ar: "من" },
  since: { en: "Since", ar: "منذ" },

  // Dashboard
  dashboardSubtitle: { en: "Portfolio overview · June 2026", ar: "نظرة عامة على المحفظة · يونيو ٢٠٢٦" },
  totalProperties: { en: "Total Properties", ar: "إجمالي العقارات" },
  occupiedUnits: { en: "Occupied Units", ar: "الوحدات المشغولة" },
  vacantUnits: { en: "Vacant Units", ar: "الوحدات الشاغرة" },
  occupancyRate: { en: "Occupancy Rate", ar: "نسبة الإشغال" },
  monthlyRevenue: { en: "Monthly Revenue", ar: "الإيراد الشهري" },
  outstandingRent: { en: "Outstanding Rent", ar: "الإيجار المستحق" },
  openMaintenance: { en: "Open Maintenance", ar: "صيانة مفتوحة" },
  annualizedRevenue: { en: "Annualized Revenue", ar: "الإيراد السنوي" },
  unitsTotalHint: { en: "units total", ar: "وحدة إجمالاً" },
  collectedPerMonth: { en: "Collected rent / month", ar: "الإيجار المحصّل / شهرياً" },
  pastDueBalances: { en: "Past-due balances", ar: "أرصدة متأخرة" },
  unresolvedTickets: { en: "Unresolved tickets", ar: "طلبات غير منجزة" },
  acrossPortfolio: { en: "Across portfolio", ar: "عبر المحفظة" },
  runRate: { en: "Run-rate estimate", ar: "تقدير المعدل السنوي" },
  revenueByMonth: { en: "Revenue by Month", ar: "الإيراد حسب الشهر" },
  occupancyTrend: { en: "Occupancy Trend", ar: "اتجاه الإشغال" },
  revenueByProperty: { en: "Revenue by Property", ar: "الإيراد حسب العقار" },
  recentMaintenance: { en: "Recent Maintenance Requests", ar: "أحدث طلبات الصيانة" },

  // Properties
  propertiesSubtitleN: { en: "properties under management", ar: "عقار تحت الإدارة" },
  occ: { en: "Occ.", ar: "إشغال" },
  perMonthShort: { en: "Monthly Revenue", ar: "الإيراد الشهري" },

  // Property detail
  backToProperties: { en: "Back to Properties", ar: "العودة إلى العقارات" },
  unitRoster: { en: "Unit Roster", ar: "قائمة الوحدات" },
  monthlyFinancials: { en: "Monthly Financials", ar: "الماليات الشهرية" },
  maintenanceRequests: { en: "Maintenance Requests", ar: "طلبات الصيانة" },
  noMaintenance: { en: "No maintenance requests on record.", ar: "لا توجد طلبات صيانة مسجلة." },
  grossPotentialRent: { en: "Gross Potential Rent", ar: "إجمالي الإيجار المحتمل" },
  vacancyLoss: { en: "Vacancy Loss", ar: "خسارة الشغور" },
  collectedRent: { en: "Collected Rent", ar: "الإيجار المحصّل" },
  maintenanceCost: { en: "Maintenance", ar: "الصيانة" },
  managementFee: { en: "Management Fee (8%)", ar: "رسوم الإدارة (٨٪)" },
  insurance: { en: "Insurance", ar: "التأمين" },
  propertyTaxes: { en: "Service Charges", ar: "رسوم الخدمات" },
  netOperatingIncome: { en: "Net Operating Income", ar: "صافي الدخل التشغيلي" },

  // Tenants
  activeTenants: { en: "active tenants", ar: "مستأجر نشط" },
  tn_current: { en: "Current", ar: "منتظم" },
  tn_late: { en: "Late", ar: "متأخر" },
  tn_notice: { en: "Notice Given", ar: "إشعار إخلاء" },
  tn_vacated: { en: "Vacated", ar: "أخلى" },

  // Tenant profile
  backToTenants: { en: "Back to Tenants", ar: "العودة إلى المستأجرين" },
  balanceOwed: { en: "Balance Owed", ar: "الرصيد المستحق" },
  paymentHistory: { en: "Payment History", ar: "سجل الدفعات" },
  leaseDocuments: { en: "Lease Documents", ar: "مستندات العقد" },
  communicationLog: { en: "Communication Log", ar: "سجل المراسلات" },
  collectedYtd: { en: "collected YTD", ar: "محصّل هذا العام" },
  period: { en: "Period", ar: "الفترة" },
  date: { en: "Date", ar: "التاريخ" },
  amount: { en: "Amount", ar: "المبلغ" },
  pay_paid: { en: "Paid", ar: "مدفوع" },
  pay_late: { en: "Late", ar: "متأخر" },
  pay_outstanding: { en: "Outstanding", ar: "مستحق" },
  ch_email: { en: "Email", ar: "بريد إلكتروني" },
  ch_phone: { en: "Phone", ar: "هاتف" },
  ch_sms: { en: "SMS", ar: "رسالة نصية" },
  ch_portal: { en: "Portal", ar: "البوابة" },

  // Vacancies
  vacantUnitsN: { en: "vacant units", ar: "وحدة شاغرة" },
  potentialRent: { en: "potential rent", ar: "إيجار محتمل" },
  monthlyVacancyLoss: { en: "Monthly Vacancy Loss", ar: "خسارة الشغور الشهرية" },
  avgDaysVacant: { en: "Avg. Days Vacant", ar: "متوسط أيام الشغور" },
  days: { en: "days", ar: "يوم" },
  askingRent: { en: "Asking Rent", ar: "الإيجار المطلوب" },
  daysVacant: { en: "Days Vacant", ar: "أيام الشغور" },
  lastTenant: { en: "Last Tenant", ar: "آخر مستأجر" },
  listUnit: { en: "List Unit", ar: "عرض الوحدة" },
  vc_listed: { en: "Listed", ar: "معروضة" },
  vc_preparing: { en: "Preparing", ar: "قيد التجهيز" },
  vc_available: { en: "Available", ar: "متاحة" },

  // Financials
  financialsSubtitle: { en: "Profit & loss by property and portfolio", ar: "الأرباح والخسائر حسب العقار والمحفظة" },
  thisMonth: { en: "This Month", ar: "هذا الشهر" },
  thisQuarter: { en: "This Quarter", ar: "هذا الربع" },
  thisYear: { en: "This Year", ar: "هذه السنة" },
  operatingExpenses: { en: "Operating Expenses", ar: "المصروفات التشغيلية" },
  noiMargin: { en: "NOI margin", ar: "هامش صافي الدخل" },
  plByProperty: { en: "P&L by Property", ar: "الأرباح والخسائر حسب العقار" },
  grossRent: { en: "Gross Rent", ar: "إجمالي الإيجار" },
  collected: { en: "Collected", ar: "محصّل" },
  maintShort: { en: "Maint.", ar: "صيانة" },
  mgmtFeeShort: { en: "Mgmt Fee", ar: "رسوم الإدارة" },
  taxesShort: { en: "Service", ar: "خدمات" },
  noiShort: { en: "NOI", ar: "صافي الدخل" },
  portfolioTotal: { en: "Portfolio Total", ar: "إجمالي المحفظة" },

  // Maintenance
  requests: { en: "requests", ar: "طلب" },
  openLabel: { en: "open", ar: "مفتوح" },
  mt_open: { en: "Open", ar: "مفتوح" },
  mt_inprogress: { en: "In Progress", ar: "قيد التنفيذ" },
  mt_resolved: { en: "Resolved", ar: "منجز" },
  pr_low: { en: "Low", ar: "منخفض" },
  pr_medium: { en: "Medium", ar: "متوسط" },
  pr_high: { en: "High", ar: "عالٍ" },
  pr_urgent: { en: "Urgent", ar: "عاجل" },
  urgentLabel: { en: "Urgent", ar: "عاجل" },
  ticket: { en: "Ticket", ar: "الطلب" },
  propertyUnit: { en: "Property / Unit", ar: "العقار / الوحدة" },
  issue: { en: "Issue", ar: "العطل" },
  priority: { en: "Priority", ar: "الأولوية" },
  assignedTo: { en: "Assigned To", ar: "مُسند إلى" },
  opened: { en: "Opened", ar: "تاريخ الفتح" },
  resolved: { en: "Resolved", ar: "تاريخ الإنجاز" },

  // Property types
  pt_Residential: { en: "Residential", ar: "سكني" },
  pt_Commercial: { en: "Commercial", ar: "تجاري" },
  pt_Mixed: { en: "Mixed Use", ar: "متعدد الاستخدام" },

  // Unit types
  ut_Studio: { en: "Studio", ar: "استوديو" },
  "ut_1BR": { en: "1BR", ar: "غرفة" },
  "ut_2BR": { en: "2BR", ar: "غرفتان" },
  "ut_3BR": { en: "3BR", ar: "٣ غرف" },
  ut_Office: { en: "Office", ar: "مكتب" },
  ut_Retail: { en: "Retail", ar: "محل تجاري" },
  ut_Villa: { en: "Villa", ar: "فيلا" },

  // AI assistant
  aiAgent: { en: "Prestige AI Agent", ar: "وكيل بريستيج الذكي" },
  aiSubtitle: { en: "Portfolio intelligence for your team", ar: "ذكاء المحفظة لفريقك" },
  active: { en: "Active", ar: "مُفعّل" },
  inactive: { en: "Inactive", ar: "غير مُفعّل" },
  addApiKey: { en: "Add API Key to Activate", ar: "أضف مفتاح API للتفعيل" },
  askPortfolio: { en: "Ask about your portfolio...", ar: "اسأل عن محفظتك العقارية..." },
  connectBannerPre: { en: "Add your free Gemini API key in", ar: "أضف مفتاح Gemini المجاني في" },
  connectBannerPost: { en: "to activate.", ar: "للتفعيل." },
  q_occupancy: { en: "Which properties have the lowest occupancy rate?", ar: "ما هي العقارات الأقل في نسبة الإشغال؟" },
  q_overdue: { en: "How much rent is overdue across all properties?", ar: "كم يبلغ الإيجار المتأخر عبر جميع العقارات؟" },
  q_expiring: { en: "Which leases are expiring in the next 60 days?", ar: "ما هي العقود التي تنتهي خلال الـ ٦٠ يوماً القادمة؟" },
  q_noi: { en: "What's our NOI compared to last quarter?", ar: "كيف يقارن صافي دخلنا التشغيلي بالربع الماضي؟" },
  a_occ_intro: { en: "Here are the three properties with the lowest occupancy right now:", ar: "إليك العقارات الثلاثة الأقل إشغالاً حالياً:" },
  a_occ_unitsVacant: { en: "units vacant", ar: "وحدة شاغرة" },
  a_occ_outro: { en: "is the priority — I'd recommend prioritizing turnover and re-listing there to recover the lost rent.", ar: "هو الأولوية — أنصح بالتركيز على التجهيز وإعادة العرض لاستعادة الإيجار المفقود." },
  a_overdue_intro1: { en: "Total outstanding rent across the portfolio is", ar: "إجمالي الإيجار المستحق عبر المحفظة هو" },
  a_overdue_intro2: { en: "from", ar: "من" },
  a_overdue_tenants: { en: "tenants:", ar: "مستأجرين:" },
  a_overdue_outro: { en: "carries the largest balance. Want me to draft reminder notices for these accounts?", ar: "لديه أكبر رصيد مستحق. هل أصيغ إشعارات تذكير لهذه الحسابات؟" },
  a_exp_intro1: { en: "leases are expiring within 60 days. Ranked by renewal risk:", ar: "عقود تنتهي خلال ٦٠ يوماً. مرتبة حسب مخاطر التجديد:" },
  a_exp_outro: { en: "I'd start renewal conversations with the good-standing tenants first and prepare turnover plans for the high-risk units.", ar: "أبدأ محادثات التجديد مع المستأجرين المنتظمين أولاً وأجهّز خطط الإخلاء للوحدات عالية المخاطر." },
  risk_high: { en: "High — notice given", ar: "عالية — تم الإشعار" },
  risk_elevated: { en: "Elevated — payment issues", ar: "مرتفعة — مشاكل سداد" },
  risk_low: { en: "Low — good standing", ar: "منخفضة — وضع جيد" },
  a_noi_intro: { en: "Net Operating Income, quarter over quarter:", ar: "صافي الدخل التشغيلي، ربعاً مقابل ربع:" },
  lastQuarter: { en: "Last Quarter", ar: "الربع الماضي" },
  a_noi_outro1: { en: "That's an increase of", ar: "هذا ارتفاع بنسبة" },
  a_noi_outro2: { en: ", driven mainly by reduced vacancy loss and stable operating expenses across the residential portfolio.", ar: "، مدفوعاً بشكل رئيسي بانخفاض خسارة الشغور واستقرار المصروفات التشغيلية في المحفظة السكنية." },
  demoNote: { en: "This is a demonstration build, so I'm showing sample answers rather than calling the live model. With a connected key, I'd analyze your live portfolio data to answer that.", ar: "هذه نسخة تجريبية، لذا أعرض إجابات نموذجية بدلاً من استدعاء النموذج المباشر. مع مفتاح مرتبط، سأحلل بيانات محفظتك الحية للإجابة على ذلك." },
  thinking: { en: "Thinking…", ar: "جارٍ التفكير…" },
  aiError: { en: "Couldn't reach Gemini. Check the API key in Settings and try again.", ar: "تعذّر الاتصال بـ Gemini. تحقّق من المفتاح في الإعدادات وحاول مجدداً." },

  // Settings
  settingsSubtitle: { en: "Customize your CRM template and integrations", ar: "خصّص قالب نظامك وتكاملاته" },
  saveChanges: { en: "Save Changes", ar: "حفظ التغييرات" },
  saved: { en: "Saved", ar: "تم الحفظ" },
  companyProfile: { en: "Company Profile", ar: "ملف الشركة" },
  companyName: { en: "Company Name", ar: "اسم الشركة" },
  logoUrl: { en: "Logo URL", ar: "رابط الشعار" },
  officeAddress: { en: "Office Address", ar: "عنوان المكتب" },
  colorTheme: { en: "Color Theme (Accent)", ar: "لون النظام (التمييز)" },
  propertyManagers: { en: "Property Managers (comma separated)", ar: "مدراء العقارات (مفصولة بفاصلة)" },
  aiIntegration: { en: "AI Integration", ar: "تكامل الذكاء الاصطناعي" },
  geminiApiKey: { en: "Google Gemini API Key", ar: "مفتاح Google Gemini" },
  apiKeyHelp1: { en: "Get a free key at", ar: "احصل على مفتاح مجاني من" },
  apiKeyHelp2: { en: "— no credit card required", ar: "— بدون بطاقة ائتمان" },
  aiModel: { en: "AI Model", ar: "نموذج الذكاء" },
  enableAi: { en: "Enable AI Assistant", ar: "تفعيل المساعد الذكي" },
  enableAiHint: { en: "Show the assistant as active across the CRM.", ar: "إظهار المساعد كمُفعّل في كامل النظام." },
  resetDefaults: { en: "Reset to Defaults", ar: "إعادة التعيين الافتراضي" },
  brandPreview: { en: "Brand Preview", ar: "معاينة العلامة" },
  yourCompany: { en: "Your Company", ar: "شركتك" },
  accentButton: { en: "Accent Button", ar: "زر مميّز" },
};

interface I18nValue {
  lang: Lang;
  dir: "ltr" | "rtl";
  setLang: (l: Lang) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nValue>({
  lang: "en",
  dir: "ltr",
  setLang: () => {},
  t: (k) => k,
});

const STORAGE_KEY = "crm-lang";

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const stored = (typeof window !== "undefined" &&
      window.localStorage.getItem(STORAGE_KEY)) as Lang | null;
    if (stored === "ar" || stored === "en") setLangState(stored);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      window.localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* ignore */
    }
  }, []);

  const t = useCallback(
    (key: string) => translations[key]?.[lang] ?? key,
    [lang]
  );

  return (
    <I18nContext.Provider
      value={{ lang, dir: lang === "ar" ? "rtl" : "ltr", setLang, t }}
    >
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
