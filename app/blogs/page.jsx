import BlogsPanel from './components/BlogsPanel';
import BlogsWindow from './components/BlogsWindow';
import mockData from '@/mockdata.json';

const Blogs = async () => {
  const blogs = await getBlogs();
  return (
    <div className="flex h-[calc(100vh-78px)] flex-col bg-[#fffaf3] md:flex-row">
      <BlogsPanel blogs={blogs} />
      <BlogsWindow />
    </div>
  );
};

export default Blogs;

async function getBlogs() {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return mockData;
}
