import { Box, Typography, Avatar } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import BaseContainer from '../../components/layout/BaseContainer';
import usePostStore from '../../store/usePostStore';
import HashtagChips from '../../components/common/HashtagChips';
import Comment from '../comment/Comment';

const PostDetail = () => {
  const { postId } = useParams();
  const { post, fetchPostById } = usePostStore();

  useEffect(() => {
    fetchPostById(postId);
  }, [postId, fetchPostById]);

  if (!post) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <BaseContainer>
      <Typography variant="h4">{post.title}</Typography>
      <Typography variant="body2" color="text.secondary">
        {new Date(post.createdAt).toLocaleString()}
      </Typography>
      <Typography variant="body1">{post.description}</Typography>
      <HashtagChips hashtags={post.hashtags} />

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6">트랙 리스트</Typography>
        {post.playlist.tracks.map((track, index) => (
          <Box
            key={index}
            sx={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <Typography>{track.title}</Typography>
            <Typography>{track.duration}</Typography>
          </Box>
        ))}
      </Box>

      <Box sx={{ mt: 4, display: 'flex', alignItems: 'center' }}>
        <Avatar src={post.user.avatar} alt={post.user.name} />
        <Box sx={{ ml: 2 }}>
          <Typography>{post.user.name}</Typography>
          <HashtagChips hashtags={post.user.hashtags} />
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6">Comments</Typography>
        <Comment postId={post.id} />
      </Box>
    </BaseContainer>
  );
};

export default PostDetail;
