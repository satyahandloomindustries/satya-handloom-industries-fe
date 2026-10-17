import React from 'react';
import CategoryFilter from './components/CategoryFilter';
import ContactUsFooter from '@/components/ContactUsFooter';
import Showing from './components/Showing';
import ProductListing from './components/ProductListing';
import PaginationShop from '@/app/products/components/PaginationShop';

const Shop = () => {
  return (
    <div>
      <div className="grid gap-10 bg-white px-6 py-10 md:grid-cols-[220px_1fr] md:px-8">
        <CategoryFilter />
        <div className="relative">
          <Showing />
          <ProductListing />
          <PaginationShop />
        </div>
      </div>
      <ContactUsFooter />
    </div>
  );
};

export default Shop;
