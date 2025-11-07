'use client';
import MyDropdown from '@/components/Dropdown';
import React, { useState } from 'react';

const Showing = () => {
  const [selected, setSelected] = useState();
  return (
    <div className="flex justify-between items-center p-4 pt-0">
      <div className="text-gray-700 ">Showing 1-16 Of 21 results</div>

      <div className="flex items-center gap-2">
        <div className="font-semibold tracking-wide text-sm text-shi_brown">
          Sub-categories:
        </div>
        <MyDropdown selected={selected} setSelected={setSelected} />
      </div>
    </div>
  );
};

export default Showing;
