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
      <Box sx={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
        <IconButton
          aria-label="play/pause"
          color="primary"
          onClick={handlePlayPause}
        >
          {isCurrentTrack && isPlaying ? (
            <Pause sx={{ fontSize: 30 }} />
          ) : (
            <PlayArrow sx={{ fontSize: 30 }} />
          )}
        </IconButton>
        <Avatar
          alt={name}
          src={thumbnailUrl}
          sx={{ width: 56, height: 56, borderRadius: 1 }}
        />
      </Box>
      <Box sx={{ flexGrow: 1, mx: 2, overflow: 'hidden' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
          <Typography
            variant="trackTitle"
            noWrap
            sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}
          >
            {name}
          </Typography>
          <Typography variant="trackArtist" noWrap>
            {artist}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
        <Typography variant="body2" sx={{ mr: 2 }}>
          {duration}
        </Typography>
        <Checkbox checked={isChecked} onChange={handleCheckboxChange} />
      </Box>
    </Box>
  );
}

export default TrackListEditItem;
