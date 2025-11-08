import ApiService from '@/services/ApiService';
import useToast from '@/store/useToast';
import axios from 'axios';
import { create } from 'zustand';

const useProductAdmin = create((set, get) => ({
  name: '',
  code: '',
  description: [],
  selectedMainCategory: null,
  selectedSubCategory: null,
  mainCategoriesDropdown: [],
  subCategoriesDropdown: [],
  subCategories: {},
  sizes: [],
  images: [],
  allCategories: {},
  categorySizes: [],
  openPreview: false,
  previewUrls: [],
  setAllCategories: (allCategories = {}, mainCategories = []) => {
    const mainCategoriesDropdown = mainCategories.map(({ _id, name }) => ({
      label: name,
      value: _id,
    }));
    const subCategories = {};
    mainCategories.map(({ name }) => {
      const subCategoriesMorphedList = allCategories[name].map(
        ({ _id, name }) => ({ label: name, value: _id })
      );
      subCategories[name] = subCategoriesMorphedList;
    });
    set({ allCategories, mainCategoriesDropdown, subCategories });
  },
  setSelectedMainCategory: (selectedMainCategory = null) => {
    set({ selectedMainCategory });
  },
  setSelectedSubCategory: (selectedSubCategory = null) => {
    set({ selectedSubCategory });
  },
  customSet: (props) => {
    set({ ...props });
  },
  getSubCategoriesSizes: async () => {
    try {
      const { categorySizes = [] } = await ApiService.get(
        'api/sub-category-sizes'
      );
      set({ categorySizes });
    } catch (err) {}
  },
  createTemporaryProduct: async (data) => {
    const { showErrorToast, showSuccessToast } = useToast.getState();
    try {
      const temporary = await ApiService.post('/api/temporary-product', data);
      showSuccessToast(temporary.message);
      return temporary;
    } catch (err) {
      showErrorToast(err.message);
    }
  },
  createProduct: async () => {
    const formData = new FormData();
    const { showErrorToast } = useToast.getState();
    const imgs = get().images;
    imgs.forEach((file) => formData.append('images', file));
    formData.append('category', get().selectedMainCategory?.label ?? null);

    try {
      const response = await axios.post(
        '/api/cloudinary-imgs-upload',
        formData,
        {
          timeout: 30000,
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        set({
          images: [],
          name: '',
          code: '',
          description: [],
          selectedMainCategory: null,
          selectedSubCategory: null,
          sizes: [],
        });
      }
    } catch (err) {
      showErrorToast(err.message);
    }
  },
}));

export default useProductAdmin;
