import create from 'zustand';
import {
  fetchAllPosts,
  fetchPostById,
  fetchPostsByUserId,
  fetchPostsByHashtagId,
  fetchUserLikedPosts,
  likePost,
  unlikePost,
} from '../api/post/postApi';

const usePostStore = create((set, get) => ({
  posts: [],
  post: null,
  isLoading: false,
  error: null,
  likedPosts: [], // 유저가 좋아요를 누른 게시물 ID 목록

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
      const { likedPosts } = get();
      const userLike = likedPosts.includes(postId);
      set({ post: { ...data, userLike }, isLoading: false }); // userLike 상태를 추가하여 post에 설정
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

  // 게시글 추가
  addPost: post => set(state => ({ posts: [...state.posts, post] })),

  // 기타 상태
  clearPosts: () => set({ posts: [] }),

  // 좋아요 관리
  likedPosts: [],

  toggleLike: async postId => {
    const { likedPosts } = get();
    const newLikedPosts = new Set(likedPosts);

    try {
      if (newLikedPosts.has(postId)) {
        newLikedPosts.delete(postId);
        await unlikePost(postId); // 좋아요 취소 요청
      } else {
        newLikedPosts.add(postId);
        await likePost(postId); // 좋아요 요청
      }

      set({ likedPosts: Array.from(newLikedPosts) });

      // post 상태가 존재하면, 그것을 업데이트하여 userLike를 최신 상태로 유지합니다.
      const post = get().post;
      if (post && post.id === postId) {
        set({
          post: {
            ...post,
            userLike: newLikedPosts.has(postId),
            likeCount: post.likeCount + (newLikedPosts.has(postId) ? 1 : -1),
          },
        });
      }
    } catch (error) {
      console.error('Failed to update like status:', error);
    }
  },

  initializeLikedPosts: async () => {
    try {
      const response = await fetchUserLikedPosts();
      if (Array.isArray(response)) {
        set({ likedPosts: response });
      } else {
        console.error('Unexpected response format:', response);
      }
    } catch (error) {
      console.error('Failed to initialize liked posts:', error);
    }
  },

  isPostLiked: postId => {
    const likedPosts = get().likedPosts;
    return likedPosts.includes(postId);
  },
}));

export default usePostStore;
