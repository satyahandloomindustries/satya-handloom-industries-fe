"use client"
import ErrorMessage from "@/app/contactUs/components/ErrorMessage"
import MultipleImageUpload from "@/app/profile/components/MultipleImageUpload"
import MyDropdown from "@/components/Dropdown"
import useFormValidation from "@/hooks/useFormValidation"
import ApiService from "@/services/ApiService"
import useProductAdmin from "@/store/useProductAdmin"
import { useEffect, useRef } from "react"
import * as Yup from "yup"

const ProductAdmin = () => {

  const { name,
    code,
    description,
    subCategories,
    sizes,
    images,
    setAllCategories,
    mainCategoriesDropdown,
    selectedMainCategory,
    selectedSubCategory,
    customSet,
    setSelectedSubCategory,
    subCategoriesDropdown,
    getSubCategoriesSizes,
    getSizes,
    selectedSizes,
  } = useProductAdmin()

  const form = useRef();

  const { validation, error, noError, validateAt } = useFormValidation({
    name: Yup.string().required('Name is required'),
    code: Yup.string().min(5, "Max length upto 5 characters").required('Code is required'),
    description: Yup.string()
      .required('Description is required'),
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await ApiService.get('/api/categories');
        await getSubCategoriesSizes()


        setAllCategories(response?.categories, response?.mainCategories)
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;    
    customSet({[name]: value})
  };

  return <div>

    <h1 className="text-4xl mb-8">Create a new product</h1>

    <div>
      <form className="w-full max-w-lg mt-10" ref={form} onSubmit={() => { }} autoComplete='off'>
        <div className="grid grid-cols-2 gap-6">
          <MyDropdown items={mainCategoriesDropdown} selected={selectedMainCategory} setSelected={(mainCategory) => {
            customSet(
              {
                selectedMainCategory: mainCategory,
                subCategoriesDropdown: subCategories?.[mainCategory?.label] ?? [],
                selectedSubCategory: null,
                selectedSizes: null,
                sizes: []
              })

          }} placeholder="Choose product category" />

          <MyDropdown items={subCategoriesDropdown} selected={selectedSubCategory} setSelected={(subCategory) => {
            getSizes(subCategory)
            setSelectedSubCategory(subCategory)
          }} placeholder="Choose product subcategory" />

          <MyDropdown items={sizes}
            selected={selectedSizes}
            setSelected={(size) => customSet({ selectedSizes: size })}
            placeholder="Choose product size" />

            <br/>

          <div>
            <input
              type="text"
              name="name"
              value={name}
              id="name"
              placeholder="Product name*"
              className="appearance-none w-full p-3 text-sm text-gray-700 bg-gray-100 leading-tight focus:outline-none focus:-outline"
              onChange={handleChange}
              autoComplete="off"
              suppressHydrationWarning
            />
            <ErrorMessage message={error?.name} />
          </div>
          <div>
            <input
              type="text"
              id="code"
              name="code"
              value={code}
              placeholder="Product code*"
              className=" appearance-none w-full p-3 text-sm text-gray-700 bg-gray-100 leading-tight focus:outline-none focus:-outline"
              autoComplete="off"
              suppressHydrationWarning
              onChange={handleChange}

            />
            <ErrorMessage message={error?.code} />
          </div>

        </div>

        <div className="my-4">
          <textarea
            id="description"
            name="description"
            placeholder="Product description*"
            value={description}
            rows={6}
            className="appearance-none w-full p-3 text-sm text-gray-700 bg-gray-100 leading-tight focus:outline-none focus:-outline"
            onChange={handleChange}

          />
          <ErrorMessage message={error?.description} />
        </div>

        <MultipleImageUpload items={sizes} />


        <button
          suppressHydrationWarning
          type="submit"
          className="bg-shi_brown text-white  py-3 px-6 font-thin text-sm focus:outline-none focus:-outline"
          disabled={!noError}
        >
          Create product
        </button>
      </form>

    </div>

  </div>

}

export default ProductAdmin