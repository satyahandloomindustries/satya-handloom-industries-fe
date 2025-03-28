import React from 'react';

const tagVariants = {
  SHI_BROWN: 'bg-shi_brown',
  BLACK: 'bg-black-100',
};

const Tag = ({ label = '', variant = tagVariants.SHI_BROWN }) => {
  return (
    <div
      className={`text-xs text-white ${variant} w-min py-1 px-3 rounded-2xl absolute top-5 left-5`}
    >
      {label}
    </div>
  );
};

export default Tag;
