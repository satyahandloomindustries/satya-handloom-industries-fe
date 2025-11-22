'use client';

import { useEffect } from 'react';
import ProductModal from '../Modal';
import ApiService from '@/services/ApiService';
import useShop from '@/store/useShop';
import { createQueryParams } from '@/utls';

const { default: ProductCard } = require('@/components/ProductCard');

const ProductListing = () => {
  const { selectedMainCategory, selectedSubCategory, page , customShopSet , products } = useShop();
  useEffect(() => {
    if (!selectedMainCategory) return;
    const paramsQuery = createQueryParams({
      category: selectedMainCategory?.value,
      subCategory: selectedSubCategory?.value,
      page,
    });
    ApiService.get(`api/create-product?${paramsQuery}`).then((data) => {
      const {products} = data ;
      console.log(products);
      
      customShopSet({products}); 
    });
  }, [selectedMainCategory]);
  return (
    <div className="pb-24 grid grid-cols-3 gap-x-8 gap-y-4">

        {products.map(({name , images , code})=> <ProductCard key={code} name={name} source={images?.[0]?.url}/> )}

      <ProductModal />
    </div>
  );
};

export default ProductListing;
