import { Box, Chip, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import albumSample from '../albumSample.jpeg';
import { useNavigate } from 'react-router-dom';

function MyPostListItem({ post }) {
  const { id, title, createdAt, trackCount, hashtags, likes } = post;
  const navigate = useNavigate();

  const handleNavigateToPost = () => {
    navigate(`/post/${id}`);
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
          src={albumSample}
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
        <Typography variant="body2" sx={{ mb: 1 }}>
          트랙 {trackCount}개
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {hashtags.map(hashtags => (
            <Chip key={hashtags} label={hashtags} size="small" />
          ))}
        </Box>
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
            justifyContent: 'center',
            mb: 1,
            height: '100%',
          }}
        >
          <Typography variant="body3" color="text.secondary" sx={{ mb: 2 }}>
            {createdAt}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <FavoriteIcon sx={{ fontSize: 14, mr: 0.5 }} />
            <Typography variant="body2">{likes.toLocaleString()}</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default MyPostListItem;