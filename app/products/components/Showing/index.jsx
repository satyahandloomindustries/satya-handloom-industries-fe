import MyDropdown from '@/components/Dropdown';
import React from 'react';

const Showing = () => {
  return (
    <div className="flex justify-between items-center p-4 pt-0">
      <div className="text-gray-700 ">Showing 1-16 Of 21 results</div>
      <MyDropdown />
    </div>
  );
};

export default Showing;
