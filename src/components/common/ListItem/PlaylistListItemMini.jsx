import { Box, Typography } from '@mui/material';
import albumSample from '../albumSample.jpeg';

function PlaylistListItemMini({ playlist }) {
  const { title, imageUrl, trackCount } = playlist;

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
          alt={'title'}
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
          gap: 1,
        }}
      >
        <Typography variant="subtitle1" component="div" noWrap>
          {title}
        </Typography>
        <Typography variant="body2">트랙 {trackCount}개</Typography>
      </Box>
    </Box>
  );
}

export default PlaylistListItemMini;
