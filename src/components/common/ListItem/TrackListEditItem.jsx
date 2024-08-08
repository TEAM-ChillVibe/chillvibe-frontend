import { Box, Checkbox } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import useMusicPlayerStore from '../../../store/useMusicPlayerStore';
import { Pause, PlayArrow } from '@mui/icons-material';

function TrackListEditItem({ music, onSelect, isChecked }) {
  const { name, artist, thumbnailUrl, duration, previewUrl } = music;

  const { isPlaying, currentTrack, playTrack, togglePlay } =
    useMusicPlayerStore();

  const isCurrentTrack = currentTrack && currentTrack.previewUrl === previewUrl;

  const handlePlayPause = () => {
    if (isCurrentTrack) {
      togglePlay();
    } else {
      playTrack(music);
    }
  };

  const handleCheckboxChange = () => {
    onSelect(music);
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
          alt={name}
          src={thumbnailUrl}
          sx={{ width: 56, height: 56, mr: 2, borderRadius: 1 }}
        />
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant="subtitle1" noWrap>
            {name}
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
        <Checkbox checked={isChecked} onChange={handleCheckboxChange} />
      </Box>
    </Box>
  );
}

export default TrackListEditItem;
