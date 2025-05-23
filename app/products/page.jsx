import ShopHeader from '@/components/ShopHeader';
import React from 'react';
import CategoryFilter from './components/CategoryFilter';
import ContactUsFooter from '@/components/ContactUsFooter';
import PaginationFooter from '@/components/PaginationFooter';
import ProductCard from '@/components/ProductCard';
import Showing from './components/Showing';

const Shop = () => {
  return (
    <div>
      <ShopHeader />
      <div className="grid grid-cols-[200px_1fr] px-[80px] gap-x-4 py-[40px]">
        <CategoryFilter />
        <div className="relative">
          <Showing />
          <div className="pb-24 grid grid-cols-3 gap-x-8 gap-y-4">
            {/* ***Should be removd*** */}
            <ProductCard
              name="Product card"
              source="/hands-assembling-advent-wreath_317x449.jpg"
            />
            <ProductCard
              name="Product card"
              source="/hands-assembling-advent-wreath_317x449.jpg"
            />
            <ProductCard
              name="Product card"
              source="/hands-assembling-advent-wreath_317x449.jpg"
            />
            <ProductCard
              name="Product card"
              source="/hands-assembling-advent-wreath_317x449.jpg"
            />
            <ProductCard
              name="Product card"
              source="/hands-assembling-advent-wreath_317x449.jpg"
            />
          </div>
          <PaginationFooter />
        </div>
      </div>
      <ContactUsFooter />
    </div>
  );
};

export default Shop;
