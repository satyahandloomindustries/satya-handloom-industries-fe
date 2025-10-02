import React from 'react';
import styles from './index.module.css';
import clsx from 'clsx';
import BlogsPanel from './components/BlogsPanel';
import BlogsWindow from './components/BlogsWindow';
import mockData from '@/mockdata.json';

const Box3D = () => {
  return (
    <div className={styles.perspectiveContainer}>
      <div className={clsx(styles.box3D, 'bg-white')} />
    </div>
  );
};

const Blogs = async() => {
  const blogs = await getBlogs();
  return (
    <div>
      <div className="flex h-[500px]">
        <BlogsPanel blogs={blogs} />
        <BlogsWindow />
      </div>
    </div>

   
  );
};

export default Blogs;


async function getBlogs() {
  // const res = await fetch("https://api.example.com/blogs");
  // const data = await res.json();

  await new Promise((resolve) => setTimeout(resolve, 2000));

  return mockData;
}