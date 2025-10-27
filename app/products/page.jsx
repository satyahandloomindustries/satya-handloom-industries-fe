import ShopHeader from '@/components/ShopHeader';
import React from 'react';
import CategoryFilter from './components/CategoryFilter';
import ContactUsFooter from '@/components/ContactUsFooter';
import PaginationFooter from '@/components/PaginationFooter';
import Showing from './components/Showing';
import ProductListing from './components/ProductListing';

const Shop = () => {
  return (
    <div>
      <ShopHeader />
      <div className="grid grid-cols-[200px_1fr] px-[80px] gap-x-4 py-[40px]">
        <CategoryFilter />
        <div className="relative">
          <Showing />
         <ProductListing/>
          <PaginationFooter />
        </div>
      </div>
      <ContactUsFooter />
    </div>
  );
};

export default Shop;
