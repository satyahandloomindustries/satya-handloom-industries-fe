'use client';
import Searchbar from '@/components/Searchbar';
import useBlogs from '@/store/useBlogs';
import { useCallback, useEffect } from 'react';

const BlogsPanel = ({ blogs = [] }) => {
  const {
    setBlogs,
    currentBlog,
    setCurrentBlog,
    filteredBlogs,
    setFilteredBlogs,
    currentIndex,
  } = useBlogs();

  useEffect(() => {
    setBlogs(blogs);
    setCurrentBlog(0);
  }, [blogs]);

  const handleKeydown = useCallback(
    (event) => {
      switch (event.key) {
        case 'ArrowDown': {
          currentIndex + 1 >= filteredBlogs.length
            ? setCurrentBlog(0)
            : setCurrentBlog(currentIndex + 1);
          break;
        }
        case 'ArrowUp': {
          currentIndex - 1 < 0
            ? setCurrentBlog(filteredBlogs.length - 1)
            : setCurrentBlog(currentIndex - 1);
          break;
        }
      }
    },
    [currentIndex, filteredBlogs, setCurrentBlog]
  );

  return (
    <aside className="flex max-h-[38vh] w-full shrink-0 flex-col border-b border-[#eadfce] bg-[#f3e6cf] px-5 py-6 md:h-full md:max-h-none md:w-[320px] md:border-b-0 md:border-r md:px-6 md:py-10">
      <p className="text-[11px] uppercase tracking-[0.32em] text-[#b8893f]">
        Thread Tales
      </p>
      <h2 className="mt-2 text-2xl font-medium leading-tight text-[#2a2118]">
        The journal
      </h2>
      <Searchbar onSearchComplete={setFilteredBlogs} />

      {!currentBlog ? (
        <p className="mt-6 text-sm text-[#5c5146]">No threads to show</p>
      ) : (
        <ol
          className="scrollbar-thin scrollbar-thumb-[#e4d3b4] scrollbar-track-transparent mt-6 h-full space-y-1 overflow-y-auto outline-none"
          tabIndex={0}
          onKeyDown={handleKeydown}
        >
          {filteredBlogs.map((item, index) => {
            const active = item.id === currentBlog?.id;
            const number = String(index + 1).padStart(2, '0');
            return (
              <li key={item.id}>
                <button
                  className={`flex w-full items-start gap-3 border-l-2 py-3 pl-3 text-left outline-none transition ${
                    active
                      ? 'border-[#c29958] text-[#2a2118]'
                      : 'border-transparent text-[#5c5146] hover:border-[#eadfce] hover:text-[#2a2118]'
                  }`}
                  onClick={setCurrentBlog.bind(null, index)}
                >
                  <span
                    className={`mt-0.5 text-[11px] tracking-[0.18em] ${
                      active ? 'text-[#b8893f]' : 'text-[#a89880]'
                    }`}
                  >
                    {number}
                  </span>
                  <span className="text-sm leading-5">{item.title}</span>
                </button>
              </li>
            );
          })}
        </ol>
      )}
    </aside>
  );
};

export default BlogsPanel;
