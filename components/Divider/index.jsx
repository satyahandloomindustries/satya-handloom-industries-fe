import clsx from 'clsx';
import React from 'react';

const Divider = ({ className }) => {
  return <hr className={clsx('border-t-1 border-gray-300', className)} />;
};

export default Divider;
