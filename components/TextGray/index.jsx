import clsx from 'clsx';
import React from 'react';

const TextGray = ({ text, className, onClick = () => {} }) => {
  return (
    <div
      className={clsx(
        'hover:text-shi_brown text-gray-600 text-base',
        className
      )}
      onClick={onClick}
    >
      {text}
    </div>
  );
};

export default TextGray;
