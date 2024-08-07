import create from 'zustand';
import { fetchUserLikedPosts, likePost, unlikePost } from '../api/post/postApi';

const useLikeStore = create((set, get) => ({
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

export default useLikeStore;
