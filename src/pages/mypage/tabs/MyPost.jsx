import { useEffect, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Pagination,
  Snackbar,
  Typography,
} from '@mui/material';
import MyPostListItem from '../../../components/common/ListItem/MyPostListItem';
import usePostStore from '../../../store/usePostStore';

// 페이지네이션 단위 고정값
const itemsPerPage = 10;

const MyPost = ({ user }) => {
  const { posts, loadPostsByUserId, isLoading, error } = usePostStore(
    state => ({
      posts: state.posts,
      loadPostsByUserId: state.loadPostsByUserId,
      isLoading: state.isLoading,
      error: state.error,
    }),
  );

  // 현재 페이지 관리
  const [page, setPage] = useState(1);

  // 스낵바 관리
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  // 에러 처리
  useEffect(() => {
    if (error) {
      setSnackbar({
        open: true,
        message: '데이터 로딩에 실패했습니다. 다시 시도해 주세요.',
        severity: 'error',
      });
    }
  }, [error]);

  // 데이터 로딩
  useEffect(() => {
    if (user && user.userId) {
      loadPostsByUserId(user.userId, page - 1, itemsPerPage);
    }
  }, [user, page, loadPostsByUserId]);

  // 페이지 핸들러
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  // 인덱스 계산
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPosts = posts.slice(startIndex, endIndex);
  const totalPages = Math.ceil(posts.length / itemsPerPage);

  return (
    <Box sx={{ width: '100%' }}>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="subtitleMypage">My Posts</Typography>
        <Button variant="contained" href="/new-post">
          새 게시글
        </Button>
      </Box>
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
        ) : posts.length === 0 ? (
          <Typography variant="body1" sx={{ textAlign: 'center', my: 15 }}>
            아직 게시물이 없습니다.
          </Typography>
        ) : (
          <>
            {currentPosts.map(post => (
              <MyPostListItem user={user} key={post.id} post={post} />
            ))}
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                color="primary"
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

export default MyPost;
