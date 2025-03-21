import Link from 'next/link';
import React from 'react';

const navbarRoutes = [
  { label: 'Home', value: '/' },
  { label: 'Blogs', value: '/blogs' },
  { label: 'ContactUs', value: '/contactUs' },
];

const Navbar = () => {
  return (
    <div className="grid grid-cols-[100px_1fr] border-2 gap-30 py-5 px-6">
      <div className="text-4xl italic font-semibold">SHI</div>
      <div
        className={`grid items-center gap-10`}
        style={{
          gridTemplateColumns: `repeat(${navbarRoutes.length}, 40px)`,
        }}
      >
        {navbarRoutes.map(({ label, value }) => (
          <Link href={value} key={label} className="text-shi_brown">
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
