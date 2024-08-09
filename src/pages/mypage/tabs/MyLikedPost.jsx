import { useEffect, useState } from 'react';
import {
  Alert,
  Box,
  CircularProgress,
  Pagination,
  Snackbar,
  Typography,
} from '@mui/material';
import PostListItem from '../../../components/common/ListItem/PostListItem';
import usePostStore from '../../../store/usePostStore';
import useLikeStore from '../../../store/useLikeStore';
import { fetchMyLikedPosts } from '../../../api/post/postApi';

// 페이지네이션 단위 고정값
const itemsPerPage = 10;

const MyLikedPost = () => {
  // 페이지
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  // 좋아요 한 포스트 리스트
  const [likedPosts, setLikedPosts] = useState([]);
  // 로딩
  const [isLoading, setIsLoading] = useState(false);
  // 스낵바
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  // 포스트 데이터 로드
  useEffect(() => {
    const loadLikedPosts = async () => {
      setIsLoading(true);
      try {
        const response = await fetchMyLikedPosts(page - 1, itemsPerPage);
        console.log('fetched:::', response);
        setLikedPosts(response.content);
        setTotalPages(response.totalPages);
      } catch (error) {
        setSnackbar({
          open: true,
          message:
            '좋아요한 게시물을 가져오는 데 실패했습니다. 다시 시도해 주세요.',
          severity: 'error',
        });
      } finally {
        setIsLoading(false);
      }
    };
    loadLikedPosts();
  }, [page]);

  // 페이지 핸들러
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box
        sx={{
          width: '100%',
        }}
      >
        <Typography variant="subtitleMypage">Liked Posts</Typography>
      </Box>
      <Box sx={{ width: '100%', my: 2 }}>
        {isLoading ? (
          <CircularProgress color="secondary" />
        ) : likedPosts.length === 0 ? (
          <Typography variant="body1" sx={{ textAlign: 'center', my: 15 }}>
            아직 좋아요 한 게시물이 없습니다.
          </Typography>
        ) : (
          <>
            {likedPosts.map(post => (
              <PostListItem key={post.id} post={post} />
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

export default MyLikedPost;
