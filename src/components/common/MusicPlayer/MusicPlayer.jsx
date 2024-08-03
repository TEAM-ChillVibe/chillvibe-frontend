import useMusicPlayerStore from '../../../store/useMusicPlayerStore';
import {
  AppBar,
  Avatar,
  Box,
  Slider,
  Toolbar,
  Typography,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import {
  ArrowDropDown,
  Pause,
  PlayArrow,
  VolumeOff,
  VolumeUp,
} from '@mui/icons-material';

// 시간을 MM:SS 형식으로 포맷
const formatTime = time => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

const MusicPlayer = () => {
  const {
    isPlaying,
    currentTrack,
    currentTime,
    duration,
    volume,
    isMuted,
    togglePlay,
    handleProgressChange,
    handleVolumeChange,
    handleVolumeToggle,
    stopPlayback,
    isVisible,
  } = useMusicPlayerStore();

  // 현재 트랙이 없거나 플레이어가 숨겨진 경우, 컴포넌트를 렌더링하지 않음
  if (!currentTrack || !isVisible) return null;

  return (
    <AppBar
      position="fixed"
      sx={{
        top: 'auto',
        bottom: 0,
        backgroundColor: '#000',
        px: '10%',
        py: theme => theme.spacing(1),
      }}
    >
      <Toolbar
        sx={{
          justifyContent: 'space-between',
          width: '100%',
          py: 1,
        }}
      >
        {/* 앨범아트, 제목, 아티스트*/}
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1, mr: 2 }}>
          <Avatar
            src={currentTrack.albumCover}
            alt={currentTrack.title}
            sx={{ width: 56, height: 56, mr: 2, borderRadius: 1 }}
          />
          <Box sx={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
            <Typography variant="subtitle1" noWrap sx={{ maxWidth: '200px' }}>
              {currentTrack.title}
            </Typography>
            <Typography variant="caption" noWrap sx={{ maxWidth: '200px' }}>
              {currentTrack.artist}
            </Typography>
          </Box>
        </Box>

        {/* 재생 아이콘, 재생 바, 시간 */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            flexGrow: 3,
            mx: 2,
            height: '100%',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
            <IconButton onClick={togglePlay} color="inherit">
              {isPlaying ? <Pause /> : <PlayArrow />}
            </IconButton>
            <Slider
              size="small"
              value={currentTime}
              max={duration}
              onChangeCommitted={(_, newValue) =>
                handleProgressChange(newValue)
              }
              sx={{ mx: 2, flexGrow: 1 }}
            />

            <Typography
              variant="caption"
              sx={{ minWidth: '70px', textAlign: 'left' }}
            >
              {formatTime(currentTime)} / {formatTime(duration)}
            </Typography>
          </Box>
        </Box>

        {/* 볼륨 조정 */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexGrow: 1,
            maxWidth: '200px',
            marginLeft: '10px',
          }}
        >
          <IconButton onClick={handleVolumeToggle} color="inherit">
            {isMuted ? <VolumeOff /> : <VolumeUp />}
          </IconButton>
          <Slider
            size="small"
            value={volume}
            max={1}
            step={0.01}
            onChange={(_, newValue) => handleVolumeChange(newValue)}
            sx={{ mx: 2, width: '60px' }}
          />
        </Box>
        <IconButton onClick={stopPlayback} color="inherit" sx={{ ml: 1 }}>
          <ArrowDropDown />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default MusicPlayer;
