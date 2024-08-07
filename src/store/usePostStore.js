import create from 'zustand';
import {
  fetchAllPosts,
  fetchPostById,
  fetchPostsByUserId,
  fetchPostsByHashtagId,
  searchPosts,
} from '../api/post/postApi';

const usePostStore = create(set => ({
  posts: [],
  post: null,
  isLoading: false,
  error: null,

  // 모든 게시글 조회
  loadPosts: async (sortBy = 'latest', page = 0, size = 10) => {
    set({ isLoading: true, error: null });
    try {
      const data = await fetchAllPosts(sortBy, page, size);
      set({ posts: data.content || [], isLoading: false });
    } catch (error) {
      set({ error: 'Failed to fetch posts', isLoading: false });
    }
  },

  // 특정 게시글 상세 조회
  loadPostById: async postId => {
    set({ isLoading: true, error: null });
    try {
      const data = await fetchPostById(postId);
      set({ post: data, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to fetch post by id', isLoading: false });
    }
  },

  // 특정 유저 게시글 조회
  loadPostsByUserId: async (userId, page = 0, size = 10) => {
    set({ isLoading: true, error: null });
    try {
      const data = await fetchPostsByUserId(userId, page, size);
      set({ posts: data.content || [], isLoading: false });
    } catch (error) {
      set({ error: 'Failed to fetch posts by user id', isLoading: false });
    }
  },

  // 특정 해시태그의 게시글 조회
  loadPostsByHashtagId: async (hashtagId, sortBy, page = 0, size = 10) => {
    set({ isLoading: true, error: null });
    try {
      const data = await fetchPostsByHashtagId(hashtagId, sortBy, page, size);
      set({ posts: data.content || [], isLoading: false });
    } catch (error) {
      set({ error: 'Failed to fetch posts by hashtag id', isLoading: false });
    }
  },

  // 기타 상태
  clearPosts: () => set({ posts: [] }),
}));

export default usePostStore;
