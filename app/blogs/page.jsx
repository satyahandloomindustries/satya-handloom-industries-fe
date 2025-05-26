import React from 'react';
import styles from './index.module.css';
import clsx from 'clsx';
import BlogsPanel from './components/BlogsPanel';

const Box3D = () => {
  return (
    <div className={styles.perspectiveContainer}>
      <div className={clsx(styles.box3D, 'bg-white')} />
    </div>
  );
};

const Blogs = () => {
  return (
    <div className="h-full">
      <div className="w-full h-full bg-gray-100 relative backdrop-blur-md">
        <BlogsPanel />
      </div>
    </div>
  );
};

export default Blogs;
