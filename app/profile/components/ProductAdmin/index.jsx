"use client"
import MultipleImageUpload from "@/app/profile/components/MultipleImageUpload"
import MyDropdown, { DropdownLabelWrapper } from "@/components/Dropdown"
import ApiService from "@/services/ApiService"
import useProductAdmin from "@/store/useProductAdmin"
import { useEffect } from "react"

/*
    M Category
    S category

    Name
    Code
    description
    images
    sizes -> []


*/
const ProductAdmin = ()=>{

    const {name,
        code,
        description,
        mainCategories,
        subCategories,
        sizes,
        images , setAllCategories , mainCategoriesDropdown} = useProductAdmin()

        useEffect(() => {
            const fetchCategories = async () => {
              try {
                const response = await ApiService.get('/api/categories');
                
                setAllCategories(response?.categories , response?.mainCategories)
              } catch (err) {
                console.error("Error fetching categories:", err);
              }
            };
          
            fetchCategories();
          }, []);
          

    return <div>

        <DropdownLabelWrapper>
            <MyDropdown items={mainCategoriesDropdown}/>
        </DropdownLabelWrapper>

        <MultipleImageUpload/>
    </div>
    
}

export default ProductAdmin