'use client';
import ErrorMessage from '@/app/contactUs/components/ErrorMessage';
import DescriptionText from '@/app/profile/components/DescriptionText';
import ImagePreview from '@/app/profile/components/ImagePreview';
import MultipleImageUpload from '@/app/profile/components/MultipleImageUpload';
import AddComponentInput from '@/components/AddComponentInput';
import MyDropdown from '@/components/Dropdown';
import MultiRenderer from '@/components/MultiRenderer';
import Tag from '@/components/Tag';
import useFormValidation from '@/hooks/useFormValidation';
import useProductAdmin from '@/store/useProductAdmin';
import { evd, filterClosure } from '@/utls';
import { useEffect, useRef } from 'react';
import * as Yup from 'yup';

const ProductAdmin = () => {
  const {
    name,
    code,
    description,
    subCategories,
    sizes,
    mainCategoriesDropdown,
    selectedMainCategory,
    selectedSubCategory,
    customSet,
    setSelectedSubCategory,
    subCategoriesDropdown,
    createProduct,
  } = useProductAdmin();

  const form = useRef();

  const { validation, error, noError  ,validateAt} = useFormValidation({
    name: Yup.string().required('Name is required'),
    code: Yup.string()
      .min(2, 'Max length upto 2 characters')
      .required('Code is required'),
    description: Yup.array()
      .of(Yup.string().required("Each item must be a string"))
      .min(1, "At least one item is required"),
    category: Yup.string().required('Category is required'),
    subCategory: Yup.string().required('Subcategory is required'),
    sizes: Yup.array()
      .of(Yup.string().required("Each item must be a string"))
      .min(1, "At least one item is required"),
  });

  

  const handleChange = async(event) => {
    const { name, value } = event.target;
    await validateAt(name , value)
    customSet({ [name]: value });
  };

  const handleDescription = async(value) => {
    if (value?.length && !description.includes(value))
      await validateAt("description" , [...description , value])
      customSet({
        description: [...description, value],
      });
  };

  const handleClose = (value) => {
    const filteredDescription = filterClosure(value)(description);
    customSet({ description: [...filteredDescription] });
  };

  const handleSubmit = evd(async (e) => {

    const { invalid, normalisedData } = await validation({
      name, code, description, category: selectedMainCategory?.label, subCategory: selectedSubCategory?.label,
      sizes
    })

    if (invalid) {
      console.log(error, normalisedData)
    }

  });

  return (
    <div>
      <h1 className="text-4xl mb-8">Create a new product</h1>

      <div className="flex flex-row gap-6">
        <form
          className="w-full max-w-lg"
          ref={form}
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <div className="grid grid-cols-2 gap-x-6 gap-y-2 mb-2">
            <div>
              <MyDropdown
                items={mainCategoriesDropdown}
                selected={selectedMainCategory}
                setSelected={async(mainCategory) => {

                  await validateAt("category" , mainCategory?.label)
                  customSet({
                    selectedMainCategory: mainCategory,
                    subCategoriesDropdown:
                      subCategories?.[mainCategory?.label] ?? [],
                    selectedSubCategory: null,
                  });
                }}
                placeholder="Choose product category"
              />
              <ErrorMessage message={error?.category} />
            </div>
            <div>
              <MyDropdown
                items={subCategoriesDropdown}
                selected={selectedSubCategory}
                setSelected={async(subCategory)=>{
                  await validateAt("subCategory" , subCategory?.label)
                  setSelectedSubCategory(subCategory)
                }}
                placeholder="Choose product subcategory"
              />

              <ErrorMessage message={error?.subCategory} />

            </div>

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

          <AddComponentInput
            placeholder="Add product sizes"
            onClick={async(value) => {
              if (value?.length && !sizes.includes(value)) {
                await validateAt("sizes" ,[...sizes, value] )
                customSet({ sizes: [...sizes, value] });
              }
            }}
          >
            <ErrorMessage message={error?.sizes} />
            <div className="flex flex-wrap gap-2 mb-4 pr-2">
              {sizes.map((size, index) => (
                <Tag
                  key={index}
                  label={size}
                  onClose={() => {
                    const filterSizes = filterClosure(size)(sizes);
                    customSet({ sizes: filterSizes });
                  }}
                  mainClassname="relative flex flex-row items-center justify-between pr-1"
                />
              ))}
            </div>
          </AddComponentInput>

          <div className="flex justify-between items-center">
            <MultipleImageUpload items={sizes} />
            <button
              suppressHydrationWarning
              type="submit"
              className="bg-shi_brown text-white  py-3 px-6 font-thin text-sm focus:outline-none focus:-outline ml-auto"
              disabled={!noError}
            >
              Create product
            </button>
          </div>
        </form>
        <AddComponentInput
          placeholder="Add product description"
          mainClassName="w-full"
          onClick={handleDescription}
        >
        <ErrorMessage message={error?.description} />

          <MultiRenderer
            rendererSet={description}
            Component={DescriptionText}
            onClose={handleClose}
            mainClassName="flex flex-col gap-2"
            spreadProps={false}
          />
        </AddComponentInput>
      </div>

      <ImagePreview />
    </div>
  );
};

export default ProductAdmin;
