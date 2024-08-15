import IconButton from '@mui/material/IconButton';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import usePostStore from '../../../store/usePostStore';
import useUserStore from '../../../store/useUserStore'; // ✔️ 로그인 상태 확인을 위한 훅 추가
import { useNavigate } from 'react-router-dom'; // ✔️ 페이지 이동을 위한 훅 추가

const LikeButton = ({ postId, initialLikeCount, userLike }) => {
  const [liked, setLiked] = useState(userLike); // ✔️ 초기 상태를 userLike로 설정
  const { toggleLike, isPostLiked, initializeLikedPosts } = usePostStore(
    state => ({
      toggleLike: state.toggleLike,
      isPostLiked: state.isPostLiked,
      initializeLikedPosts: state.initializeLikedPosts,
    }),
  );

  const { isAuthenticated } = useUserStore(); // ✔️ 로그인 여부 확인
  const navigate = useNavigate();

  const [likeCount, setLikeCount] = useState(initialLikeCount);

  useEffect(() => {
    console.log(`Component mounted for postId: ${postId}`);
    const fetchData = async () => {
      try {
        await initializeLikedPosts();
        const isLiked = isPostLiked(postId);
        console.log('Fetched isLiked state:', isLiked); // ✔️ 로그 추가
        setLiked(isLiked); // 상태 설정
      } catch (error) {
        console.error('Failed to initialize liked posts:', error);
      }
    };

    fetchData();
  }, [initializeLikedPosts, isPostLiked, postId]);

  const handleLikeClick = async () => {
    if (!isAuthenticated) {
      // ✔️ 비로그인 상태일 경우 로그인 페이지로 이동
      console.log('User not authenticated, redirecting to login');
      navigate('/login');
      return;
    }

    try {
      console.log(
        `Toggling like for postId: ${postId}, current liked status: ${liked}`,
      );
      await toggleLike(postId); // 상태 토글 및 서버 요청
      // const isCurrentlyLiked = !liked; // 현재 상태를 반대로 토글
      const isCurrentlyLiked = liked === false;
      console.log(`Post ${postId} new liked status: ${isCurrentlyLiked}`);
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
      <IconButton
        onClick={handleLikeClick}
        color={userLike || liked ? 'error' : 'default'}
      >
        {userLike || liked ? (
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
