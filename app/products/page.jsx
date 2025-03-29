import ShopHeader from '@/components/ShopHeader';
import React from 'react';
import CategoryFilter from './components/CategoryFilter';
import ContactUsFooter from '@/components/ContactUsFooter';

const Shop = () => {
  return (
    <div>
      <ShopHeader />
      <div className="grid grid-cols-[200px_1fr] px-[80px] gap-x-4 py-[40px]">
        <CategoryFilter />
        <div></div>
      </div>
      <ContactUsFooter />
    </div>
  );
};

export default Shop;
