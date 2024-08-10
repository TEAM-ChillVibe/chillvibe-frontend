import { Box, Typography } from '@mui/material';
import albumSample from '../albumSample.jpeg';
import HashtagChips from '../HashtagChips';
import { fetchHashtagsOfPost } from '../../../api/hashtag/hashtagApi';
import { useNavigate } from 'react-router-dom';

function PostListItemMini({ post }) {
  const { id, title, user, thumbnailUrl } = post;
  const navigate = useNavigate();

  const handleChipClick = () => {
    navigate(`/all-tags/`);
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
          width: 80,
          height: 80,
          mr: 2,
          borderRadius: 1,
          overflow: 'hidden',
          order: 1,
        }}
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
          justifyContent: 'center',
        }}
      >
        <Typography variant="subtitle1" component="div" noWrap>
          {title}
        </Typography>
        <Typography variant="body2">{user.nickname}</Typography>
        <HashtagChips
          fetchHashtags={() => fetchHashtagsOfPost(id)}
          onChipClick={handleChipClick}
        />
      </Box>
    </Box>
  );
}

export default PostListItemMini;
