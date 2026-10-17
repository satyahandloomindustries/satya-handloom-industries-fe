'use client';
import { Link } from 'next-view-transitions';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
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
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const routes = navbarRoutes.filter((item) => {
    if (!item.hide) return true;

    if (token && item.hide === 'tokenNotPresent') {
      return true;
    }
    if (!token && item.hide === 'tokenPresent') {
      return true;
    }
  });

  const links = routes.filter((item) => !item.hide);
  const account = routes.filter((item) => item.hide);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40">
        <div className="bg-[linear-gradient(180deg,#fffdf8_0%,#f4eadc_100%)] shadow-[0_10px_28px_rgba(92,62,24,0.08)]">
          <nav className="flex items-center gap-4 px-4 py-3 sm:px-8">
            <Link
              href="/"
              className="flex min-w-0 items-center gap-3 outline-none"
            >
              <ShiLogo width={46} height={46} />
              <span className="hidden leading-tight sm:block">
                <span className="block text-[11px] font-medium uppercase tracking-[0.32em] text-[#b8893f]">
                  Satya
                </span>
                <span className="block text-[11px] font-medium uppercase tracking-[0.32em] text-[#2a2118]">
                  Handloom Fabrics
                </span>
              </span>
            </Link>

            <button
              type="button"
              className="ml-auto shrink-0 rounded-full bg-white px-4 py-1.5 text-sm text-[#2a2118] shadow-sm ring-1 ring-[#e4c98a] md:hidden"
              aria-expanded={open}
              onClick={() => setOpen((value) => !value)}
            >
              {open ? 'Close' : 'Menu'}
            </button>

            <div className="ml-auto hidden items-center gap-2 md:flex">
              <div className="flex items-center gap-1 rounded-full bg-white/70 p-1 ring-1 ring-[#ead7b4]">
                {links.map(({ label, value }) => {
                  const active = pathname === value;
                  return (
                    <Link
                      href={value}
                      key={label}
                      className={clsx(
                        'rounded-full px-4 py-2 text-sm tracking-wide outline-none transition',
                        active
                          ? 'bg-[#f4dfc0] text-[#8a5e2b] shadow-sm'
                          : 'text-[#5c5146] hover:bg-[#f8f1e4] hover:text-[#9a7040]'
                      )}
                    >
                      {label}
                    </Link>
                  );
                })}
              </div>

              {account.map(({ label, value }) => (
                <Link
                  href={value}
                  key={label}
                  className="rounded-full bg-[#f7efe2] px-5 py-2 text-sm tracking-wide text-[#8a5e2b] outline-none ring-1 ring-[#ead7b4] transition hover:bg-[#f3e6d2]"
                >
                  {label}
                </Link>
              ))}
            </div>
          </nav>
          <div className="h-[2px] bg-[linear-gradient(90deg,transparent,#f3e2bf_12%,#c29958_50%,#f3e2bf_88%,transparent)]" />
        </div>

        {open ? (
          <div className="flex flex-col gap-1 bg-[#fffaf3] px-4 py-3 shadow-[0_16px_28px_rgba(92,62,24,0.08)] md:hidden">
            {routes.map(({ label, value, hide }) => {
              const active = pathname === value;
              return (
                <Link
                  href={value}
                  key={label}
                  className={clsx(
                    'rounded-full px-4 py-2.5 text-sm outline-none',
                    hide
                      ? 'mt-1 bg-[#f7efe2] text-center text-[#8a5e2b] ring-1 ring-[#ead7b4]'
                      : active
                        ? 'bg-white text-[#9a7040] shadow-sm ring-1 ring-[#ead7b4]'
                        : 'text-[#5c5146]'
                  )}
                >
                  {label}
                </Link>
              );
            })}
          </div>
        ) : null}
      </header>
      <div className="h-[78px]" aria-hidden="true" />
    </>
  );
};

export default Navbar;
