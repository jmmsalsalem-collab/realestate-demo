export type PropertyType = "House" | "Condo" | "Townhouse" | "Penthouse";

export interface Listing {
  id: string;
  address: string;
  city: string;
  neighborhood: string;
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  type: PropertyType;
  yearBuilt: number;
  gradient: string;
  featured: boolean;
  blurb: string;
}

// Curated gradient placeholders evoking light, architecture, and landscape.
const GRADIENTS = {
  dusk: "linear-gradient(135deg, #2d3142 0%, #4f5d75 55%, #bfa181 100%)",
  sand: "linear-gradient(135deg, #cbb89d 0%, #e6dcc8 60%, #f4efe6 100%)",
  forest: "linear-gradient(135deg, #1f2a24 0%, #3a4d42 55%, #8a9a5b 100%)",
  marble: "linear-gradient(135deg, #e8e4dc 0%, #cfc7ba 50%, #9a8f7d 100%)",
  ocean: "linear-gradient(135deg, #1b2a36 0%, #2f4858 55%, #86a8b8 100%)",
  golden: "linear-gradient(135deg, #6b5636 0%, #a98b54 50%, #d9c08a 100%)",
  slate: "linear-gradient(135deg, #23262b 0%, #3c4148 55%, #8d949c 100%)",
  blush: "linear-gradient(135deg, #6e4b4b 0%, #a87f7a 55%, #e3ccc2 100%)",
} as const;

export const NEIGHBORHOODS = [
  "Hillcrest Estates",
  "Marina Bluffs",
  "Old Oak Village",
  "Summit Ridge",
  "Laurel Park",
  "Cedar Cove",
] as const;

export const PROPERTY_TYPES: PropertyType[] = [
  "House",
  "Condo",
  "Townhouse",
  "Penthouse",
];

