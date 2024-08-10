import React, { useState, useEffect } from 'react';
import {
  Typography,
  Box,
  Avatar,
  Pagination,
  CircularProgress,
  Snackbar,
  Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getCommentsByUser } from '../../../api/comment/commentApi';
import { formatDate } from '../../../utils/reusableFn';

// 페이지네이션 단위 고정값
const itemsPerPage = 10;

const MyComment = () => {
  // 페이지 이동
  const navigate = useNavigate();
  // 댓글
  const [comments, setComments] = useState([]);
  // 페이지
  const [page, setPage] = useState(1);
  // 로딩
  const [isLoading, setIsLoading] = useState(false);
  // 스낵바
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  // 댓글 데이터 로딩
  useEffect(() => {
    const fetchComments = async () => {
      setIsLoading(true);
      try {
        const data = await getCommentsByUser(); // userId는 axiosWithToken에서 자동으로 처리
        setComments(data);
      } catch (error) {
        setSnackbar({
          open: true,
          message: '댓글을 가져오는 데 실패했습니다. 다시 시도해 주세요.',
          severity: 'error',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchComments();
  }, []);

  // 페이지 핸들러
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  // 댓글 클릭 핸들러
  const handleCommentClick = postId => {
    navigate(`/post/${postId}`); // 해당 게시글 페이지로 이동
  };

  // 페이지 인덱스 계산
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentComments = comments.slice(startIndex, endIndex);
  const totalPages = Math.ceil(comments.length / itemsPerPage);

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="subtitleMypage" sx={{ marginBottom: 2 }}>
        Comments
      </Typography>
      <Box sx={{ width: '100%', my: 2 }}>
        {isLoading ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              py: 10,
            }}
          >
            <CircularProgress color="secondary" />
          </Box>
        ) : comments.length === 0 ? (
          <Typography variant="body1" sx={{ textAlign: 'center', my: 15 }}>
            아직 작성된 댓글이 없습니다.
          </Typography>
        ) : (
          <>
            {currentComments.map(comment => (
              <Box
                key={comment.id}
                sx={{
                  py: 2.5,
                  width: '100%',
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
                      sx={{ width: 20, height: 20 }}
                    />
                    <Typography variant="body2" sx={{ marginLeft: 1 }}>
                      {comment.postAuthor}
                    </Typography>
                  </Box>
                  <Typography variant="body1">{comment.content}</Typography>
                  <Typography variant="caption" sx={{ color: '#888' }}>
                    {formatDate(comment.modifiedAt)}
                    {comment.createdAt !== comment.modifiedAt && (
                      <span style={{ marginLeft: '10px', color: '#888' }}>
                        수정됨
                      </span>
                    )}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    width: 120,
                    height: 120,
                    ml: 2,
                    borderRadius: 2,
                    overflow: 'hidden',
                  }}
                >
                  <img
                    src={comment.postTitleImageUrl}
                    alt={comment.postTitle}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      p: 2,
                    }}
                  />
                </Box>
              </Box>
            ))}
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
              />
            </Box>
          </>
        )}
      </Box>

      <Snackbar
        open={snackbar.open}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        autoHideDuration={6000}
        onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
      >
        <Alert
          onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
          severity={snackbar.severity}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default MyComment;
