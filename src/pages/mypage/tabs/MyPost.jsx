import { useEffect, useState } from 'react';
import { Box, Button, Pagination, Typography } from '@mui/material';
import MyPostListItem from '../../../components/common/ListItem/MyPostListItem';
import usePostStore from '../../../store/usePostStore';

// 페이지네이션 단위 고정값
const itemsPerPage = 6;

const MyPost = ({ user }) => {
  const { posts, loadPostsByUserId, isLoading, error } = usePostStore(
    state => ({
      posts: state.posts,
      loadPostsByUserId: state.loadPostsByUserId,
      isLoading: state.isLoading,
      error: state.error,
    }),
  );

  // Pagination
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (user && user.userId) {
      loadPostsByUserId(user.userId, page - 1, itemsPerPage);
    }
  }, [user, page, loadPostsByUserId]);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  // Calculate the indices of the items to display
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPosts = posts.slice(startIndex, endIndex);

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
        {posts.length === 0 ? (
          <Typography variant="body1" sx={{ textAlign: 'center', my: 15 }}>
            아직 게시물이 없습니다.
          </Typography>
        ) : (
          <>
            {posts.map(post => (
              <MyPostListItem key={post.id} post={post} />
            ))}
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Pagination
                count={Math.ceil(posts.length / itemsPerPage)}
                page={page}
                onChange={handlePageChange}
                // color="primary"
              />
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

export default MyPost;
