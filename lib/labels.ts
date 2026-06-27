// Map canonical (English) enum values to translation keys.
type T = (key: string) => string;

export const tType = (t: T, v: string) => t(`pt_${v}`);
export const tUnit = (t: T, v: string) => t(`ut_${v}`);

const TENANT: Record<string, string> = {
  Current: "tn_current",
  Late: "tn_late",
  "Notice Given": "tn_notice",
  Vacated: "tn_vacated",
};
export const tTenantStatus = (t: T, v: string) => t(TENANT[v] ?? v);

const VAC: Record<string, string> = {
  Listed: "vc_listed",
  Preparing: "vc_preparing",
  Available: "vc_available",
};
export const tVacancy = (t: T, v: string) => t(VAC[v] ?? v);

const TICKET: Record<string, string> = {
  Open: "mt_open",
  "In Progress": "mt_inprogress",
  Resolved: "mt_resolved",
};
export const tTicket = (t: T, v: string) => t(TICKET[v] ?? v);

const PRIORITY: Record<string, string> = {
  Low: "pr_low",
  Medium: "pr_medium",
  High: "pr_high",
  Urgent: "pr_urgent",
};
export const tPriority = (t: T, v: string) => t(PRIORITY[v] ?? v);

const PAYMENT: Record<string, string> = {
  Paid: "pay_paid",
  Late: "pay_late",
  Outstanding: "pay_outstanding",
};
export const tPayment = (t: T, v: string) => t(PAYMENT[v] ?? v);

const CHANNEL: Record<string, string> = {
  Email: "ch_email",
  Phone: "ch_phone",
  SMS: "ch_sms",
  Portal: "ch_portal",
};
export const tChannel = (t: T, v: string) => t(CHANNEL[v] ?? v);
