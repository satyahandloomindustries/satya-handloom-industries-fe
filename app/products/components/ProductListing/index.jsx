'use client';

import { useCallback, useEffect, useRef } from 'react';
import ProductModal from '../Modal';
import ApiService from '@/services/ApiService';
import useShop from '@/store/useShop';
import { createQueryParams } from '@/utls';
import useToast from '@/store/useToast';

const { default: ProductCard } = require('@/components/ProductCard');

const ProductListing = () => {
  const {
    selectedMainCategory,
    selectedSubCategory,
    page,
    customShopSet,
    products,
    totalPages,
  } = useShop();
  const { showErrorToast } = useToast();

  const modalRef = useRef(null);

  const handleProductClick = useCallback((product) => {
    customShopSet({ selectedProduct: product });
    modalRef.current.handleOpen();
  }, []);

  useEffect(() => {
    if (!selectedMainCategory || page > totalPages) return;
    const paramsQuery = createQueryParams({
      category: selectedMainCategory?.value,
      subCategory: selectedSubCategory?.value,
      page,
    });

    ApiService.get(`/api/create-product?${paramsQuery}`)
      .then((data) => {
        const { products, totalPages, total, page } = data;
        customShopSet({ products, totalPages, total, page });
      })
      .catch((err) => showErrorToast(err?.response?.message ?? err?.message));
  }, [selectedMainCategory]);
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
