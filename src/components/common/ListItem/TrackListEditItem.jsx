import { Box, Checkbox } from '@mui/material';

import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import useMusicPlayerStore from '../../../store/useMusicPlayerStore';
import { Pause, PlayArrow, PlaylistAdd } from '@mui/icons-material';
import { useState } from 'react';

function TrackListEditItem({ music }) {
  const { title, artist, albumCover, duration, audioSrc } = music;

  // 뮤직플레이어 상태관리
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

  // 체크박스 상태관리
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(prev => !prev);
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
        <Checkbox checked={isChecked} onChange={handleCheckboxChange} />
      </Box>
    </Box>
  );
}

export default TrackListEditItem;
