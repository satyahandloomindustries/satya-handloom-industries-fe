'use client';

import { useCallback, useEffect, useRef } from 'react';
import ProductModal from '../Modal';
import ApiService from '@/services/ApiService';
import useShop from '@/store/useShop';
import { createQueryParams } from '@/utls';
import useToast from '@/store/useToast';
import Shimmer from '../Shimmer';

const { default: ProductCard } = require('@/components/ProductCard');

const catalogKey = (category, subCategory, page) =>
  `${category?.value ?? ''}|${subCategory?.value ?? ''}|${page}`;

const ProductListing = () => {
  const {
    selectedMainCategory,
    selectedSubCategory,
    page,
    customShopSet,
    products,
    totalPages,
    catalogLoading,
  } = useShop();
  const { showErrorToast } = useToast();

  const modalRef = useRef(null);

  const handleProductClick = useCallback((product) => {
    customShopSet({ selectedProduct: product });
    modalRef.current.handleOpen();
  }, []);

  useEffect(() => {
    if (!selectedMainCategory || page > totalPages) return;
    let ignore = false;
    const paramsQuery = createQueryParams({
      category: selectedMainCategory?.value,
      subCategory: selectedSubCategory?.value,
      page,
    });

    const key = catalogKey(selectedMainCategory, selectedSubCategory, page);
    if (useShop.getState().loadedCatalogKey !== key) {
      customShopSet({ catalogLoading: true });
    }
    ApiService.get(`/api/create-product?${paramsQuery}`)
      .then((data) => {
        if (ignore) return;
        const { products, totalPages, total, page } = data;
        customShopSet({
          products,
          totalPages,
          total,
          page,
          loadedCatalogKey: key,
        });
      })
      .catch((err) => {
        if (!ignore) showErrorToast(err?.response?.message ?? err?.message);
      })
      .finally(() => {
        if (!ignore) customShopSet({ catalogLoading: false });
      });

    return () => {
      ignore = true;
    };
  }, [selectedMainCategory, selectedSubCategory, page]);

  if (catalogLoading) {
    return (
      <div className="grid grid-cols-3 gap-x-8 gap-y-8 pb-24">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="flex flex-col items-center">
            <Shimmer className="h-[263px] w-[263px]" />
            <Shimmer className="mt-8 h-4 w-32 rounded-full" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="pb-24 grid grid-cols-3 gap-x-8 gap-y-4">
      {products.map(({ name, images, code, ...rest }) => (
        <ProductCard
          key={code}
          name={name}
          source={images?.[0]?.url}
          onClick={handleProductClick.bind(null, {
            name,
            images,
            code,
            ...rest,
          })}
        />
      ))}

      <ProductModal ref={modalRef} />
    </div>
  );
};

export default ProductListing;
