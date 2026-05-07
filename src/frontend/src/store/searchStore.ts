import type { SearchStore } from "@/types";
import { create } from "zustand";

export const useSearchStore = create<SearchStore>((set) => ({
  query: "",
  setQuery: (query: string) => set({ query }),
  activeCategory: "all",
  setActiveCategory: (activeCategory) => set({ activeCategory }),
}));
