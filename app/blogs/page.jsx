import React from 'react';
import styles from './index.module.css';
import clsx from 'clsx';
import BlogsPanel from './components/BlogsPanel';
import BlogsWindow from './components/BlogsWindow';

const Box3D = () => {
  return (
    <div className={styles.perspectiveContainer}>
      <div className={clsx(styles.box3D, 'bg-white')} />
    </div>
  );
};

const Blogs = () => {
  return (
    <div>
      <div className="flex h-[500px]">
        <BlogsPanel />
        <BlogsWindow />
      </div>
    </div>
  );
};

export default Blogs;
