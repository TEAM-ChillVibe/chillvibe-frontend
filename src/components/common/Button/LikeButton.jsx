import useLikeStore from '../../../store/useLikeStore';
import IconButton from '@mui/material/IconButton';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';

const LikeButton = ({ postId, initialLikeCount }) => {
  const { toggleLike, isPostLiked, initializeLikedPosts } = useLikeStore(
    state => ({
      toggleLike: state.toggleLike,
      isPostLiked: state.isPostLiked,
      initializeLikedPosts: state.initializeLikedPosts,
    }),
  );

  const [liked, setLiked] = useState(null);
  const [likeCount, setLikeCount] = useState(initialLikeCount);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await initializeLikedPosts();
        const isLiked = isPostLiked(postId);
        setLiked(isLiked); // 상태 설정
      } catch (error) {
        console.error('Failed to initialize liked posts:', error);
      }
    };

    fetchData();
  }, [initializeLikedPosts, isPostLiked, postId]);

  const handleLikeClick = async () => {
    try {
      await toggleLike(postId); // 상태 토글 및 서버 요청
      const isCurrentlyLiked = liked === false;
      setLiked(isCurrentlyLiked); // 상태 업데이트
      setLikeCount(prevCount =>
        isCurrentlyLiked ? prevCount + 1 : prevCount - 1,
      );
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  return (
    <Box display="flex" alignItems="center">
      <IconButton onClick={handleLikeClick} color={liked ? 'error' : 'default'}>
        {liked ? (
          <FavoriteIcon sx={{ fontSize: 14 }} />
        ) : (
          <FavoriteBorderIcon sx={{ fontSize: 14 }} />
        )}
      </IconButton>
      <Typography variant="body2">
        {likeCount ? likeCount.toLocaleString() : '0'}
      </Typography>
    </Box>
  );
};

export default LikeButton;
