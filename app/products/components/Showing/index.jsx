'use client';
import MyDropdown from '@/components/Dropdown';
import useProductAdmin from '@/store/useProductAdmin';
import useShop from '@/store/useShop';
import React from 'react';
import Shimmer from '../Shimmer';

const Showing = () => {
  const {
    selectedSubCategory,
    customShopSet,
    selectedMainCategory,
    total,
    page,
    catalogLoading,
  } = useShop();
  const { allCategories } = useProductAdmin();

  const subCategoriesDropdown = allCategories?.[
    selectedMainCategory?.label
  ]?.map(({ _id, name }) => ({
    label: name,
    value: _id,
  }));

  const start = total ? (page - 1) * 10 + 1 : 0;
  const end = total ? Math.min(page * 10, total) : 0;

  return (
    <div className="mb-6 flex flex-col gap-4 border-b border-[#eadfce] pb-4 sm:flex-row sm:items-center sm:justify-between">
      {catalogLoading ? (
        <Shimmer className="h-4 w-44 rounded-full" />
      ) : (
        <p className="text-sm text-[#5c5146]">
          {total ? `Showing ${start}–${end} of ${total}` : 'No results'}
        </p>
      )}
      <div className="flex items-center gap-3">
        <p className="text-[11px] uppercase tracking-[0.22em] text-[#b8893f]">
          Type
        </p>
        <div className="w-44">
          <MyDropdown
            selected={selectedSubCategory}
            setSelected={(item) => customShopSet({ selectedSubCategory: item })}
            items={subCategoriesDropdown}
            placeholder="All"
            buttonClassName="w-full cursor-pointer rounded-full border border-[#ead7b4] bg-[#fffdf8] px-4 py-2 text-left text-sm text-[#2a2118] outline-none disabled:cursor-not-allowed disabled:bg-[#f7f3ec] disabled:text-[#a89880]"
          />
        </div>
      </div>
    </div>
  );
};

export default Showing;
