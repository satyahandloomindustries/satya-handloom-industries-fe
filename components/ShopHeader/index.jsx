'use client';
import Link from 'next/link';
import React from 'react';
import { IoMdHome } from 'react-icons/io';
import { navbarRoutes } from '@/components/Navbar';
import { usePathname } from 'next/navigation';

const SlashDivider = () => {
  return <span className="mx-6">/</span>;
};

const ShopHeader = () => {
  const pathname = usePathname();
  const currentRoute = navbarRoutes.find((route) => route.value === pathname);
  if (!currentRoute?.label) {
    return null;
  }
  return (
    <div>
      <div className="bg-gray-100 pl-[77px] h-[80px] flex items-center justify-start">
        <Link href="/">
          <IoMdHome className="hover:text-shi_brown" />
        </Link>
        <SlashDivider />
        <div className="text-sm text-shi_brown">{currentRoute.label}</div>
      </div>
    </div>
  );
};

export default ShopHeader;
