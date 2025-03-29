import Link from 'next/link';
import React from 'react';
import { IoMdHome } from 'react-icons/io';

const SlashDivider = () => {
  return <span className="mx-6">/</span>;
};

const ShopHeader = () => {
  return (
    <div>
      <div className="bg-gray-100 pl-[77px] h-[80px] flex items-center justify-start">
        <Link href="/">
          <IoMdHome className="hover:text-shi_brown" />
        </Link>
        <SlashDivider />
        <div className="text-sm text-shi_brown">Shop</div>
      </div>
    </div>
  );
};

export default ShopHeader;
