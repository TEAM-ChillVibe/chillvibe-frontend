import { axiosWithToken, axiosWithoutToken } from '../../axios';

// 모든 게시글 조회 (페이지네이션 지원)
export const fetchAllPosts = async (sortBy = 'latest', page = 0, size = 10) => {
  try {
    const response = await axiosWithoutToken.get('/api/posts', {
      params: { sortBy, page, size },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch all posts:', error);
    throw error;
  }
};

// 특정 게시글 상세 조회
export const fetchPostById = async postId => {
  try {
    const response = await axiosWithoutToken.get('/api/posts/${postId}');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch post by id:', error);
    throw error;
  }
};

// 특정 유저 게시글 조회 (페이지네이션 지원)
export const fetchPostsByUserId = async (userId, page = 0, size = 10) => {
  try {
    const response = await axiosWithoutToken.get('/api/posts/user/${userId}', {
      params: { page, size },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch posts by user id:', error);
    throw error;
  }
};

// 게시글 생성
export const createPost = async postCreateRequestDto => {
  try {
    const response = await axiosWithToken.post(
      '/api/posts',
      postCreateRequestDto,
    );
    return response.data;
  } catch (error) {
    console.error('Failed to create post:', error);
    throw error;
  }
};

// 게시글 수정
export const updatePost = async (postId, postUpdateRequestDto) => {
  try {
    const response = await axiosWithToken.put(
      '/api/posts/${postId}',
      postUpdateRequestDto,
    );
    return response.data;
  } catch (error) {
    console.error('Failed to update post:', error);
    throw error;
  }
};

// 게시글 삭제
export const deletePost = async postId => {
  try {
    const response = await axiosWithToken.delete('/api/posts/${postId}');
    return response.data;
  } catch (error) {
    console.error('Failed to delete post:', error);
    throw error;
  }
};

// 게시글 좋아요 추가
export const likePost = async postId => {
  try {
    const response = await axiosWithToken.post('/api/posts/like', null, {
      params: { postId },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to like post:', error);
    throw error;
  }
};

// 게시글 좋아요 취소
export const unlikePost = async postId => {
  try {
    const response = await axiosWithToken.delete('/api/posts/like', {
      params: { postId },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to unlike post:', error);
    throw error;
  }
};

// 특정 해시태그의 게시글 조회 (페이지네이션 지원)
export const fetchPostsByHashtagId = async (
  hashtagId,
  sortBy,
  page = 0,
  size = 10,
) => {
  try {
    const response = await axiosWithoutToken.get('/api/posts/hashtags', {
      params: { hashtagId, sortBy, page, size },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch posts by hashtag id:', error);
    throw error;
  }
};

// 게시글 검색 결과 조회 (페이지네이션 지원)
export const searchPosts = async (query, page = 0, size = 10) => {
  try {
    const response = await axiosWithoutToken.get('/api/posts/search', {
      params: { query, page, size },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to search posts:', error);
    throw error;
  }
};
