'use client';
import MyDropdown from '@/components/Dropdown';
import useProductAdmin from '@/store/useProductAdmin';
import useShop from '@/store/useShop';
import React from 'react';

const Showing = () => {
  const {
    selectedSubCategory,
    customShopSet,
    selectedMainCategory,
    total,
    page,
  } = useShop();
  const { allCategories } = useProductAdmin();

  const subCategoriesDropdown = allCategories?.[
    selectedMainCategory?.label
  ]?.map(({ _id, name }) => ({
    label: name,
    value: _id,
  }));

  return (
    <div className="flex justify-between items-center p-4 pt-0">
      <div className="text-gray-700 ">
        Showing {(page - 1) * 10 + 1} Of {total} results
      </div>
      <div className="grid grid-cols-[1.25fr_0.75fr] gap-2">
        <div className="font-semibold tracking-wide text-sm text-shi_brown ml-auto self-center">
          Sub-categories:
        </div>
        <MyDropdown
          selected={selectedSubCategory}
          setSelected={(item) => customShopSet({ selectedSubCategory: item })}
          items={subCategoriesDropdown}
          placeholder="Select"
        />
      </div>
    </div>
  );
};

export default Showing;
