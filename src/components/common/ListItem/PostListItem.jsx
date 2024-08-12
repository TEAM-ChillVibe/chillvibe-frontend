import { Avatar, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { fetchHashtagsOfPost } from '../../../api/hashtag/hashtagApi';
import { formatRelativeTime } from '../../../utils/reusableFn';
import LikeButton from '../Button/LikeButton';
import { useEffect } from 'react';
import usePostStore from '../../../store/usePostStore';
import SingleHashtagChips from '../HashtagChips/SingleHashtagChips';

function PostListItem({ post, selectedHashtag }) {
  const { id, title, createdAt, trackCount, user, likeCount, thumbnailUrl } =
    post;
  const navigate = useNavigate();

  const { initializeLikedPosts } = usePostStore(state => ({
    initializeLikedPosts: state.initializeLikedPosts,
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
        flexWrap: 'wrap',
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
          order: 1,
          cursor: 'pointer',
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
          order: 2,
          alignItems: 'flex-start',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant="subtitle1"
          onClick={handleNavigateToPost}
          sx={{ cursor: 'pointer' }}
          noWrap
        >
          {title}
        </Typography>
        <Typography variant="body3" color="text.secondary" sx={{ mb: 1 }}>
          {formatRelativeTime(createdAt)}
        </Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>
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
          justifyContent: 'space-between',
          mt: 0.5,
          order: 3,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Box
            onClick={handleNavigateToUserPage}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              cursor: 'pointer',
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
        </Box>
        <LikeButton postId={id} initialLikeCount={likeCount} />
      </Box>
    </Box>
  );
}

export default PostListItem;
