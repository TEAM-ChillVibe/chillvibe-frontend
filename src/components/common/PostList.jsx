import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import usePostStore from '../../store/usePostStore';
import PostListItem from './ListItem/PostListItem';

const PostList = ({ selectedHashtag, sortOrder }) => {
  const {
    posts,
    isLoading,
    error,
    loadPosts,
    loadPostsByHashtagId,
    loadPostsByUserId,
  } = usePostStore();
  const [loading, setLoading] = useState(false);

  const loadPostsData = async () => {
    setLoading(true);
    try {
      if (selectedHashtag) {
        await loadPostsByHashtagId(selectedHashtag, sortOrder);
      } else {
        await loadPosts(sortOrder);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPostsData();
  }, [selectedHashtag, sortOrder]);

  return (
    <Box sx={{ width: '100%' }}>
      {posts.length > 0 ? (
        posts.map(post => <PostListItem key={post.id} post={post} />)
      ) : (
        <Typography>게시글이 없습니다.</Typography>
      )}
    </Box>
  );
};

export default PostList;
