import { useEffect, useState } from 'react';
import { Box, Pagination, Typography } from '@mui/material';
import PostListItem from '../../../components/common/ListItem/PostListItem';
import usePostStore from '../../../store/usePostStore';
import useLikeStore from '../../../store/useLikeStore';
import { fetchMyLikedPosts } from '../../../api/post/postApi';

const itemsPerPage = 6;

const MyLikedPost = () => {
  // Pagination
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const [likedPosts, setLikedPosts] = useState([]);

  useEffect(() => {
    const loadLikedPosts = async () => {
      try {
        const response = await fetchMyLikedPosts(page - 1, itemsPerPage);
        console.log('fetched:::', response);
        setLikedPosts(response.content);
        setTotalPages(response.totalPages);
      } catch (error) {
        console.error('failed to fetch', error);
      }
    };
    loadLikedPosts();
  }, [page]);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  // Calculate the indices of the items to display
  // const startIndex = (page - 1) * itemsPerPage;
  // const endIndex = startIndex + itemsPerPage;
  // const currentPosts = likedPosts.slice(startIndex, endIndex);

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
        {likedPosts.length === 0 ? (
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
                count={Math.ceil(likedPosts.length / itemsPerPage)}
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

export default MyLikedPost;
