import React from 'react';
import UnderlineStroke from '../UnderlineStroke';
import Divider from '../Divider';

const Filter = ({ title, children }) => {
  return (
    <div>
      <div className="text-lg">{title}</div>
      <Divider className="mt-[20px] mb-[10px]" />
      {children}
    </div>
  );
};

export default Filter;
