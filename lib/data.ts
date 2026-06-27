// ---------------------------------------------------------------------------
// Prestige Properties — CRM demo dataset
// All data is fictional and authored for demonstration purposes.
// Reference "today" for relative dates is 2026-06-27.
// ---------------------------------------------------------------------------

export type PropertyType = "Residential" | "Commercial" | "Mixed";
export type UnitType =
  | "Studio"
  | "1BR"
  | "2BR"
  | "3BR"
  | "Office"
  | "Retail";
export type TenantStatus =
  | "Current"
  | "Late"
  | "Notice Given"
  | "Vacated";
export type VacancyStatus = "Listed" | "Preparing" | "Available";
export type Priority = "Low" | "Medium" | "High" | "Urgent";
export type TicketStatus = "Open" | "In Progress" | "Resolved";

export interface Unit {
  number: string;
  unitType: UnitType;
  rent: number;
  occupied: boolean;
  // Occupied units:
  tenantName?: string;
  leaseStart?: string;
  leaseEnd?: string;
  tenantStatus?: TenantStatus;
  balanceOwed?: number;
  // Vacant units:
  vacancyStatus?: VacancyStatus;
  vacantSince?: string;
  lastTenant?: string;
}

export interface Property {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  type: PropertyType;
  manager: string;
  gradient: string;
  yearBuilt: number;
  // Monthly operating expense components (USD)
  expenses: {
    maintenance: number;
    insurance: number;
    taxes: number;
  };
  units: Unit[];
}

export interface Tenant {
  id: string;
  name: string;
  unit: string;
  propertyId: string;
  propertyName: string;
  leaseStart: string;
  leaseEnd: string;
  rent: number;
  balanceOwed: number;
  status: TenantStatus;
}

export interface MaintenanceTicket {
  id: string;
  propertyId: string;
  propertyName: string;
  unit: string;
  tenant: string;
  issue: string;
  priority: Priority;
  assignedTo: string;
  status: TicketStatus;
  opened: string;
  resolved?: string;
}

export const MANAGERS = [
  "Sofia Marquez",
  "Daniel Brooks",
  "Marcus Lee",
  "Priya Nair",
] as const;

const G = {
  dusk: "linear-gradient(135deg, #2d3142 0%, #4f5d75 55%, #bfa181 100%)",
  ocean: "linear-gradient(135deg, #1b2a36 0%, #2f4858 55%, #86a8b8 100%)",
  forest: "linear-gradient(135deg, #1f2a24 0%, #3a4d42 55%, #8a9a5b 100%)",
  golden: "linear-gradient(135deg, #6b5636 0%, #a98b54 50%, #d9c08a 100%)",
  slate: "linear-gradient(135deg, #23262b 0%, #3c4148 55%, #8d949c 100%)",
  marble: "linear-gradient(135deg, #e8e4dc 0%, #cfc7ba 50%, #9a8f7d 100%)",
  blush: "linear-gradient(135deg, #6e4b4b 0%, #a87f7a 55%, #e3ccc2 100%)",
};

