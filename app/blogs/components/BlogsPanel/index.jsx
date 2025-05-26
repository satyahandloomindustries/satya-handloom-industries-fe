import React from 'react';

const mockData = [
  'Title 1 Title 1  Title 1',
  'Title 2 Title 2 Title 2',
  'Title 3 Title 3 Title 3',
  'Title 3 Title 3 Title 3',
  'Title 3 Title 3 Title 3',
  'Title 3 Title 3 Title 3',
  'Title 3 Title 3 Title 3',
  'Title 3 Title 3 Title 3',
];
const BlogsPanel = () => {
  return (
    <div className="h-full w-[300px] bg-gray-700 text-white backdrop-blur p-4">
      <div className="text-center text-lg">Text to decide</div>
      <div className="text-center border border-white rounded mt-4 p-1">
        Seachbar goes here
      </div>

      <div className="">
        {mockData.map((item, index) => (
          <div
            className="bg-white/10 backdrop-blur p-3 -m-4 mt-6 cursor-pointer"
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
