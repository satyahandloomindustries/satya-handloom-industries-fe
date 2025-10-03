import { create } from 'zustand';
import useVoiceSearch from './useVoiceSearch';
import { matchesSearch } from '@/utls';

const useBlogs = create((set, get) => ({
    blogs: [],
    filteredBlogs: [],
    currentBlog: null,
    setCurrentBlog: (index) => set({ currentBlog: get().blogs?.[index] ?? null}),
    setBlogs: (blogs) => set({ blogs  , filteredBlogs: blogs}),
    setFilteredBlogs: () => {
        const {query} = useVoiceSearch.getState()
        const filteredBlogs = get().blogs.filter((blog) => matchesSearch(blog.title , query))
        set({ filteredBlogs , currentBlog : filteredBlogs?.[0] ?? null})
    },
}));

export default useBlogs;
