import { Avatar, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { fetchHashtagsOfPost } from '../../../api/hashtag/hashtagApi';
import { formatRelativeTime } from '../../../utils/reusableFn';
import LikeButton from '../Button/LikeButton';
import { useEffect } from 'react';
import usePostStore from '../../../store/usePostStore';
import SingleHashtagChips from '../HashtagChips/SingleHashtagChips';
import ModeCommentIcon from '@mui/icons-material/ModeComment';

function PostListItem({ post, selectedHashtag }) {
  const {
    id,
    title,
    createdAt,
    trackCount,
    user,
    likeCount,
    thumbnailUrl,
    commentCount,
  } = post;
  const navigate = useNavigate();

  // ✔️ 여기서 likedPosts 상태를 가져옵니다.
  const { initializeLikedPosts, likedPosts } = usePostStore(state => ({
    initializeLikedPosts: state.initializeLikedPosts,
    likedPosts: state.likedPosts,
  }));

  useEffect(() => {
    initializeLikedPosts(); // 좋아요 목록 초기화
  }, [initializeLikedPosts]);

  const handleNavigateToPost = () => {
    navigate(`/post/${id}`);
  };

  const handleNavigateToUserPage = () => {
    navigate(`/user/${user.id}`);
  };

  const handleHashtagClick = hashtag => {
    navigate(`/all-tags?hashtag=${hashtag.id}`);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        py: 2,
        my: 1,
        alignItems: 'center',
      }}
    >
      <Box
        onClick={handleNavigateToPost}
        sx={{
          width: 120,
          height: 120,
          mr: 2,
          borderRadius: 1,
          overflow: 'hidden',
          cursor: 'pointer',
          flexShrink: 0,
        }}
      >
        {/* 이미지 소스 수정 필요 */}
        <img
          src={thumbnailUrl}
          alt={'Track img'}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          py: 0.5,
          alignItems: 'flex-start',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant="trackTitle"
          onClick={handleNavigateToPost}
          sx={{
            cursor: 'pointer',
            whiteSpace: 'normal',
            overflowWrap: 'break-word',
          }}
        >
          {title}
        </Typography>
        <Typography variant="date" sx={{ my: 0.5 }}>
          {formatRelativeTime(createdAt)}
        </Typography>
        <Typography variant="trackArtist" sx={{ mb: 1 }}>
          트랙 {trackCount}개
        </Typography>
        <SingleHashtagChips
          fetchHashtags={() => fetchHashtagsOfPost(id)}
          onChipClick={handleHashtagClick}
          selectedHashtag={selectedHashtag}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
        }}
      >
        <Box
          onClick={handleNavigateToUserPage}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            cursor: 'pointer',
            mb: 2,
          }}
        >
          <Avatar
            alt={user.nickname || 'Unknown User'}
            src={user.profileUrl || ''}
            sx={{ width: 32, height: 32, mb: 1 }}
          />
          <Typography variant="body2">
            {user.nickname || 'Unknown User'}
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <LikeButton
            postId={id}
            initialLikeCount={likeCount}
            userLike={likedPosts.includes(id)} // ✔️ likedPosts를 사용하여 userLike 전달
          />
          <Box display="flex" alignItems="center">
            <ModeCommentIcon sx={{ fontSize: 14, mr: 1 }} />
            <Typography variant="body2">{commentCount}</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default PostListItem;
