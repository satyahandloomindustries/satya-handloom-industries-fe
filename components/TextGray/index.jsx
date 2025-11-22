import clsx from 'clsx';
import React from 'react';

const TextGray = ({ text, className }) => {
  return (
    <div
      className={clsx(
        'hover:text-shi_brown text-gray-600 text-base',
        className
      )}
    >
      {text}
    </div>
  );
};

export default TextGray;
