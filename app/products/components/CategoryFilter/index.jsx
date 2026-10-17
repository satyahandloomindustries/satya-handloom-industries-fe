'use client';
import React, { useEffect } from 'react';
import Filter from '@/components/Filter';
import TextGray from '@/components/TextGray';
import MultiRenderer from '@/components/MultiRenderer';
import ApiService from '@/services/ApiService';
import useShop from '@/store/useShop';
import Shimmer from '../Shimmer';

const categoryBars = [
  'w-full',
  'w-4/5',
  'w-3/5',
  'w-11/12',
  'w-2/3',
  'w-4/5',
  'w-3/4',
  'w-5/6',
];

const CategoryFilter = () => {
  const {
    setAggregateCategories,
    aggregateCategories = [],
    customShopSet,
    selectedMainCategory,
    categoriesLoading,
  } = useShop();

  useEffect(() => {
    if (!useShop.getState().aggregateCategories?.length) {
      customShopSet({ categoriesLoading: true });
    }
    ApiService.get('/api/aggregate-categories')
      .then(({ categories }) => {
        setAggregateCategories(categories);
        if (!categories?.length && !useShop.getState().products?.length) {
          customShopSet({ catalogLoading: false });
        }
      })
      .catch((err) => {
        console.log(err);
        if (!useShop.getState().aggregateCategories?.length) {
          customShopSet({ catalogLoading: false });
        }
      })
      .finally(() => customShopSet({ categoriesLoading: false }));
  }, []);

  const handleCategorySelect = (label, value) => {
    customShopSet({ selectedMainCategory: { label, value } });
  };

  return (
    <Filter title="Categories">
      {categoriesLoading ? (
        <div className="mt-3 space-y-4">
          {categoryBars.map((width, index) => (
            <Shimmer key={index} className={`h-3 rounded-full ${width}`} />
          ))}
        </div>
      ) : (
      <MultiRenderer
        Component={({ name, count, _id }) => (
          <div onClick={handleCategorySelect.bind(null, name, _id)}>
            <TextGray
              text={`${name} (${count})`}
              className={`mt-3 cursor-pointer ${selectedMainCategory?.label === name ? 'text-shi_brown' : 'text-gray-600'}`}
            />
          </div>
        )}
        rendererSet={aggregateCategories}
      />
      )}
    </Filter>
  );
};

export default CategoryFilter;
