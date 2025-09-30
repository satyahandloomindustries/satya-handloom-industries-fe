import Searchbar from '@/components/Searchbar';
import React from 'react';

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
      <Searchbar/>
      
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
