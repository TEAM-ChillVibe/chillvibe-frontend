import { Box, Chip, Typography } from '@mui/material';
import albumSample from '../albumSample.jpeg';

function PostListItemMini({ post }) {
  const { title, hashtags, user } = post;

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
          order: 2,

          alignItems: 'flex-start',
          justifyContent: 'center',
        }}
      >
        <Typography variant="subtitle1" component="div" noWrap>
          {title}
        </Typography>
        <Typography variant="body2">{user.name}</Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 0.5 }}>
          {hashtags.map(hashtags => (
            <Chip key={hashtags} label={hashtags} size="small" />
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default PostListItemMini;
