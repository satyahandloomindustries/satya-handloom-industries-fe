import React from 'react';

const MultiRenderer = ({
  mainClassName = '',
  rendererSet = [],
  Component,
  spreadProps=true, 
  ...rest
}) => {  
  return (
    <div className={mainClassName}>
      {rendererSet.map((item, index) =>
        spreadProps ? (
          <Component {...item} {...rest} key={index} />
        ) : (
          <Component item={item} key={index} {...rest} />
        )
      )}
    </div>
  );
};

export default MultiRenderer;
