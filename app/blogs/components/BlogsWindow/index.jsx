"use client"
import React, { useEffect, useState } from 'react';
import styles from './index.module.css';
import clsx from 'clsx';
import useBlogs from '@/store/useBlogs';

const BlogsWindow = () => {
  const {currentBlog = {}} = useBlogs()

  if( !currentBlog) return <p>Oops! No thread to read</p>
  return (
    <div className="flex-1 h-full bg-gray-100 relative">
      <div
        className="pt-8 px-10 overflow-y-scroll"
        style={{ height: 'calc(100%  - 100px)' }}
      >
        <h1 className="text-center text-2xl">{currentBlog.title}</h1>
        <div className="py-6">
          {currentBlog.description}
        </div>

      </div>
      <div className="bg-gray-200 w-full h-[100px] absolute bottom-0">
        <div className="relative w-full h-full">
          <div className={clsx(styles.wave, styles.wave1)}></div>
          <div className={clsx(styles.wave, styles.wave2)}></div>
        </div>
      </div>
    </div>
  );
};

export default BlogsWindow;
