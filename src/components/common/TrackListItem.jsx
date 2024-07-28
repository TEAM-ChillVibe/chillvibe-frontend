import { Box } from '@mui/material';

import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';

function TrackListItem({ music }) {
  const { title, artist, albumCover, duration } = music;

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', p: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
        <IconButton aria-label="play">
          <PlayArrowIcon sx={{ fontSize: 30 }} />
        </IconButton>
        <Avatar
          alt={title}
          src={albumCover}
          sx={{ width: 56, height: 56, mr: 2, borderRadius: 1 }}
        />
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant="subtitle1" noWrap>
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary" noWrap>
            {artist}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant="body2" sx={{ mr: 2 }}>
          {duration}
        </Typography>
        <IconButton aria-label="add to playlist">
          <PlaylistAddIcon />
        </IconButton>
      </Box>
    </Box>
  );
}

export default TrackListItem;