export const properties: Property[] = [
  {
    id: "marina-bluffs",
    name: "Marina Bluffs Residences",
    address: "1420 Harbor Drive",
    city: "San Diego",
    state: "CA",
    type: "Residential",
    manager: "Sofia Marquez",
    gradient: G.ocean,
    yearBuilt: 2016,
    expenses: { maintenance: 3200, insurance: 1850, taxes: 4100 },
    units: [
      { number: "101", unitType: "1BR", rent: 2650, occupied: true, tenantName: "Olivia Bennett", leaseStart: "2025-02-01", leaseEnd: "2026-01-31", tenantStatus: "Current", balanceOwed: 0 },
      { number: "102", unitType: "Studio", rent: 2100, occupied: true, tenantName: "Marcus Chen", leaseStart: "2024-09-15", leaseEnd: "2026-08-14", tenantStatus: "Current", balanceOwed: 0 },
      { number: "103", unitType: "2BR", rent: 3450, occupied: true, tenantName: "Priya Patel", leaseStart: "2025-06-01", leaseEnd: "2026-05-31", tenantStatus: "Notice Given", balanceOwed: 0 },
      { number: "201", unitType: "1BR", rent: 2700, occupied: true, tenantName: "James O'Connor", leaseStart: "2025-01-10", leaseEnd: "2026-07-09", tenantStatus: "Late", balanceOwed: 2700 },
      { number: "202", unitType: "2BR", rent: 3500, occupied: true, tenantName: "Hannah Kim", leaseStart: "2024-11-01", leaseEnd: "2026-10-31", tenantStatus: "Current", balanceOwed: 0 },
      { number: "203", unitType: "Studio", rent: 2050, occupied: false, vacancyStatus: "Listed", vacantSince: "2026-05-12", lastTenant: "Derek Walsh" },
      { number: "301", unitType: "2BR", rent: 3600, occupied: true, tenantName: "Aisha Rahman", leaseStart: "2025-03-01", leaseEnd: "2026-08-31", tenantStatus: "Current", balanceOwed: 0 },
      { number: "302", unitType: "1BR", rent: 2750, occupied: false, vacancyStatus: "Preparing", vacantSince: "2026-06-08", lastTenant: "Tyler Brooks" },
    ],
  },
  {
    id: "old-oak",
    name: "Old Oak Townhomes",
    address: "88 Pecan Street",
    city: "Austin",
    state: "TX",
    type: "Residential",
    manager: "Daniel Brooks",
    gradient: G.forest,
    yearBuilt: 2012,
    expenses: { maintenance: 2400, insurance: 1400, taxes: 3300 },
    units: [
      { number: "A", unitType: "3BR", rent: 3200, occupied: true, tenantName: "Robert Salinas", leaseStart: "2024-08-01", leaseEnd: "2026-07-31", tenantStatus: "Current", balanceOwed: 0 },
      { number: "B", unitType: "3BR", rent: 3150, occupied: true, tenantName: "Emily Carter", leaseStart: "2025-05-15", leaseEnd: "2026-05-14", tenantStatus: "Late", balanceOwed: 1575 },
      { number: "C", unitType: "2BR", rent: 2600, occupied: true, tenantName: "David Nguyen", leaseStart: "2025-04-01", leaseEnd: "2026-09-30", tenantStatus: "Current", balanceOwed: 0 },
      { number: "D", unitType: "2BR", rent: 2550, occupied: false, vacancyStatus: "Available", vacantSince: "2026-04-02", lastTenant: "Grace Lin" },
      { number: "E", unitType: "3BR", rent: 3250, occupied: true, tenantName: "Sandra Whitfield", leaseStart: "2024-12-01", leaseEnd: "2026-11-30", tenantStatus: "Current", balanceOwed: 0 },
      { number: "F", unitType: "2BR", rent: 2650, occupied: true, tenantName: "Kevin Park", leaseStart: "2025-07-01", leaseEnd: "2026-06-30", tenantStatus: "Current", balanceOwed: 0 },
    ],
  },
  {
    id: "cedar-cove",
    name: "Cedar Cove Apartments",
    address: "305 Willow Bend",
    city: "Portland",
    state: "OR",
    type: "Residential",
    manager: "Sofia Marquez",
    gradient: G.dusk,
    yearBuilt: 2019,
    expenses: { maintenance: 3600, insurance: 2050, taxes: 3900 },
    units: [
      { number: "1A", unitType: "1BR", rent: 2200, occupied: true, tenantName: "Natalie Brooks", leaseStart: "2025-01-01", leaseEnd: "2026-07-31", tenantStatus: "Current", balanceOwed: 0 },
      { number: "1B", unitType: "1BR", rent: 2150, occupied: true, tenantName: "Omar Haddad", leaseStart: "2024-10-01", leaseEnd: "2026-09-30", tenantStatus: "Current", balanceOwed: 0 },
      { number: "1C", unitType: "Studio", rent: 1750, occupied: true, tenantName: "Lucy Tran", leaseStart: "2025-08-01", leaseEnd: "2026-07-31", tenantStatus: "Current", balanceOwed: 0 },
      { number: "2A", unitType: "2BR", rent: 2900, occupied: true, tenantName: "Brandon Cole", leaseStart: "2025-02-15", leaseEnd: "2026-08-14", tenantStatus: "Late", balanceOwed: 2900 },
      { number: "2B", unitType: "2BR", rent: 2850, occupied: true, tenantName: "Sophia Russo", leaseStart: "2024-09-01", leaseEnd: "2026-08-31", tenantStatus: "Current", balanceOwed: 0 },
      { number: "2C", unitType: "Studio", rent: 1700, occupied: false, vacancyStatus: "Listed", vacantSince: "2026-05-28", lastTenant: "Henry Adams" },
      { number: "3A", unitType: "1BR", rent: 2250, occupied: true, tenantName: "Maria Gonzalez", leaseStart: "2025-03-01", leaseEnd: "2026-08-28", tenantStatus: "Current", balanceOwed: 0 },
      { number: "3B", unitType: "2BR", rent: 2950, occupied: true, tenantName: "Ethan Wright", leaseStart: "2024-12-15", leaseEnd: "2026-12-14", tenantStatus: "Current", balanceOwed: 0 },
      { number: "3C", unitType: "1BR", rent: 2200, occupied: false, vacancyStatus: "Preparing", vacantSince: "2026-06-15", lastTenant: "Chloe Bennett" },
      { number: "PH", unitType: "2BR", rent: 3300, occupied: true, tenantName: "Daniel Foster", leaseStart: "2025-05-01", leaseEnd: "2026-04-30", tenantStatus: "Notice Given", balanceOwed: 0 },
    ],
  },
  {
    id: "summit-ridge",
    name: "Summit Ridge Plaza",
    address: "700 Alpine Way",
    city: "Denver",
    state: "CO",
    type: "Commercial",
    manager: "Marcus Lee",
    gradient: G.slate,
    yearBuilt: 2009,
    expenses: { maintenance: 4200, insurance: 3100, taxes: 6800 },
    units: [
      { number: "Suite 100", unitType: "Retail", rent: 5800, occupied: true, tenantName: "Bloom & Vine Florists", leaseStart: "2023-06-01", leaseEnd: "2026-05-31", tenantStatus: "Notice Given", balanceOwed: 0 },
      { number: "Suite 110", unitType: "Retail", rent: 6200, occupied: true, tenantName: "Summit Coffee Roasters", leaseStart: "2024-01-01", leaseEnd: "2026-12-31", tenantStatus: "Current", balanceOwed: 0 },
      { number: "Suite 200", unitType: "Office", rent: 7400, occupied: true, tenantName: "Alpine Wealth Advisors", leaseStart: "2024-03-01", leaseEnd: "2027-02-28", tenantStatus: "Current", balanceOwed: 0 },
      { number: "Suite 210", unitType: "Office", rent: 6900, occupied: false, vacancyStatus: "Available", vacantSince: "2026-02-18", lastTenant: "Ridgeline Architects" },
      { number: "Suite 300", unitType: "Office", rent: 8100, occupied: true, tenantName: "Meridian Legal Group", leaseStart: "2025-01-15", leaseEnd: "2026-08-14", tenantStatus: "Late", balanceOwed: 8100 },
    ],
  },
  {
    id: "laurel-park",
    name: "Laurel Park Lofts",
    address: "212 Canal Street",
    city: "Chicago",
    state: "IL",
    type: "Mixed",
    manager: "Priya Nair",
    gradient: G.golden,
    yearBuilt: 2018,
    expenses: { maintenance: 3800, insurance: 2400, taxes: 5200 },
    units: [
      { number: "G1", unitType: "Retail", rent: 4500, occupied: true, tenantName: "Canal Street Bakery", leaseStart: "2024-05-01", leaseEnd: "2026-09-30", tenantStatus: "Current", balanceOwed: 0 },
      { number: "G2", unitType: "Retail", rent: 4200, occupied: false, vacancyStatus: "Listed", vacantSince: "2026-03-20", lastTenant: "Loop Cycle Studio" },
      { number: "201", unitType: "1BR", rent: 2400, occupied: true, tenantName: "Isabella Moreno", leaseStart: "2025-04-01", leaseEnd: "2026-08-31", tenantStatus: "Current", balanceOwed: 0 },
      { number: "202", unitType: "2BR", rent: 3100, occupied: true, tenantName: "Jacob Sullivan", leaseStart: "2024-11-15", leaseEnd: "2026-11-14", tenantStatus: "Current", balanceOwed: 0 },
      { number: "301", unitType: "2BR", rent: 3150, occupied: true, tenantName: "Mia Thompson", leaseStart: "2025-06-15", leaseEnd: "2026-06-14", tenantStatus: "Late", balanceOwed: 1575 },
      { number: "302", unitType: "1BR", rent: 2450, occupied: true, tenantName: "Noah Williams", leaseStart: "2025-02-01", leaseEnd: "2026-07-31", tenantStatus: "Current", balanceOwed: 0 },
      { number: "401", unitType: "2BR", rent: 3250, occupied: true, tenantName: "Ava Martinez", leaseStart: "2024-10-01", leaseEnd: "2026-09-30", tenantStatus: "Current", balanceOwed: 0 },
      { number: "402", unitType: "1BR", rent: 2500, occupied: false, vacancyStatus: "Preparing", vacantSince: "2026-06-20", lastTenant: "Liam Davis" },
    ],
  },
  {
    id: "harborview",
    name: "Harborview Suites",
    address: "55 Pike Place",
    city: "Seattle",
    state: "WA",
    type: "Residential",
    manager: "Daniel Brooks",
    gradient: G.blush,
    yearBuilt: 2021,
    expenses: { maintenance: 2900, insurance: 1900, taxes: 4400 },
    units: [
      { number: "401", unitType: "1BR", rent: 2850, occupied: true, tenantName: "Charlotte Reed", leaseStart: "2025-03-15", leaseEnd: "2026-08-14", tenantStatus: "Current", balanceOwed: 0 },
      { number: "402", unitType: "2BR", rent: 3700, occupied: true, tenantName: "Benjamin Scott", leaseStart: "2024-12-01", leaseEnd: "2026-11-30", tenantStatus: "Current", balanceOwed: 0 },
      { number: "403", unitType: "Studio", rent: 2300, occupied: true, tenantName: "Zoe Campbell", leaseStart: "2025-07-01", leaseEnd: "2026-06-30", tenantStatus: "Current", balanceOwed: 0 },
      { number: "501", unitType: "2BR", rent: 3800, occupied: true, tenantName: "Lucas Bennett", leaseStart: "2025-01-01", leaseEnd: "2026-07-31", tenantStatus: "Current", balanceOwed: 0 },
      { number: "502", unitType: "1BR", rent: 2900, occupied: false, vacancyStatus: "Available", vacantSince: "2026-05-01", lastTenant: "Ella Foster" },
      { number: "503", unitType: "2BR", rent: 3750, occupied: true, tenantName: "Amelia Ward", leaseStart: "2024-10-15", leaseEnd: "2026-10-14", tenantStatus: "Current", balanceOwed: 0 },
      { number: "PH1", unitType: "3BR", rent: 5200, occupied: true, tenantName: "Henry Mitchell", leaseStart: "2025-02-01", leaseEnd: "2026-08-31", tenantStatus: "Current", balanceOwed: 0 },
    ],
  },
  {
    id: "gold-street",
    name: "Gold Street Commercial",
    address: "401 Gold Street",
    city: "San Francisco",
    state: "CA",
    type: "Commercial",
    manager: "Marcus Lee",
    gradient: G.marble,
    yearBuilt: 2007,
    expenses: { maintenance: 3500, insurance: 2800, taxes: 7200 },
    units: [
      { number: "Floor 1", unitType: "Office", rent: 9200, occupied: true, tenantName: "Northpoint Capital", leaseStart: "2024-02-01", leaseEnd: "2027-01-31", tenantStatus: "Current", balanceOwed: 0 },
      { number: "Floor 2", unitType: "Office", rent: 8800, occupied: true, tenantName: "Vertex Design Studio", leaseStart: "2025-01-01", leaseEnd: "2026-08-31", tenantStatus: "Current", balanceOwed: 0 },
      { number: "Floor 3", unitType: "Office", rent: 9000, occupied: false, vacancyStatus: "Listed", vacantSince: "2026-01-15", lastTenant: "Helix Biotech" },
      { number: "Floor 4", unitType: "Office", rent: 9500, occupied: true, tenantName: "Quill & Co. Consulting", leaseStart: "2024-09-01", leaseEnd: "2026-08-31", tenantStatus: "Current", balanceOwed: 0 },
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
  propertyName: string;
  city: string;
  state: string;
  unit: string;
  unitType: UnitType;
  rent: number;
  vacantSince: string;
  lastTenant: string;
  vacancyStatus: VacancyStatus;
}

export const vacancies: VacantUnit[] = properties.flatMap((p) =>
  p.units
    .filter((u) => !u.occupied)
    .map((u) => ({
      propertyId: p.id,
      propertyName: p.name,
      city: p.city,
      state: p.state,
      unit: u.number,
      unitType: u.unitType,
      rent: u.rent,
      vacantSince: u.vacantSince!,
      lastTenant: u.lastTenant ?? "—",
      vacancyStatus: u.vacancyStatus ?? "Available",
    }))
);

// --- Maintenance ----------------------------------------------------------

export const maintenance: MaintenanceTicket[] = [
  { id: "MT-2041", propertyId: "marina-bluffs", propertyName: "Marina Bluffs Residences", unit: "201", tenant: "James O'Connor", issue: "Kitchen faucet leaking under sink", priority: "Medium", assignedTo: "Reliable Plumbing Co.", status: "In Progress", opened: "2026-06-18" },
  { id: "MT-2042", propertyId: "cedar-cove", propertyName: "Cedar Cove Apartments", unit: "2A", tenant: "Brandon Cole", issue: "No hot water in primary bathroom", priority: "Urgent", assignedTo: "Pacific HVAC", status: "Open", opened: "2026-06-25" },
  { id: "MT-2043", propertyId: "summit-ridge", propertyName: "Summit Ridge Plaza", unit: "Suite 300", tenant: "Meridian Legal Group", issue: "HVAC not cooling on the 3rd floor", priority: "High", assignedTo: "Pacific HVAC", status: "Open", opened: "2026-06-23" },
  { id: "MT-2044", propertyId: "laurel-park", propertyName: "Laurel Park Lofts", unit: "G1", tenant: "Canal Street Bakery", issue: "Walk-in cooler tripping the breaker", priority: "Urgent", assignedTo: "Loop Electric", status: "In Progress", opened: "2026-06-20" },
  { id: "MT-2045", propertyId: "harborview", propertyName: "Harborview Suites", unit: "402", tenant: "Benjamin Scott", issue: "Dishwasher not draining", priority: "Low", assignedTo: "In-house Maintenance", status: "Open", opened: "2026-06-24" },
  { id: "MT-2046", propertyId: "old-oak", propertyName: "Old Oak Townhomes", unit: "B", tenant: "Emily Carter", issue: "Garage door opener malfunction", priority: "Medium", assignedTo: "In-house Maintenance", status: "Open", opened: "2026-06-19" },
  { id: "MT-2047", propertyId: "marina-bluffs", propertyName: "Marina Bluffs Residences", unit: "302", tenant: "—", issue: "Repaint and re-carpet for turnover", priority: "Medium", assignedTo: "Coastline Renovations", status: "In Progress", opened: "2026-06-09" },
  { id: "MT-2048", propertyId: "gold-street", propertyName: "Gold Street Commercial", unit: "Floor 2", tenant: "Vertex Design Studio", issue: "Elevator inspection overdue", priority: "High", assignedTo: "Otis Service", status: "Open", opened: "2026-06-22" },
  { id: "MT-2031", propertyId: "cedar-cove", propertyName: "Cedar Cove Apartments", unit: "1B", tenant: "Omar Haddad", issue: "Replace smoke detector batteries", priority: "Low", assignedTo: "In-house Maintenance", status: "Resolved", opened: "2026-05-30", resolved: "2026-06-02" },
  { id: "MT-2032", propertyId: "harborview", propertyName: "Harborview Suites", unit: "PH1", tenant: "Henry Mitchell", issue: "Balcony door seal replacement", priority: "Medium", assignedTo: "Coastline Renovations", status: "Resolved", opened: "2026-05-21", resolved: "2026-06-04" },
  { id: "MT-2033", propertyId: "laurel-park", propertyName: "Laurel Park Lofts", unit: "301", tenant: "Mia Thompson", issue: "Bedroom window won't latch", priority: "Low", assignedTo: "In-house Maintenance", status: "Resolved", opened: "2026-05-18", resolved: "2026-05-22" },
  { id: "MT-2034", propertyId: "summit-ridge", propertyName: "Summit Ridge Plaza", unit: "Suite 110", tenant: "Summit Coffee Roasters", issue: "Front signage light flickering", priority: "Low", assignedTo: "Loop Electric", status: "Resolved", opened: "2026-05-11", resolved: "2026-05-15" },
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
  monthlyRevenue: number; // collected (occupied rents)
  grossPotentialRent: number; // all units at asking
  vacancyLoss: number;
}

export function propertyStats(p: Property): PropertyStats {
  const unitsTotal = p.units.length;
  const occupied = p.units.filter((u) => u.occupied);
  const unitsOccupied = occupied.length;
  const unitsVacant = unitsTotal - unitsOccupied;
  const monthlyRevenue = occupied.reduce((s, u) => s + u.rent, 0);
  const grossPotentialRent = p.units.reduce((s, u) => s + u.rent, 0);
  const vacancyLoss = grossPotentialRent - monthlyRevenue;
  return {
    unitsTotal,
    unitsOccupied,
    unitsVacant,
    occupancyRate: unitsTotal ? (unitsOccupied / unitsTotal) * 100 : 0,
    monthlyRevenue,
    grossPotentialRent,
    vacancyLoss,
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

export function propertyFinancials(
  p: Property,
  months = 1
): PropertyFinancials {
  const stats = propertyStats(p);
  const grossRent = stats.grossPotentialRent * months;
  const vacancyLoss = stats.vacancyLoss * months;
  const collected = stats.monthlyRevenue * months;
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
  const vacantUnits = totalUnits - occupiedUnits;
  const monthlyRevenue = stats.reduce((s, x) => s + x.monthlyRevenue, 0);
  const outstandingRent = tenants.reduce((s, t) => s + t.balanceOwed, 0);
  const openMaintenance = maintenance.filter(
    (m) => m.status !== "Resolved"
  ).length;
  return {
    totalProperties: properties.length,
    totalUnits,
    occupiedUnits,
    vacantUnits,
    occupancyRate: totalUnits ? (occupiedUnits / totalUnits) * 100 : 0,
    monthlyRevenue,
    outstandingRent,
    openMaintenance,
  };
}

// --- Charts data ----------------------------------------------------------

export const MONTH_LABELS = [
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
];

// Trailing 12 months of collected revenue (authored to trend up toward current).
export const revenueByMonth: number[] = [
  178400, 181200, 183900, 182600, 186100, 188700,
  190300, 192800, 191500, 194600, 197200, 199850,
];

// Trailing 12 months of occupancy rate (%).
export const occupancyTrend: number[] = [
  88.5, 89.1, 90.2, 89.6, 91.0, 91.8, 90.4, 92.1, 91.3, 92.7, 84.9, 84.9,
];

export interface RevenueSlice {
  propertyId: string;
  name: string;
  value: number;
  color: string;
}

const PIE_COLORS = [
  "hsl(38 42% 58%)",
  "hsl(36 38% 46%)",
  "hsl(200 25% 38%)",
  "hsl(150 18% 32%)",
  "hsl(40 30% 70%)",
  "hsl(210 14% 40%)",
  "hsl(28 35% 52%)",
];

export const revenueByProperty: RevenueSlice[] = properties.map((p, i) => ({
  propertyId: p.id,
  name: p.name,
  value: propertyStats(p).monthlyRevenue,
  color: PIE_COLORS[i % PIE_COLORS.length],
}));

// --- Tenant profile synthesis (deterministic) ----------------------------

export interface Payment {
  month: string;
  amount: number;
  status: "Paid" | "Late" | "Outstanding";
  date: string;
}

const PAY_MONTHS = [
  { label: "January 2026", date: "2026-01-01" },
  { label: "February 2026", date: "2026-02-01" },
  { label: "March 2026", date: "2026-03-01" },
  { label: "April 2026", date: "2026-04-01" },
  { label: "May 2026", date: "2026-05-01" },
  { label: "June 2026", date: "2026-06-01" },
];

export function tenantPayments(t: Tenant): Payment[] {
  return PAY_MONTHS.map((m, i) => {
    const isCurrentMonth = i === PAY_MONTHS.length - 1;
    if (t.status === "Late" && isCurrentMonth) {
      return {
        month: m.label,
        amount: t.rent,
        status: "Outstanding",
        date: m.date,
      };
    }
    // Late tenants paid slightly late in one prior month for realism.
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
  summary: string;
}

export function tenantCommLog(t: Tenant): CommLog[] {
  const base: CommLog[] = [
    {
      date: "2026-06-01",
      channel: "Portal",
      summary: "Automated rent invoice delivered for June.",
    },
    {
      date: "2026-04-14",
      channel: "Email",
      summary: "Confirmed annual HVAC filter replacement schedule.",
    },
  ];
  if (t.status === "Late") {
    base.unshift({
      date: "2026-06-21",
      channel: "Phone",
      summary: "Discussed past-due balance; tenant committed to pay by month end.",
    });
  }
  if (t.status === "Notice Given") {
    base.unshift({
      date: "2026-06-05",
      channel: "Email",
      summary: "Received 30-day notice to vacate; turnover scheduling started.",
    });
  }
  return base;
}

export function tenantDocs(t: Tenant): { name: string; date: string }[] {
  return [
    { name: "Signed Lease Agreement.pdf", date: t.leaseStart },
    { name: "Move-in Inspection Report.pdf", date: t.leaseStart },
    { name: "Security Deposit Receipt.pdf", date: t.leaseStart },
    { name: "Renters Insurance Certificate.pdf", date: t.leaseStart },
  ];
}
