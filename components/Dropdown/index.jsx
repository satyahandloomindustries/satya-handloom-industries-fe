'use client';
import React, { useLayoutEffect, useRef, useState } from 'react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';

function MyDropdown({
  selected,
  setSelected,
  items = [],
  placeholder = 'Click to expand',
  dropdownDisabled = false,
  showReset= true
}) {
  const divRef = useRef();
  const [width, setWidth] = useState(150);
  const handleSelection = (item) => {
    setSelected?.(item);
  };

  const handleReset = () => {
    setSelected?.(null);
  };

  useLayoutEffect(() => {
    const el = divRef.current;
    if (!el) return;

    const observer = new ResizeObserver(([entry]) => {
      setWidth(entry.contentRect.width);
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const disabled = !items?.length || dropdownDisabled;

  return (
    <Menu className={'bg-white w-full'} as="div" ref={divRef}>
      <MenuButton
        style={{ minWidth: `${width}px` }}
        disabled={disabled}
        className={`outline-none cursor-pointer text-white bg-shi_brown border border-gray-100 rounded-md px-3 py-2 text-sm shadow-sm disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed`}
      >
        {items?.length === 0
          ? 'No varieties'
          : (selected?.label ?? placeholder)}
      </MenuButton>
      <MenuItems
        style={{ minWidth: `${width}px` }}
        anchor="bottom"
        className={`outline-none flex flex-col bg-white rounded shadow-lg mt-1 border border-gray-100 !max-h-60 z-[99999]`}
      >
        {items.map((item) => (
          <MenuItem key={item.label}>
            <button
              onClick={handleSelection.bind(null, item)}
              className="data-[focus]:bg-gray-100 outline-none py-2 border-b-2 border-gray-100 last:border-b-0 text-sm"
            >
              {item.label}
            </button>
          </MenuItem>
        ))}
        {showReset ? <MenuItem>
          <button
            onClick={handleReset}
            className="data-[focus]:bg-gray-100 outline-none py-2 border-b-2 border-gray-100 last:border-b-0 text-red-500"
          >
            Reset
          </button>
        </MenuItem> : null}
      </MenuItems>
    </Menu>
  );
}

export default MyDropdown;

export const DropdownLabelWrapper = ({
  children,
  label = '',
  labelClassname = '',
}) => {
  return (
    <div>
      <div className={labelClassname}>{label}</div>
      {children}
    </div>
  );
};
