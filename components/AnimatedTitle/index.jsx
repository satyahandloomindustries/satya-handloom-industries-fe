import React from 'react';
import styles from './index.module.css';

const AnimatedTitle = ({ title = '', subTitle }) => {
  return (
    <div className="text-center mt-8 mb-8">
      <div className={styles['text-animation']}>{title}</div>
      {subTitle ? <div className="text-gray-800">{subTitle}</div> : null}
    </div>
  );
};

export default AnimatedTitle;
