import { axiosWithToken, axiosWithoutToken } from '../../axios';

// 모든 해시태그 조회
export const fetchAllHashtags = async () => {
  try {
    const response = await axiosWithoutToken.get('/api/hashtags/all');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch all hashtags:', error);
    throw error;
  }
};

// 인기 해시태그 조회 (페이지네이션 지원)
export const fetchPopularHashtags = async (page = 0, size = 10) => {
  try {
    const response = await axiosWithoutToken.get('/api/hashtags/popular', {
      params: { page, size },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch popular hashtags:', error);
    throw error;
  }
};

// 특정 게시글의 해시태그 조회
export const fetchHashtagsOfPost = async postId => {
  try {
    const response = await axiosWithoutToken.get('/api/hashtags', {
      params: { postId },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch hashtags of post:', error);
    throw error;
  }
};

// 특정 사용자의 프로필 해시태그 조회
export const fetchHashtagsOfUser = async userId => {
  try {
    const response = await axiosWithoutToken.get('/api/hashtags', {
      params: { userId },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch hashtags of user:', error);
    throw error;
  }
};

// 해시태그 업데이트 (사용자 또는 게시글)
export const updateHashtags = async ({ userId, postId, hashtagIds }) => {
  try {
    const response = await axiosWithToken.put('/api/hashtags', {
      userId,
      postId,
      hashtagIds,
    });
    return response;
  } catch (error) {
    console.error('Failed to update hashtags:', error);
    throw error;
  }
};
