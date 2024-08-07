import { create } from 'zustand';
import { fetchAllPosts, fetchPostsByHashtagId } from '../api/post/postApi';

const usePostStore = create((set, get) => ({
  posts: [],
  page: 0,
  size: 10,
  sortOrder: 'latest',
  loading: false,
  error: null,

  setPage: page => set({ page }),
  setSize: size => set({ size }),
  setSortOrder: sortOrder => set({ sortOrder }),

  fetchPosts: async () => {
    set({ loading: true, error: null });
    const { sortOrder, page, size } = get();
    try {
      const response = await fetchAllPosts(sortOrder, page, size);
      set({ posts: response.content, loading: false });
    } catch (error) {
      set({ error, loading: false });
    }
  },

  fetchPostsByHashtagId: async hashtagId => {
    set({ loading: true, error: null });
    const { page, size } = get();
    try {
      const response = await fetchPostsByHashtagId(hashtagId, page, size);
      set({ posts: response.content, loading: false });
    } catch (error) {
      set({ error, loading: false });
    }
  },
}));

export default usePostStore;
