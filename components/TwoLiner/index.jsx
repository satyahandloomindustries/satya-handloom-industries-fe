import React from 'react';

const TwoLiner = ({ label, value, Icon = null }) => {
  return (
    <div className="flex gap-4">
      {Icon ? <Icon className="text-shi_brown mt-2" /> : null}
      <div>
        <p className="text-base font-semibold">{label}</p>
        <p className="text-sm pt-1 text-gray-500">{value}</p>
      </div>
    </div>
  );
};

export default TwoLiner;
