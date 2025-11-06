import React from 'react';
import { TiDelete } from "react-icons/ti";

const tagVariants = {
  SHI_BROWN: 'bg-shi_brown',
  BLACK: 'bg-black-100',
};

const Tag = ({ label = '', variant = tagVariants.SHI_BROWN , onClose = null , mainClassname='absolute top-5 left-5' }) => {
  return (
    <div
      className={`text-xs text-white ${variant} w-fit py-1 px-3 rounded-2xl ${mainClassname}`}
    >
      {label}
      {onClose && <TiDelete className="text-white ml-2 cursor-pointer text-base" onClick={onClose}/>}
    </div>
  );
};

export default Tag;
