import { Box } from '@mui/material';

import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import useMusicPlayerStore from '../../../store/useMusicPlayerStore';
import { Pause, PlayArrow, PlaylistAdd } from '@mui/icons-material';

function TrackListItem({ music }) {
  const { title, artist, albumCover, duration, audioSrc } = music;

  const { isPlaying, currentTrack, playTrack, togglePlay } =
    useMusicPlayerStore();

  const isCurrentTrack = currentTrack && currentTrack.audioSrc === audioSrc;

  const handlePlayPause = () => {
    if (isCurrentTrack) {
      togglePlay();
    } else {
      playTrack(music);
    }
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', p: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
        <IconButton aria-label="play/pause" onClick={handlePlayPause}>
          {isCurrentTrack && isPlaying ? (
            <Pause sx={{ fontSize: 30 }} />
          ) : (
            <PlayArrow sx={{ fontSize: 30 }} />
          )}
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
          <PlaylistAdd />
        </IconButton>
      </Box>
    </Box>
  );
}

export default TrackListItem;
