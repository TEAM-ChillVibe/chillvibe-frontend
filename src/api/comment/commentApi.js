import { axiosWithToken, axiosWithoutToken } from '../../axios';

// 댓글 조회 (특정 게시글의 댓글)
export const getCommentsByPost = async postId => {
  try {
    const response = await axiosWithoutToken.get(`/api/comments/byPost`, {
      params: { postId },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching comments by post:', error);
    throw error;
  }
};

// 댓글 조회 (특정 사용자의 댓글)
export const getCommentsByUser = async userId => {
  try {
    const response = await axiosWithToken.get(`/api/comments/byUser`);
    return response.data;
  } catch (error) {
    console.error('Error fetching comments by user:', error);
    throw error;
  }
};

// 댓글 생성
export const createComment = async commentData => {
  try {
    const response = await axiosWithToken.post(`/api/comments`, commentData);
    return response.data;
  } catch (error) {
    console.error('Error creating comment:', error);
    throw error;
  }
};

// 댓글 수정
export const updateComment = async (commentId, commentData) => {
  try {
    const response = await axiosWithToken.put(
      `/api/comments/${commentId}`,
      commentData,
    );
    return response.data;
  } catch (error) {
    console.error('Error updating comment:', error);
    throw error;
  }
};

// 댓글 삭제
export const deleteComment = async commentId => {
  try {
    const response = await axiosWithToken.delete(`/api/comments/${commentId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting comment:', error);
    throw error;
  }
};
