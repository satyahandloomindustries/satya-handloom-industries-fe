import React from 'react';

const MultiRenderer = ({ mainClassName = '', rendererSet = [], Component }) => {
  return (
    <div className={mainClassName}>
      {rendererSet.map((item, index) => (
        <Component {...item} key={index} />
      ))}
    </div>
  );
};

export default MultiRenderer;
