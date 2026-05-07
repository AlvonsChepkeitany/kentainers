import type { Product } from "@/types";

const fmt = (price: number): number => price;

function mkProduct(
  id: string,
  name: string,
  capacity: number,
  price: number,
  category: Product["category"],
  image: string,
  description: string,
  features: string[],
): Product {
  const marketValue = Math.round(price * 1.25);
  const savingsPercent = Math.round(
    ((marketValue - price) / marketValue) * 100,
  );
  return {
    id,
    name,
    capacity,
    price: fmt(price),
    marketValue,
    savingsPercent,
    category,
    image,
    description,
    features,
  };
}

export const PRODUCTS: Product[] = [
  mkProduct(
    "wt-1000",
    "1,000L Vertical Water Tank",
    1000,
    4500,
    "water",
    "/assets/generated/water-tank-vertical.dim_600x600.png",
    "Ideal for household and small business water storage.",
    [
      "UV-stabilized HDPE",
      "Food-grade plastic",
      "Bottom outlet",
      "2-year warranty",
    ],
  ),

  mkProduct(
    "wt-2000",
    "2,000L Vertical Water Tank",
    2000,
    10500,
    "water",
    "/assets/generated/water-tank-vertical.dim_600x600.png",
    "Perfect for medium households and small commercial use.",
    [
      "UV-stabilized HDPE",
      "Food-grade plastic",
      "Side & bottom outlets",
      "2-year warranty",
    ],
  ),

  mkProduct(
    "wt-3000",
    "3,000L Vertical Water Tank",
    3000,
    12500,
    "water",
    "/assets/generated/water-tank-vertical.dim_600x600.png",
    "Robust storage for larger homes and commercial sites.",
    [
      "UV-stabilized HDPE",
      "Food-grade plastic",
      "Multiple outlets",
      "3-year warranty",
    ],
  ),

  mkProduct(
    "wt-4000",
    "4,000L Vertical Water Tank",
    4000,
    14500,
    "water",
    "/assets/generated/water-tank-vertical.dim_600x600.png",
    "High-capacity solution for commercial and farm use.",
    [
      "Heavy-duty HDPE",
      "Food-grade plastic",
      "Multiple outlets",
      "3-year warranty",
    ],
  ),

  mkProduct(
    "wt-5000",
    "5,000L Vertical Water Tank",
    5000,
    16500,
    "water",
    "/assets/generated/water-tank-vertical.dim_600x600.png",
    "Large residential and light industrial water storage.",
    [
      "Heavy-duty HDPE",
      "Reinforced walls",
      "Multiple outlets",
      "3-year warranty",
    ],
  ),

  mkProduct(
    "wt-6000",
    "6,000L Vertical Water Tank",
    6000,
    19500,
    "water",
    "/assets/generated/water-tank-vertical.dim_600x600.png",
    "Commercial-grade tank for continuous water supply.",
    ["Industrial HDPE", "Reinforced ribs", "Vented lid", "5-year warranty"],
  ),

  mkProduct(
    "wt-8000",
    "8,000L Vertical Water Tank",
    8000,
    24500,
    "water",
    "/assets/generated/water-tank-vertical.dim_600x600.png",
    "Industrial-scale water storage for factories and estates.",
    [
      "Industrial HDPE",
      "Triple-wall construction",
      "Ball valve",
      "5-year warranty",
    ],
  ),

  mkProduct(
    "wt-10000",
    "10,000L Vertical Water Tank",
    10000,
    32500,
    "water",
    "/assets/generated/water-tank-vertical.dim_600x600.png",
    "Maximum residential and commercial capacity.",
    [
      "Industrial HDPE",
      "Reinforced base",
      "Overflow fitting",
      "5-year warranty",
    ],
  ),

  mkProduct(
    "sp-2000",
    "2,000L Underground Septic Tank",
    2000,
    10500,
    "septic",
    "/assets/generated/septic-tank.dim_600x600.png",
    "Compact septic solution for residential properties.",
    [
      "Heavy concrete-grade walls",
      "Sealed access hatches",
      "Inlet & outlet pipes",
      "5-year warranty",
    ],
  ),

  mkProduct(
    "sp-5000",
    "5,000L Underground Septic Tank",
    5000,
    16500,
    "septic",
    "/assets/generated/septic-tank.dim_600x600.png",
    "Mid-range capacity for larger homes and light commercial.",
    [
      "Heavy concrete-grade walls",
      "Dual access hatches",
      "Inlet & outlet pipes",
      "5-year warranty",
    ],
  ),

  mkProduct(
    "sp-10000",
    "10,000L Underground Septic Tank",
    10000,
    32500,
    "septic",
    "/assets/generated/septic-tank.dim_600x600.png",
    "Commercial sewage and waste management system.",
    [
      "Reinforced walls",
      "Multiple access points",
      "Ventilation pipe",
      "5-year warranty",
    ],
  ),

  mkProduct(
    "ag-16000",
    "16,000L Silage Storage Container",
    16000,
    88500,
    "agricultural",
    "/assets/generated/silage-container.dim_600x600.png",
    "Heavy-duty silage bunker for large farm operations.",
    [
      "Airtight construction",
      "Fermentation-resistant",
      "Forklift access slots",
      "3-year warranty",
    ],
  ),

  mkProduct(
    "ag-20000",
    "20,000L Silage Bunker Silo",
    20000,
    137500,
    "agricultural",
    "/assets/generated/silage-container.dim_600x600.png",
    "Industrial silage and bulk liquid storage solution.",
    [
      "Heavy-duty HDPE",
      "UV-resistant coating",
      "Load-bearing lid",
      "5-year warranty",
    ],
  ),

  mkProduct(
    "ag-24000",
    "24,000L Agricultural Storage Silo",
    24000,
    162500,
    "agricultural",
    "/assets/generated/silage-container.dim_600x600.png",
    "Maximum capacity agricultural storage for industrial farms.",
    [
      "Industrial-grade HDPE",
      "Reinforced structure",
      "Multiple access points",
      "5-year warranty",
    ],
  ),
];

export function formatPrice(price: number): string {
  return `Ksh ${price.toLocaleString("en-KE")}`;
}

export function filterProducts(
  products: Product[],
  query: string,
  category: Product["category"] | "all",
): Product[] {
  let result = products;
  if (category !== "all") {
    result = result.filter((p) => p.category === category);
  }
  if (query.trim()) {
    const q = query.toLowerCase().trim();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.capacity.toString().includes(q) ||
        p.description.toLowerCase().includes(q),
    );
  }
  return result;
}
