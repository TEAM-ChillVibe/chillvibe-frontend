import useMusicPlayerStore from '../../../store/useMusicPlayerStore';
import {
  AppBar,
  Avatar,
  Box,
  keyframes,
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
import { styled } from '@mui/material/styles';
import { useEffect, useRef, useState } from 'react';

// 시간을 MM:SS 형식으로 포맷
const formatTime = time => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

// 애니메이션 정의
const scrollLeft = keyframes`
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
`;

// 스크롤 애니메이션을 적용한 Typography 스타일 정의
const ScrollingTypography = styled(Typography)(({ theme, animate }) => ({
  display: 'block',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  animation: animate ? `${scrollLeft} 10s linear infinite` : 'none',
  minWidth: '100%', // 너비를 조정하여 스크롤 효과가 보이도록 설정
}));

const MusicPlayer = () => {
  // 텍스트 길이 측정
  const [isScrolling, setIsScrolling] = useState(false);
  const textRef = useRef(null);

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

  useEffect(() => {
    if (!currentTrack || !isVisible) {
      return;
    }

    const checkTextOverflow = () => {
      if (textRef.current) {
        setIsScrolling(
          textRef.current.scrollWidth > textRef.current.clientWidth,
        );
      }
    };

    checkTextOverflow();
    window.addEventListener('resize', checkTextOverflow);
    return () => window.removeEventListener('resize', checkTextOverflow);
  }, [currentTrack?.name, isVisible]);

  // 현재 트랙이 없거나 플레이어가 숨겨진 경우, 컴포넌트를 렌더링하지 않음
  if (!currentTrack || !isVisible) {
    return null;
  }

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
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexGrow: 1, // 이 영역이 가변적인 공간을 차지합니다.
            mr: 2,
          }}
        >
          <Avatar
            src={currentTrack.thumbnailUrl}
            alt={currentTrack.name}
            sx={{ width: 56, height: 56, mr: 2, borderRadius: 1 }}
          />
          <Box sx={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
            <ScrollingTypography
              variant="subtitle1"
              ref={textRef}
              animate={isScrolling}
              sx={{ overflow: 'hidden' }}
            >
              {currentTrack.name}
            </ScrollingTypography>
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
            flexGrow: 1, // 이 영역이 가변적인 공간을 차지합니다.
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
            flexShrink: 0, // 볼륨 영역은 줄어들 수 있습니다.
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
