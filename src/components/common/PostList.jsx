import { useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import usePostStore from '../../store/usePostStore';
import PostListItem from './ListItem/PostListItem';

const PostList = ({ fetchPosts, selectedHashtag, sortOrder }) => {
  // const [posts, setPosts] = useState([]);
  //
  // const loadPosts = async () => {
  //   try {
  //     const data = await fetchPosts(sortOrder, 0, 10);
  //     console.log('fetched: ', data);
  //     const postsArray = data.content || [];
  //     setPosts(postsArray);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  //
  // useEffect(() => {
  //   loadPosts();
  // }, [fetchPosts, sortOrder]);
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
        await loadPostsByHashtagId(selectedHashtag, 0, 10);
      } else {
        await loadPosts(sortOrder, 0, 10);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPostsData();
  }, [selectedHashtag, sortOrder, loadPosts, loadPostsByHashtagId]);

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
