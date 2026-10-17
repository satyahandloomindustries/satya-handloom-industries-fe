'use client';
import { range } from '@/utls';
import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Circle = ({ active, children, onClick = () => {} }) => {
  return (
    <button
      className={`flex h-10 w-10 items-center justify-center rounded-full text-sm ${active ? 'bg-[#c29958] text-white' : 'border border-[#ead7b4] bg-white text-[#5c5146]'}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

const PaginationFooter = ({ page = 1, totalPages = 1, setPage = () => {} }) => {
  const start = Math.ceil(page / 4) * 4 - 3;
  const end = Math.min(start + 3, totalPages);
  if (start === end) {
    return null;
  }
  return (
    <div className="mt-10 flex w-full items-center justify-center gap-2">
      {page > 1 && (
        <Circle onClick={() => setPage(Math.max(1, page - 1))}>
          <FaChevronLeft size={18} />
        </Circle>
      )}
      {[...range(start, end + 1)].map((item) => {
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
      {page < end && (
        <Circle
          onClick={() => {
            if (totalPages > page) setPage(page + 1);
          }}
        >
          <FaChevronRight size={18} />
        </Circle>
      )}
    </div>
  );
};

export default PaginationFooter;
