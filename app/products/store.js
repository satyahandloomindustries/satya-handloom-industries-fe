import { create } from 'zustand';

const useShopStore = create((set) => ({
  categories: [
    {
      label: 'Fashionware',
      value: [],
      count: 10,
    },
    {
      label: 'Kitchenware',
      value: [],
      count: 8,
    },
    {
      label: 'Electronics',
      value: [],
      count: 9,
    },
    {
      label: 'Accessories',
      value: [],
      count: 5,
    },
    {
      label: 'Shoe',
      value: [],
      count: 4,
    },
    {
      label: 'Toys',
      value: [],
      count: 19,
    },
  ],
  increase: () => set((state) => ({ count: state.count + 1 })),
  decrease: () => set((state) => ({ count: state.count - 1 })),
}));

export default useShopStore;
