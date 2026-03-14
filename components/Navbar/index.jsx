'use client';
import { Link } from 'next-view-transitions';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import React from 'react';
import styles from '@/components/Navbar/index.module.css';
import ShiLogo from '@/components/ShiLogo';
import useInitApp from '@/hooks/useInitApp';

export const navbarRoutes = [
  { label: 'Home', value: '/' },
  {
    label: 'Shop',
    value: '/products',
  },
  { label: 'Blogs', value: '/blogs' },
  { label: 'Contact us', value: '/contactUs' },
  {
    label: 'Login',
    value: '/login',
    hide: 'tokenPresent',
  },
  {
    label: 'Profile',
    value: '/profile',
    hide: 'tokenNotPresent',
  },
];

const Navbar = ({ token }) => {
  useInitApp();
  const pathname = usePathname();
  const routes = navbarRoutes.filter((item) => {
    if (!item.hide) return true;

    if (token && item.hide === 'tokenNotPresent') {
      return true;
    }
    if (!token && item.hide === 'tokenPresent') {
      return true;
    }
  });
  return (
    <div className="grid grid-cols-[100px_1fr] gap-30 py-5 px-6 sticky top-0 z-40 bg-gray-100">
      <ShiLogo />
      <div
        className={`grid items-center gap-10`}
        style={{
          gridTemplateColumns: `repeat(${routes.length}, max-content)`,
        }}
      >
        {routes.map(({ label, value }) => (
          <Link
            href={value}
            key={label}
            className={clsx(
              pathname === value ? 'text-shi_brown' : '',
              styles['border-animation'],
              'outline-none'
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
