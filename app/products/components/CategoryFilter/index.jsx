'use client';
import React from 'react';
import useShopStore from '../../store';
import Filter from '@/components/Filter';
import TextGray from '@/components/TextGray';
import MultiRenderer from '@/components/MultiRenderer';

const CategoryFilter = () => {
  const { categories } = useShopStore();
  console.log(categories);

  return (
    <Filter title="Categories">
      <MultiRenderer
        Component={({ label, count }) => (
          <TextGray
            text={`${label} (${count})`}
            className="mt-3 cursor-pointer"
          />
        )}
        rendererSet={categories}
      />
    </Filter>
  );
};

export default CategoryFilter;
