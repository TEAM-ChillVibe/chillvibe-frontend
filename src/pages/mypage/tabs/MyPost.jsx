import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Pagination,
  Typography,
} from '@mui/material';
import MyPostListItem from '../../../components/common/ListItem/MyPostListItem';
import { fetchPostsByUserId } from '../../../api/post/postApi';
import SnackbarAlert from '../../../components/common/Alert/SnackbarAlert';
import { DriveFileRenameOutline } from '@mui/icons-material';

// 페이지네이션 단위 고정값
const itemsPerPage = 5;

const MyPost = ({ user }) => {
  // 로딩할 포스트 관리
  const [posts, setPosts] = useState([]);
  // 로딩 상태 관리
  const [isLoading, setIsLoading] = useState(false);
  // 스낵바 관리
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });
  // 페이지 관리
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  // 페이지 로딩
  useEffect(() => {
    const fetchposts = async () => {
      setIsLoading(true);
      try {
        const data = await fetchPostsByUserId(
          user.userId,
          'latest',
          page - 1,
          itemsPerPage,
        );
        setPosts(data.content);
        setTotalPages(data.page.totalPages);
      } catch (error) {
        setSnackbar({
          open: true,
          message: '내 게시글 로딩에 실패했습니다. 다시 시도해 주세요.',
          severity: 'error',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchposts();
  }, [user.userId, page]);

  // 페이지 핸들러
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

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
        <Button
          variant="contained"
          startIcon={<DriveFileRenameOutline />}
          size="small"
          href="/new-post"
        >
          새 글 작성
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
            {posts.map(post => (
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

      <SnackbarAlert
        open={snackbar.open}
        onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
        message={snackbar.message}
        severity={snackbar.severity}
      />
    </Box>
  );
};

export default MyPost;