export const listings: Listing[] = [
  {
    id: "PR-1042",
    address: "418 Vista Grande Court",
    city: "Hillcrest Estates",
    neighborhood: "Hillcrest Estates",
    price: 2100000,
    beds: 3,
    baths: 3.5,
    sqft: 3480,
    type: "House",
    yearBuilt: 2019,
    gradient: GRADIENTS.dusk,
    featured: true,
    blurb:
      "A modern hillside retreat with floor-to-ceiling glass, an infinity-edge pool, and panoramic valley views.",
  },
  {
    id: "PR-1043",
    address: "12 Harborview Penthouse 21B",
    city: "Marina Bluffs",
    neighborhood: "Marina Bluffs",
    price: 1875000,
    beds: 3,
    baths: 3,
    sqft: 2640,
    type: "Penthouse",
    yearBuilt: 2021,
    gradient: GRADIENTS.ocean,
    featured: true,
    blurb:
      "Corner penthouse with wraparound terrace, private elevator, and unobstructed marina sunsets.",
  },
  {
    id: "PR-1044",
    address: "77 Old Oak Lane",
    city: "Old Oak Village",
    neighborhood: "Old Oak Village",
    price: 985000,
    beds: 3,
    baths: 2,
    sqft: 2150,
    type: "House",
    yearBuilt: 1998,
    gradient: GRADIENTS.forest,
    featured: true,
    blurb:
      "Craftsman charmer on a tree-lined street with a chef's kitchen and a deep, private backyard.",
  },
  {
    id: "PR-1045",
    address: "305 Summit Ridge Drive",
    city: "Summit Ridge",
    neighborhood: "Summit Ridge",
    price: 1450000,
    beds: 2,
    baths: 2.5,
    sqft: 2380,
    type: "Townhouse",
    yearBuilt: 2017,
    gradient: GRADIENTS.marble,
    featured: true,
    blurb:
      "Architect-designed townhome with double-height ceilings, smart-home wiring, and a rooftop lounge.",
  },
  {
    id: "PR-1046",
    address: "9 Laurel Park Mews",
    city: "Laurel Park",
    neighborhood: "Laurel Park",
    price: 720000,
    beds: 2,
    baths: 2,
    sqft: 1490,
    type: "Condo",
    yearBuilt: 2015,
    gradient: GRADIENTS.sand,
    featured: true,
    blurb:
      "Light-filled corner condo steps from the park, with a sleek galley kitchen and spa-style baths.",
  },
  {
    id: "PR-1047",
    address: "631 Cedar Cove Way",
    city: "Cedar Cove",
    neighborhood: "Cedar Cove",
    price: 1290000,
    beds: 3,
    baths: 2.5,
    sqft: 2720,
    type: "House",
    yearBuilt: 2008,
    gradient: GRADIENTS.golden,
    featured: true,
    blurb:
      "Coastal contemporary with an open great room, oversized windows, and a landscaped entertainer's yard.",
  },
  {
    id: "PR-1048",
    address: "240 Marina Bluffs Boulevard 8C",
    city: "Marina Bluffs",
    neighborhood: "Marina Bluffs",
    price: 615000,
    beds: 2,
    baths: 2,
    sqft: 1320,
    type: "Condo",
    yearBuilt: 2013,
    gradient: GRADIENTS.slate,
    featured: false,
    blurb:
      "Turnkey waterfront condo with concierge service, fitness center, and a sunny west-facing balcony.",
  },
  {
    id: "PR-1049",
    address: "58 Hillcrest Terrace",
    city: "Hillcrest Estates",
    neighborhood: "Hillcrest Estates",
    price: 1650000,
    beds: 3,
    baths: 3,
    sqft: 3010,
    type: "House",
    yearBuilt: 2012,
    gradient: GRADIENTS.blush,
    featured: false,
    blurb:
      "Elegant transitional home with a primary suite wing, formal dining, and a saltwater pool.",
  },
  {
    id: "PR-1050",
    address: "14 Summit Ridge Court",
    city: "Summit Ridge",
    neighborhood: "Summit Ridge",
    price: 875000,
    beds: 3,
    baths: 2,
    sqft: 1980,
    type: "Townhouse",
    yearBuilt: 2010,
    gradient: GRADIENTS.marble,
    featured: false,
    blurb:
      "Move-in-ready townhome with an attached two-car garage and a sun-drenched open-plan main level.",
  },
  {
    id: "PR-1051",
    address: "802 Old Oak Village Road",
    city: "Old Oak Village",
    neighborhood: "Old Oak Village",
    price: 460000,
    beds: 2,
    baths: 1,
    sqft: 1120,
    type: "Condo",
    yearBuilt: 2006,
    gradient: GRADIENTS.sand,
    featured: false,
    blurb:
      "Smart starter condo with updated finishes, in-unit laundry, and a quiet courtyard outlook.",
  },
  {
    id: "PR-1052",
    address: "19 Laurel Park Crescent",
    city: "Laurel Park",
    neighborhood: "Laurel Park",
    price: 1120000,
    beds: 3,
    baths: 2.5,
    sqft: 2410,
    type: "House",
    yearBuilt: 2004,
    gradient: GRADIENTS.forest,
    featured: false,
    blurb:
      "Classic two-story with a renovated kitchen, mature gardens, and a flexible main-floor office.",
  },
  {
    id: "PR-1053",
    address: "1100 Cedar Cove Penthouse PH3",
    city: "Cedar Cove",
    neighborhood: "Cedar Cove",
    price: 1990000,
    beds: 3,
    baths: 3.5,
    sqft: 3120,
    type: "Penthouse",
    yearBuilt: 2022,
    gradient: GRADIENTS.dusk,
    featured: false,
    blurb:
      "Sky-high penthouse with chef's appliances, a private terrace garden, and protected ridgeline views.",
  },
];

export const featuredListings = listings.filter((l) => l.featured).slice(0, 6);

export function getPriceRange(): [number, number] {
  const prices = listings.map((l) => l.price);
  return [Math.min(...prices), Math.max(...prices)];
}
