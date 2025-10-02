'use client';
import Searchbar from '@/components/Searchbar';
import useBlogs from '@/store/useBlogs';
import React, { useEffect } from 'react';

const BlogsPanel = ({ blogs =[]}) => {
  const {setBlogs , currentBlog , setCurrentBlog , filteredBlogs , setFilteredBlogs } = useBlogs()

  
  useEffect(()=>{
    setBlogs(blogs);
    setCurrentBlog(0)
  },[blogs])
  
    
  
  return (
    <div
      className="w-[300px] text-white backdrop-blur p-4 flex flex-col"
      style={{ backgroundColor: 'rgb(175, 159, 93)' }}
    >
      <div className="text-center text-lg">Thread Tales</div>
      <Searchbar onSearchComplete={setFilteredBlogs}/>

      {! currentBlog ? <p>No threads to show</p>:<ol className="list-decimal pl-6 h-full mt-6 space-y-2 overflow-y-scroll scrollbar-rounded scrollbar-thin scrollbar-thumb-gray-100 scrollbar-track-transparent">        {filteredBlogs.map((item, index) => (
        <li
          className={`p-1 tracking-wide cursor-pointer rounded text-sm ${item.id === currentBlog?.id ? 'bg-black/10 backdrop-blur' : ''}`}
          key={item.id}
        >
          <button className='w-full text-left active:scale-95 transition-all duration-200' onClick={setCurrentBlog.bind(null, index)}>
            {item.title}

          </button>
        </li>
      ))}
      </ol>}
    </div>
  );
};

export default BlogsPanel;
