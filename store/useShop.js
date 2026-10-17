import { create } from 'zustand';

const useShop = create((set) => ({
  aggregateCategories: [],
  setAggregateCategories: (categories = []) => {
    const first = categories?.[0];
    const data =
      first?.name && first?._id
        ? { label: first.name, value: first._id }
        : null;
    set((state) => ({
      aggregateCategories: categories,
      selectedMainCategory: state.selectedMainCategory ?? data,
    }));
  },
  customShopSet: (data) => {
    set(data);
  },
  selectedMainCategory: null,
  selectedSubCategory: null,
  page: 1,
  products: [],
  selectedProduct: null,
  categoriesLoading: true,
  catalogLoading: true,
  loadedCatalogKey: null,
}));

export default useShop;
