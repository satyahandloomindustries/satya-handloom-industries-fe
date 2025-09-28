import React from 'react';
import { CiSearch } from "react-icons/ci";

const mockData = [
  'Title 1 Title 1  Title 1',
  'Title 2 Title 2 Title 2',
  'Title 3 Title 3 Title 3',
  'Title 3 Title 3 Title 3',
  'Title 3 Title 3 Title 3',
  'Title 3 Title 3 Title 3',
  'Title 3 Title 3 Title 3',
  'Title 3 Title 3 Title 9',
  'Title 3 Title 3 Title 9',
  'Title 3 Title 3 Title 9',
  'Title 3 Title 3 Title 9',
  'Title 3 Title 3 Title 9',
  'Title 3 Title 3 Title 9',
  'Title 3 Title 3 Title 15',
  'Title 3 Title 3 Title 15',

  'Title 3 Title 3 Title 18',
];

const BlogsPanel = () => {
  return (
    <div
      className="w-[300px] text-white backdrop-blur p-4 flex flex-col"
      style={{ backgroundColor: 'rgb(175, 159, 93)' }}
    >
      <div className="text-center text-lg">Thread Tales</div>
      <div className='relative w-full'>
      <input id="search"name="search" placeholder='Search your thread..' className="border rounded mt-4 p-1 text-shi_brown focus:outline-none cursor-default w-full pr-10"/>
      <CiSearch className='absolute right-2 top-1/2 text-black'/>
      </div>
      
      <div className="h-full mt-6 space-y-2 overflow-y-scroll scrollbar-rounded scrollbar-thin scrollbar-thumb-gray-100 scrollbar-track-transparent">
        {mockData.map((item, index) => (
          <div
            className="bg-white/10 backdrop-blur p-1 cursor-pointer rounded text-sm"
            key={index}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogsPanel;
