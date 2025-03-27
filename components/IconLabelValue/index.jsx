import clsx from 'clsx';
import React from 'react';

const IconLabelValue = ({
  iconLabelSet = [],
  className,
  title = '',
  containerClasname,
}) => {
  return (
    <div className={containerClasname}>
      <div className="text-base font-bold">{title}</div>
      <div className={clsx(className, 'mt-6')}>
        {iconLabelSet.map(({ Icon, label }) => {
          return (
            <div className="flex space-x-2 mt-4 items-center" key={label}>
              <Icon className="text-shi_brown" />
              <div className="text-base">{label}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default IconLabelValue;
