import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LikeButton from '../Button/LikeButton';
import { fetchHashtagsOfPost } from '../../../api/hashtag/hashtagApi';
import { formatDate } from '../../../utils/reusableFn';
import SingleHashtagChips from '../HashtagChips/SingleHashtagChips';

function MyPostListItem({ post }) {
  const {
    id,
    title,
    createdAt,
    trackCount,
    hashtags,
    likeCount,
    thumbnailUrl,
  } = post;
  const navigate = useNavigate();

  const handleNavigateToPost = () => {
    navigate(`/post/${id}`);
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
          py: 2,
          order: 2,
          alignItems: 'flex-start',
          justifyContent: 'space-between',
        }}
      >
        <Typography
          variant="trackTitle"
          onClick={handleNavigateToPost}
          sx={{ cursor: 'pointer' }}
          noWrap
        >
          {title}
        </Typography>
        <Typography variant="trackArtist">트랙 {trackCount}개</Typography>
        <SingleHashtagChips
          fetchHashtags={() => fetchHashtagsOfPost(post.id)}
          onChipClick={handleHashtagClick}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          my: 1,
          order: 3,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            height: '100%',
            py: 2,
          }}
        >
          <Typography variant="date">{formatDate(createdAt)}</Typography>
          <LikeButton postId={id} initialLikeCount={likeCount} />
        </Box>
      </Box>
    </Box>
  );
}

export default MyPostListItem;
