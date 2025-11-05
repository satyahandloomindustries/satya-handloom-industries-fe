import ApiService from '@/services/ApiService';
import { create } from 'zustand';

const useProductAdmin = create((set, get) => ({
    name: '',
    code:'',
    description: [],
    selectedMainCategory: null,
    selectedSubCategory: null,
    mainCategoriesDropdown: [],
    subCategoriesDropdown: [],
    subCategories: {},
    sizes:[],
    images:[],
    allCategories: {},
    categorySizes: [],
    setAllCategories: (allCategories = {} , mainCategories =[])=>{
        const mainCategoriesDropdown = mainCategories.map(({_id , name})=>({label:name , value: _id}))
        const subCategories = {}
        mainCategories.map(({ name})=> {
            const subCategoriesMorphedList = allCategories[name].map(({_id , name})=> ({label: name , value: _id }))
            subCategories[name]  = subCategoriesMorphedList;
    })
        set({allCategories , mainCategoriesDropdown , subCategories })
    },
    setSelectedMainCategory:(selectedMainCategory = null)=>{        
        set({selectedMainCategory})
    },
    setSelectedSubCategory:(selectedSubCategory = null)=>{
        set({selectedSubCategory})
    },
    customSet: (props)=>{
        set({...props})
    },
    getSubCategoriesSizes: async()=>{
        try {
            const {categorySizes = []} = await ApiService.get('api/sub-category-sizes');
            set({categorySizes})
        }
        catch(err){
        }
    }

}));

export default useProductAdmin;
