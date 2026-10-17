'use client';
import useBlogs from '@/store/useBlogs';

const BlogsWindow = () => {
  const { currentBlog = {}, currentIndex, filteredBlogs } = useBlogs();

  if (!currentBlog) {
    return (
      <div className="flex flex-1 items-center justify-center p-8 text-[#5c5146]">
        No thread to read
      </div>
    );
  }

  const number = String((currentIndex ?? 0) + 1).padStart(2, '0');
  const total = String(filteredBlogs?.length ?? 0).padStart(2, '0');

  return (
    <section className="min-h-0 flex-1 overflow-y-auto bg-[#fffaf3] px-6 py-8 md:px-14 md:py-12">
      <article className="mx-auto max-w-2xl">
        <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.28em] text-[#b8893f]">
          <span>{number}</span>
          <span className="h-px w-10 bg-[#c29958]" />
          <span className="text-[#a89880]">{total}</span>
        </div>
        <h1 className="mt-5 text-3xl leading-tight text-[#2a2118] md:text-[2.6rem]">
          {currentBlog.title}
        </h1>
        <div className="mt-8 space-y-5 text-[15px] leading-8 text-[#3d342b]">
          {currentBlog.description?.map((item) => (
            <p key={item} className="whitespace-pre-line">
              {item}
            </p>
          ))}
        </div>
      </article>
    </section>
  );
};

export default BlogsWindow;
