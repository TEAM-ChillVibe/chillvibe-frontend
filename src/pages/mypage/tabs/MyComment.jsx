import React, { useState, useEffect } from 'react';
import { Typography, Box, Avatar, Pagination, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getCommentsByUser } from '../../../api/comment/commentApi';

const MyComment = () => {
  const [comments, setComments] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const data = await getCommentsByUser(); // userId는 axiosWithToken에서 자동으로 처리
        setComments(data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, []);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleCommentClick = postId => {
    navigate(`/api/posts/${postId}`); // 해당 게시글 페이지로 이동
  };

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentComments = comments.slice(startIndex, endIndex);

  return (
    <Box sx={{ width: '100%' }}>
      <Box
        sx={{
          width: '100%',
        }}
      >
        <Typography variant="subtitleMypage" sx={{ marginBottom: 2 }}>
          Comments
        </Typography>
      </Box>
      <Box
        sx={{
          backgroundColor: '#fff',
          padding: 2,
          borderRadius: 2,
          marginTop: 2,
          color: '#000',
          width: '100%',
          marginLeft: 'auto',
          marginRight: 'auto',
          maxWidth: 1200,
        }}
      >
        {comments.length === 0 ? (
          <Typography variant="body1" sx={{ textAlign: 'center', my: 15 }}>
            아직 작성된 댓글이 없습니다.
          </Typography>
        ) : (
          <>
            {currentComments.map(comment => (
              <Box
                key={comment.id}
                sx={{
                  backgroundColor: '#f5f5f5',
                  padding: 2,
                  borderRadius: 1,
                  marginBottom: 2,
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                }}
                onClick={() => handleCommentClick(comment.postId)}
              >
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" sx={{ marginBottom: 1 }}>
                    {comment.postTitle}
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      marginBottom: 1,
                    }}
                  >
                    <Avatar
                      src={comment.postAuthorProfileUrl}
                      sx={{ width: 23, height: 23 }}
                    />
                    <Typography
                      variant="body2"
                      sx={{ marginLeft: 0.5, color: '#888' }}
                    >
                      {comment.postAuthor}
                    </Typography>
                  </Box>
                  <Typography variant="body1">{comment.content}</Typography>
                  <Typography variant="caption" sx={{ color: '#888' }}>
                    {new Date(comment.modifiedAt).toLocaleString()}
                    {comment.createdAt !== comment.modifiedAt && (
                      <span style={{ marginLeft: '10px', color: '#888' }}>
                        수정됨
                      </span>
                    )}
                  </Typography>
                </Box>
                <Box>
                  <img
                    src={comment.postTitleImageUrl}
                    alt={comment.postTitle}
                    style={{
                      width: 100,
                      height: 100,
                      borderRadius: 8,
                      objectFit: 'cover',
                      marginLeft: 15,
                    }}
                  />
                </Box>
              </Box>
            ))}
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Pagination
                count={Math.ceil(comments.length / itemsPerPage)}
                page={page}
                onChange={handlePageChange}
              />
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

export default MyComment;
