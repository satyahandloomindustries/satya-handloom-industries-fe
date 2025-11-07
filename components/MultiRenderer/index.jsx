import React from 'react';

const MultiRenderer = ({
  mainClassName = '',
  rendererSet = [],
  Component,
  ...rest
}) => {
  return (
    <div className={mainClassName}>
      {rendererSet.map((item, index) =>
        typeof rendererSet[0] === 'object' ? (
          <Component {...item} {...rest} key={index} />
        ) : (
          <Component item={item} key={index} {...rest} />
        )
      )}
    </div>
  );
};

export default MultiRenderer;
