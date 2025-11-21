import { create } from 'zustand';

const useShop = create((set) => ({
  aggregateCategories: [],
  setAggregateCategories: (categories = []) => {

    const {name:label , _id:value} = categories?.[0];
    const data = label && value ? {label , value } : null;
    set({
      aggregateCategories: categories,
      selectedMainCategory: data,
    });
  },
  customShopSet: (data) => {
    set(data);
  },
  selectedMainCategory: null,
}));

export default useShop;
