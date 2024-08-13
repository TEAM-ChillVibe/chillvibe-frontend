import { Box, Typography } from '@mui/material';
import albumSample from '../albumSample.jpeg';
import SingleHashtagChips from '../HashtagChips/SingleHashtagChips';
import { useNavigate } from 'react-router-dom';
import { fetchHashtagsOfPost } from '../../../api/hashtag/hashtagApi';

function PostListItemMini({ post }) {
  const { id, title, user, thumbnailUrl } = post;
  const navigate = useNavigate();

  const handlePostClick = () => {
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
        sx={{
          cursor: 'pointer',
          width: 80,
          height: 80,
          mr: 2,
          borderRadius: 1,
          overflow: 'hidden',
          order: 1,
        }}
        onClick={handlePostClick}
      >
        <img
          src={thumbnailUrl || albumSample} // 썸네일 URL이 없으면 기본 이미지 사용
          alt={'Thumbnail'}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          order: 2,
          alignItems: 'flex-start',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="trackTitle" component="div" noWrap>
          {title}
        </Typography>
        <Typography variant="trackArtist" sx={{ mb: 0.5 }}>
          {user.nickname}
        </Typography>
        <SingleHashtagChips
          fetchHashtags={() => fetchHashtagsOfPost(id)}
          onChipClick={handleHashtagClick}
        />
      </Box>
    </Box>
  );
}

export default PostListItemMini;
