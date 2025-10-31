import Categories from "@/models/Categories"

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
export const fetchSubCategories = async (mainCategoryId , fields = '')=>{

    if(!mainCategoryId) throw new Error('Main category id not provided')

    try {
        return await Categories.find({parent: mainCategoryId} , fields)
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


async function* categoryGenerator(mainCategories , categories = {}) {
    for (const { _id, name } of mainCategories) {
      const subCategories = (await fetchSubCategories(_id, "name")) ?? ["No varieties"];
      categories[name] = subCategories?.length ? subCategories : ['No varieties'] 
      yield categories;
    }
  }

export const getCategories = async()=>{
    try {

        const mainCategories = await fetchMainCategories();        
        const categories = {};
        for await (const _ of categoryGenerator(mainCategories, categories)) {}

        return {categories  , mainCategories};
    } 
    catch(err){
        throw new Error('Failed to fetch the categories')
    }

}