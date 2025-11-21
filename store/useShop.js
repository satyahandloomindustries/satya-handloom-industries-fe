import { create } from 'zustand';

const useShop = create((set) => ({
  aggregateCategories: [],
  setAggregateCategories: (categories = []) => {
    set({
      aggregateCategories: categories,
      selectedMainCategory: categories?.[0]?.name ?? null,
    });
  },
  customShopSet: (data) => {
    set(data);
  },
  selectedMainCategory: null,
}));

export default useShop;
