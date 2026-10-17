import { create } from 'zustand';

const useShop = create((set) => ({
  aggregateCategories: [],
  setAggregateCategories: (categories = []) => {
    const withItems = categories.filter((category) => category.count > 0);
    const first = withItems[0];
    const data =
      first?.name && first?._id
        ? { label: first.name, value: first._id }
        : null;
    set((state) => {
      const stillVisible = withItems.some(
        (category) =>
          String(category._id) === String(state.selectedMainCategory?.value)
      );
      return {
        aggregateCategories: withItems,
        selectedMainCategory: stillVisible ? state.selectedMainCategory : data,
      };
    });
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
