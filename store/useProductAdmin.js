import { create } from 'zustand';

const useProductAdmin = create((set, get) => ({
    name: '',
    code:'',
    description: '',
    selectedMainCategory: null,
    selectedSubCategory: null,
    mainCategoriesDropdown: [],
    subCategories: [],
    sizes:[],
    images:[],
    allCategories: {},
    setAllCategories: (allCategories = {} , mainCategories =[])=>{
        const mainCategoriesDropdown = mainCategories.map(({_id , name})=>({label:name , value: _id}))
        set({allCategories , mainCategoriesDropdown })
    },
    setSubCategoryDropdown : (subCategories = [])=>{
        const subCategoryDropdown = subCategories.map(({_id , name})=> ({label: name , value: _id }))
        set({subCategoryDropdown})
    }

}));

export default useProductAdmin;
