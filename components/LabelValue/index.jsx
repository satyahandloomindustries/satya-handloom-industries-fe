import clsx from 'clsx';
import React from 'react';

const LabelValue = ({ className, arr, title }) => {
  return (
    <div>
      <div className="text-base font-bold">{title}</div>
      <div className={clsx(className, 'mt-6')}>
        {arr.map(({ label, value }) => {
          return (
            <div
              className="flex space-x-2 mt-4 items-center text-base gray-100"
              key={label}
            >
              <div>{label}</div>
              <div>{value?.() ?? value}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LabelValue;
