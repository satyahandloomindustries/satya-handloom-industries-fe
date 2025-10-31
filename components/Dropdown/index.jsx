'use client';
import React from 'react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';

function MyDropdown({ selected, setSelected, items = [], placeholder = "Click to expand" }) {

  const handleSelection = (item) => {
    setSelected?.(item)
  }

  const handleReset = () => {

    setSelected?.(null)
  }

  const disabled = !items?.length

  return (
    <Menu className="bg-white" as='div'>
      <MenuButton disabled={disabled} className='outline-none cursor-pointer focus:bg-white focus:text-black text-white bg-shi_brown border border-gray-100 rounded-md px-3 py-2 w-[150px] text-sm shadow-sm disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed'>{disabled ? 'No varieties' : selected?.name ?? placeholder}</MenuButton>
      <MenuItems anchor="bottom" className="outline-none flex flex-col bg-white w-[150px] rounded shadow-lg mt-1 border border-gray-100">
        {items.map((item) => (
          <MenuItem key={item.label}>
            <button onClick={handleSelection.bind(null, item)} className="data-[focus]:bg-gray-100 outline-none py-2 border-b-2 border-gray-100 last:border-b-0">
              {item.label}
            </button>
          </MenuItem>
        ))}
        <MenuItem>
          <button onClick={handleReset} className="data-[focus]:bg-gray-100 outline-none py-2 border-b-2 border-gray-100 last:border-b-0">
            Reset
          </button>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
}

export default MyDropdown;


export const DropdownLabelWrapper = ({children , label='' , labelClassname=''})=>{

  return <div>
    <div className={labelClassname}>{label}</div>
    {children}
  </div>

}

