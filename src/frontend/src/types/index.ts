export type ProductCategory = "water" | "septic" | "agricultural";

export interface Product {
  id: string;
  name: string;
  capacity: number; // in liters
  price: number; // in Ksh
  marketValue: number; // price * 1.25
  savingsPercent: number;
  category: ProductCategory;
  image: string;
  description: string;
  features: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
}

export interface SearchStore {
  query: string;
  setQuery: (query: string) => void;
  activeCategory: ProductCategory | "all";
  setActiveCategory: (category: ProductCategory | "all") => void;
}
