'use client';
import Link from 'next/link';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import React from 'react';
import styles from '@/components/Navbar/index.module.css';

const navbarRoutes = [
  { label: 'Home', value: '/' },
  { label: 'Blogs', value: '/blogs' },
  { label: 'ContactUs', value: '/contactUs' },
];

const Navbar = () => {
  const pathname = usePathname();
  return (
    <div className="grid grid-cols-[100px_1fr] gap-30 py-5 px-6 sticky top-0 z-50 bg-white">
      <div className="text-4xl italic font-semibold">SHI</div>
      <div
        className={`grid items-center gap-10`}
        style={{
          gridTemplateColumns: `repeat(${navbarRoutes.length}, min-content)`,
        }}
      >
        {navbarRoutes.map(({ label, value }) => (
          <Link
            href={value}
            key={label}
            className={clsx(
              pathname === value ? 'text-shi_brown' : '',
              styles['border-animation']
            )}
          >
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
