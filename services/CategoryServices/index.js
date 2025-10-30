import Categories from "../../models/Categories/index.js"

export const fetchMainCategories = async ()=>{

    try {
        return await Categories.find({parent:null})
    }
    catch(err){
        throw new Error("Failed to fetch categories")
    }
}

export const getMainCategoryByName = async (name)=>{
    if(!name) return

    try{
        return await Categories.findOne({name , parent: null})
    }catch(err){
        throw new Error("Failed to fetch category by name")

    }
}

export const findMainCategory = async(parent)=>{

    try {
        return await Categories.findById({parent})
    }catch(err){
        throw new Error('Failed to fetch the category')
    }
}

export const mainCategoryExists = async(parent)=>{

    if(!parent) return false
    try {
        const category = await findMainCategory(parent)
        return !!category
    }catch{
        return false;
    }

}
export const fetchSubCategories = async (mainCategoryId)=>{

    if(!mainCategoryId) throw new Error('Main category id not provided')

    try {
        return await Categories.find({parent: mainCategoryId})
    }catch(err){
        throw new Error('Failed to fetch the main categories')
    }
}

export async function addCategory({name , parent  = null , description}) {
    try {
        if(parent){
            const parentCategoryExists = mainCategoryExists(parent);
            if(!parentCategoryExists) throw new Error("Wrong parent id is provided")
        }

      const category = await Categories.create({
        name,
        description,
        parent
      });

      return category
  
    } catch (err) {

        throw new Error('Failed to add the product category')
    }
  }

