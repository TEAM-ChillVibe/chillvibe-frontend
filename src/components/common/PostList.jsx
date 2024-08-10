import { useEffect, useState } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import usePostStore from '../../store/usePostStore';
import PostListItem from './ListItem/PostListItem';
import { fetchPostsByHashtagId } from '../../api/post/postApi';

const PostList = ({ selectedHashtag, sortOrder }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const data = await fetchPostsByHashtagId(selectedHashtag, sortOrder);
        setPosts(data.content);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (selectedHashtag) {
      fetchPosts();
    }
  }, [selectedHashtag, sortOrder]);

  return (
    <Box sx={{ width: '100%' }}>
      {loading ? (
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
      ) : posts.length > 0 ? (
        posts.map(post => <PostListItem key={post.id} post={post} />)
      ) : (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            py: 10,
          }}
        >
          <Typography>게시글이 없습니다.</Typography>
        </Box>
      )}
    </Box>
  );
};

export default PostList;
