'use client';
import ErrorMessage from '@/app/contactUs/components/ErrorMessage';
import DescriptionText from '@/app/profile/components/DescriptionText';
import MultipleImageUpload from '@/app/profile/components/MultipleImageUpload';
import AddComponentInput from '@/components/AddComponentInput';
import MyDropdown from '@/components/Dropdown';
import MultiRenderer from '@/components/MultiRenderer';
import Tag from '@/components/Tag';
import useFormValidation from '@/hooks/useFormValidation';
import ApiService from '@/services/ApiService';
import useProductAdmin from '@/store/useProductAdmin';
import { filterClosure } from '@/utls';
import { useEffect, useRef } from 'react';
import * as Yup from 'yup';

const ProductAdmin = () => {
  const {
    name,
    code,
    description,
    subCategories,
    sizes,
    setAllCategories,
    mainCategoriesDropdown,
    selectedMainCategory,
    selectedSubCategory,
    customSet,
    setSelectedSubCategory,
    subCategoriesDropdown,
    getSubCategoriesSizes,
    createProduct,
  } = useProductAdmin();

  const form = useRef();

  const { validation, error, noError, validateAt } = useFormValidation({
    name: Yup.string().required('Name is required'),
    code: Yup.string()
      .min(5, 'Max length upto 5 characters')
      .required('Code is required'),
    description: Yup.string().required('Description is required'),
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await ApiService.get('/api/categories');
        await getSubCategoriesSizes();
        setAllCategories(response?.categories, response?.mainCategories);
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    customSet({ [name]: value });
  };

  const handleDescription = (value) => {
    if (value?.length && !description.includes(value))
      customSet({
        description: [...description, value],
      });
  };

  const handleClose = (value) => {
    const filteredDescription = filterClosure(value)(description);
    customSet({ description: [...filteredDescription] });
  };

  const handleSubmit = async (e) => {
    await createProduct(e);
  };

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
          <div className="grid grid-cols-2 gap-6">
            <MyDropdown
              items={mainCategoriesDropdown}
              selected={selectedMainCategory}
              setSelected={(mainCategory) => {
                customSet({
                  selectedMainCategory: mainCategory,
                  subCategoriesDropdown:
                    subCategories?.[mainCategory?.label] ?? [],
                  selectedSubCategory: null,
                  selectedSizes: null,
                  sizes: [],
                });
              }}
              placeholder="Choose product category"
            />

            <MyDropdown
              items={subCategoriesDropdown}
              selected={selectedSubCategory}
              setSelected={setSelectedSubCategory}
              placeholder="Choose product subcategory"
            />

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
            mainClassName="mb-6"
            onClick={(value) => {
              if (value?.length && !sizes.includes(value)) {
                customSet({ sizes: [...sizes, value] });
              }
            }}
          >
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
          <MultiRenderer
            rendererSet={description}
            Component={DescriptionText}
            onClose={handleClose}
            mainClassName="flex flex-col gap-2"
          />
        </AddComponentInput>
      </div>
    </div>
  );
};

export default ProductAdmin;
