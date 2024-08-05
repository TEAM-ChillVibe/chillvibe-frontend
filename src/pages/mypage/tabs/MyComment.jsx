import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Typography, Box, Avatar, Pagination } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const CommentSectionWrapper = styled(Box)`
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  margin-top: 20px;
  color: #000;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  max-width: 1200px;
`;

const CommentWrapper = styled(Box)`
  background-color: #f5f5f5;
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 10px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

const CommentDetails = styled(Box)`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const CommentHeader = styled(Box)`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const CommentAuthor = styled(Typography)`
  font-size: 18px;
  font-weight: bold;
  margin-top: 5px;
  color: #000;
`;

const CommentDate = styled(Typography)`
  font-size: 12px;
  color: #888;
  margin-top: 4px;
`;

const CommentContent = styled(Typography)`
  font-size: 15px;
  line-height: 1.5;
  color: #000;
`;

const PostInfo = styled(Box)`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const PostAuthor = styled(Typography)`
  font-size: 16px;
  color: #888;
  margin-left: 5px;
`;

const PostImage = styled.img`
  width: 100px; /* 이미지 크기를 조정 */
  height: 100px;
  border-radius: 8px; /* 사각형 모양 */
  object-fit: cover;
  margin-left: 15px; /* 간격 조정 */
`;

const MyComment = () => {
  const [comments, setComments] = useState([]);
  const [userId] = useState(1); // 하드코딩된 userId를 사용
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;
  const navigate = useNavigate();

  const token =
    'eyJhbGciOiJIUzI1NiJ9.eyJjYXRlZ29yeSI6ImFjY2VzcyIsInN1YiI6IjEiLCJlbWFpbCI6InRlc3RAZXhhbXBsZS5jb20iLCJpYXQiOjE3MjI4NDc0MzksImV4cCI6MTcyMjg0OTU5OX0.PTvI0UCShW33TuuyvhfiLptrB7myzB8NjmGQnVskOoA';

  useEffect(() => {
    // const token = localStorage.getItem('authToken');

    axios
      .get(`http://localhost:8080/api/comments/byUser?userId=${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        console.log('API Response:', response.data); // API 응답을 콘솔에 출력
        setComments(response.data);
      })
      .catch(error => console.error('Error fetching comments:', error));
  }, [userId]);

  console.log('Rendered Comments:', comments); // 렌더링된 댓글을 콘솔에 출력

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
      <CommentSectionWrapper>
        {comments.length === 0 ? (
          <Typography variant="body1" sx={{ textAlign: 'center', my: 15 }}>
            아직 작성된 댓글이 없습니다.
          </Typography>
        ) : (
          <>
            {currentComments.map(comment => (
              <CommentWrapper
                key={comment.id}
                onClick={() => handleCommentClick(comment.postId)}
              >
                <CommentDetails>
                  <CommentHeader>
                    <CommentAuthor>{comment.postTitle}</CommentAuthor>
                  </CommentHeader>
                  <PostInfo>
                    <Avatar
                      src={comment.postAuthorProfileUrl}
                      alt={comment.postAuthor}
                      sx={{ width: 24, height: 24 }}
                    />
                    <PostAuthor>{comment.postAuthor}</PostAuthor>
                  </PostInfo>
                  <CommentContent>{comment.content}</CommentContent>
                  <CommentDate>
                    {new Date(comment.modifiedAt).toLocaleString()}
                    {comment.createdAt !== comment.modifiedAt && (
                      <span style={{ marginLeft: '10px', color: '#888' }}>
                        수정됨
                      </span>
                    )}
                  </CommentDate>
                </CommentDetails>
                <PostImage
                  src={comment.postTitleImageUrl}
                  alt={comment.postTitle}
                />
              </CommentWrapper>
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
      </CommentSectionWrapper>
    </Box>
  );
};

export default MyComment;
