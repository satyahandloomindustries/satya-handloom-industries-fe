'use client';
import ErrorMessage from '@/app/contactUs/components/ErrorMessage';
import DescriptionText from '@/app/profile/components/DescriptionText';
import ImagePreview from '@/app/profile/components/ImagePreview';
import MultipleImageUpload from '@/app/profile/components/MultipleImageUpload';
import AddComponentInput from '@/components/AddComponentInput';
import MyDropdown from '@/components/Dropdown';
import Loader from '@/components/Loader';
import MultiRenderer from '@/components/MultiRenderer';
import Tag from '@/components/Tag';
import useFormValidation from '@/hooks/useFormValidation';
import ApiService from '@/services/ApiService';
import useLoading from '@/store/useLoading';
import useProductAdmin from '@/store/useProductAdmin';
import useToast from '@/store/useToast';
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
    createTemporaryProduct,
    uploadImagesToCloudinary,
    productPrototype,
    productImages,
    images,
    createFinalProduct
  } = useProductAdmin();
  const { loading, setLoading } = useLoading();
  const { showErrorToast } = useToast();

  const form = useRef();

  const { validation, error, noError, validateAt } = useFormValidation({
    name: Yup.string().required('Name is required'),
    code: Yup.string()
      .min(2, 'Max length upto 2 characters')
      .required('Code is required'),
    description: Yup.array()
      .of(Yup.string().required('Each item must be a string'))
      .min(1, 'At least one item is required'),
    category: Yup.string().required('Category is required'),
    subCategory: Yup.string().required('Subcategory is required'),
    sizes: Yup.array()
      .of(Yup.string().required('Each item must be a string'))
      .min(1, 'At least one item is required'),
  });

  useEffect(() => {
    const fetchTemporaryProduct = async () => {
      try {
        const {
          code,
          description,
          name,
          sizes,
          category,
          subCategory,
          categoryId,
          subCategoryId,
          ...rest
        } = await ApiService.get('api/temporary-product');

        customSet({
          code,
          description,
          name,
          sizes,
          selectedMainCategory: { label: category, value: categoryId },
          selectedSubCategory: { label: subCategory, value: subCategoryId },
          productPrototype: true,
        });
      } catch (err) {
        err.status != 404
          ? showErrorToast(err?.response?.message ?? err.message)
          : null;
      }
    };

    const fetchTemporaryImages = async () => {
      try {
        const { images = [] } = await ApiService.get('api/temporary-images');
        customSet({ images, productImages: !!images?.length });
      } catch (err) {}
    };

    fetchTemporaryProduct();
    fetchTemporaryImages();
  }, []);

  useEffect(() => {
    customSet({
      subCategoriesDropdown: subCategories?.[selectedMainCategory?.label] ?? [],
    });
  }, [subCategories]);

  const handleChange = async (event) => {
    const { name, value } = event.target;
    await validateAt(name, value);
    customSet({ [name]: value });
  };

  const handleDescription = async (value) => {
    if (value?.length && !description.includes(value))
      await validateAt('description', [...description, value]);
    customSet({
      description: [...description, value],
    });
  };

  const handleClose = (value) => {
    if (productPrototype) return;
    const filteredDescription = filterClosure(value)(description);
    customSet({ description: [...filteredDescription] });
  };

  const handleSubmit = async () => {
    const { invalid } = await validation({
      name,
      code,
      description,
      category: selectedMainCategory?.label,
      subCategory: selectedSubCategory?.label,
      sizes,
    });

    if (!invalid && !loading) {
      setLoading(true);
      await createTemporaryProduct();
      setLoading(false);
    }
  };

  const handleUploadImages = async () => {
    setLoading(true);
    await uploadImagesToCloudinary();
    setLoading(false);
  };

  const handleCreateProduct  = async ()=>{
    setLoading(true);
    await createFinalProduct();
    setLoading(false);
  }

  const { buttonLabel, disabled, btnClick } = (() => {
    const hasPrototype = Boolean(productPrototype);
    const hasImages = productImages;

    const isBothReady = hasPrototype && hasImages;

    if (isBothReady) {
      return {
        buttonLabel: 'Create Product',
        disabled: loading,
        btnClick: handleCreateProduct,
      };
    }

    if (hasPrototype) {
      return {
        buttonLabel: 'Upload Images',
        disabled: loading || !images?.length,
        btnClick: handleUploadImages,
      };
    }

    return {
      buttonLabel: 'Create Prototype',
      disabled: loading || !noError,
      btnClick: handleSubmit,
    };
  })();

  return (
    <div>
      <h1 className="text-4xl mb-8">Create a new product</h1>

      <div className="flex flex-row gap-6">
        <form className="w-full max-w-lg" ref={form} autoComplete="off">
          <div className="grid grid-cols-2 gap-x-6 gap-y-2 mb-2">
            <div>
              <MyDropdown
                items={mainCategoriesDropdown}
                selected={selectedMainCategory}
                setSelected={async (mainCategory) => {
                  await validateAt('category', mainCategory?.label);
                  customSet({
                    selectedMainCategory: mainCategory,
                    subCategoriesDropdown:
                      subCategories?.[mainCategory?.label] ?? [],
                    selectedSubCategory: null,
                  });
                }}
                placeholder="Choose product category"
                dropdownDisabled={productPrototype}
              />
              <ErrorMessage message={error?.category} />
            </div>
            <div>
              <MyDropdown
                items={subCategoriesDropdown}
                selected={selectedSubCategory}
                setSelected={async (subCategory) => {
                  await validateAt('subCategory', subCategory?.label);
                  setSelectedSubCategory(subCategory);
                }}
                placeholder="Choose product subcategory"
                dropdownDisabled={productPrototype}
              />

              <ErrorMessage message={error?.subCategory} />
            </div>

            <div>
              <input
                type="text"
                name="name"
                value={name ?? ''}
                id="name"
                placeholder="Product name*"
                className="appearance-none w-full p-3 text-sm text-gray-700 bg-gray-100 leading-tight focus:outline-none focus:-outline"
                onChange={handleChange}
                autoComplete="off"
                suppressHydrationWarning
                disabled={productPrototype}
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
                disabled={productPrototype}
              />
              <ErrorMessage message={error?.code} />
            </div>
          </div>

          <AddComponentInput
            placeholder="Add product sizes"
            onClick={async (value) => {
              if (value?.length && !sizes.includes(value)) {
                await validateAt('sizes', [...sizes, value]);
                customSet({ sizes: [...sizes, value] });
              }
            }}
            disabled={productPrototype}
          >
            <ErrorMessage message={error?.sizes} />
            <div className="flex flex-wrap gap-2 mb-4 pr-2">
              {sizes?.map((size, index) => (
                <Tag
                  key={index}
                  label={size}
                  onClose={() => {
                    if (productPrototype) return;
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
              type="button"
              onClick={btnClick}
              className="bg-shi_brown text-white w py-3 px-6 font-thin text-sm focus:outline-none focus:-outline disabled:bg-gray-300 disabled:text-gray-400"
              disabled={disabled || loading}
            >
              <Loader loading={loading} text={buttonLabel} />
            </button>
          </div>
        </form>
        <AddComponentInput
          placeholder="Add product description"
          mainClassName="w-full"
          onClick={handleDescription}
          disabled={productPrototype}
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
