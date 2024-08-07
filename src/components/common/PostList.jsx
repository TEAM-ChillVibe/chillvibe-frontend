import { useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import PostListItem from '../common/ListItem/PostListItems';
import usePostStore from '../../store/usePostStore';

const PostList = ({ selectedHashtag, sortOrder }) => {
  const { posts, fetchAllPosts, fetchPostsByHashtagId, setSortOrder } =
    usePostStore();

  useEffect(() => {
    // Set sort order before fetching posts
    setSortOrder(sortOrder);

    // Fetch posts based on selected hashtag
    if (selectedHashtag) {
      fetchPostsByHashtagId(selectedHashtag);
    } else {
      fetchPosts();
    }
  }, [
    selectedHashtag,
    sortOrder,
    fetchPosts,
    fetchPostsByHashtagId,
    setSortOrder,
  ]);

  return (
    <Box sx={{ p: 2 }}>
      {posts.length > 0 ? (
        posts.map(post => <PostListItem key={post.id} post={post} />)
      ) : (
        <Typography>게시글이 없습니다.</Typography>
      )}
    </Box>
  );
};

export default PostList;
