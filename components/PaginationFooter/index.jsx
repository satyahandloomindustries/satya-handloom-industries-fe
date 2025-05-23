'use client';
import { range } from '@/utls';
import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Circle = ({ active, children, onClick = () => {} }) => {
  return (
    <button
      className={`w-3 h-3 rounded-full p-5 flex items-center justify-center ${active ? 'bg-shi_brown text-white' : 'bg-gray-300'}`}
      onClick={onClick}
    >
      <div className="items-center justify-center flex">{children}</div>
    </button>
  );
};

const PaginationFooter = () => {
  const [page, setPage] = React.useState(1);

  const start = Math.ceil(page / 4) * 4 - 3;

  return (
    <div className="w-full p-5 border items-center justify-center flex gap-2 absolute bottom-0 mt-8">
      <Circle onClick={() => setPage(Math.max(1, page - 1))}>
        <FaChevronLeft size={18} />
      </Circle>
      {[...range(start, start + 4)].map((item) => {
        return (
          <Circle
            key={item}
            active={item === page}
            onClick={() => setPage(item)}
          >
            {item}
          </Circle>
        );
      })}
      <Circle onClick={() => setPage(page + 1)}>
        <FaChevronRight size={18} />
      </Circle>
    </div>
  );
};

export default PaginationFooter;
