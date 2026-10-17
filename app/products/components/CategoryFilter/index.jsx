'use client';
import React, { useEffect } from 'react';
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
        if (!categories?.some((category) => category.count > 0)) {
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
    <aside>
      <p className="text-[11px] uppercase tracking-[0.28em] text-[#b8893f]">
        Categories
      </p>
      {categoriesLoading ? (
        <div className="mt-4 space-y-3">
          {categoryBars.map((width, index) => (
            <Shimmer key={index} className={`h-8 rounded-lg ${width}`} />
          ))}
        </div>
      ) : (
        <ul className="mt-4 space-y-1">
          {aggregateCategories.map(({ name, count, _id }) => {
            const active = selectedMainCategory?.label === name;
            return (
              <li key={_id}>
                <button
                  type="button"
                  onClick={handleCategorySelect.bind(null, name, _id)}
                  className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm ${active ? 'bg-[#f7f3ec] text-[#8a5e2b]' : 'text-[#5c5146] hover:bg-[#fffdf8]'}`}
                >
                  <span>{name}</span>
                  <span className="text-xs text-[#a89880]">{count}</span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </aside>
  );
};

export default CategoryFilter;
