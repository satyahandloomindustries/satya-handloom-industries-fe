'use client';
import React, { useEffect } from 'react';
import Filter from '@/components/Filter';
import TextGray from '@/components/TextGray';
import MultiRenderer from '@/components/MultiRenderer';
import ApiService from '@/services/ApiService';
import useShop from '@/store/useShop';

const CategoryFilter = () => {
  const {
    setAggregateCategories,
    aggregateCategories = [],
    customShopSet,
    selectedMainCategory,
  } = useShop();

  useEffect(() => {
    ApiService.get('/api/aggregate-categories')
      .then(({ categories }) => {
        setAggregateCategories(categories);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleCategorySelect = (name) => {
    customShopSet({ selectedMainCategory: name });
  };

  return (
    <Filter title="Categories">
      <MultiRenderer
        Component={({ name, count }) => (
          <TextGray
            text={`${name} (${count})`}
            className={`mt-3 cursor-pointer ${selectedMainCategory === name ? 'text-shi_brown' : 'text-gray-600'}`}
            onClick={handleCategorySelect.bind(null, name)}
          />
        )}
        rendererSet={aggregateCategories}
      />
    </Filter>
  );
};

export default CategoryFilter;
