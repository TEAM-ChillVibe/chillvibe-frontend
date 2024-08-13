import {
  Avatar,
  Box,
  Card,
  CardContent,
  IconButton,
  keyframes,
  Slider,
  Typography,
} from '@mui/material';
import useMusicPlayerStore from '../../../store/useMusicPlayerStore';
import {
  Pause,
  PlayArrow,
  VolumeOff,
  VolumeUp,
  Close,
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
const ScrollingTypography = styled(Typography)(({ animate, width }) => ({
  display: 'block',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  animation: animate ? `${scrollLeft} 20s linear infinite` : 'none',
  transform: 'translateX(0)', // 초기 상태에서 텍스트가 보이도록 설정
  minWidth: '100%',
}));

const MusicPlayerFloating = () => {
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
    <Card
      sx={{
        position: 'fixed',
        bottom: 16, // 화면 하단에서 여유 공간
        left: '50%',
        transform: 'translateX(-50%)', // 수평 중앙 정렬
        boxShadow: 3,
        backgroundColor: '#1F1F1F',
        display: 'flex',
        flexDirection: 'column',
        width: '90%', // 카드 너비 조정
        maxWidth: 600, // 카드 최대 너비
        borderRadius: 2, // 카드 테두리 둥글게
      }}
    >
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          px: 2,
          pt: 3,
          '&:last-child': {
            paddingBottom: '16px', // 마지막 자식 요소의 패딩 조정
          },
        }}
      >
        {/* 앨범아트, 제목, 아티스트 */}
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            mb: 1,
            px: 1,
            alignItems: 'flex-start',
          }}
        >
          <Avatar
            src={currentTrack.thumbnailUrl}
            alt={currentTrack.name}
            sx={{ width: 64, height: 64, mr: 2, borderRadius: 1 }}
          />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              overflow: 'hidden',
              mt: 0.5,
            }}
          >
            <ScrollingTypography
              variant="subtitle1"
              ref={textRef}
              animate={isScrolling}
              sx={{
                overflow: 'hidden',
                mb: 0.5,
                flexGrow: 1,
              }}
            >
              {currentTrack.name}
            </ScrollingTypography>
            <Typography variant="caption" noWrap>
              {currentTrack.artist}
            </Typography>
          </Box>

          <IconButton onClick={stopPlayback} color="primary" size="small">
            <Close />
          </IconButton>
        </Box>

        {/* 재생 아이콘, 재생 바, 시간, 볼륨 조정 */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            mt: 1,
            flexDirection: 'row', // 가로로 나란히 배치
            justifyContent: 'space-between', // 요소 사이에 공간 분배
          }}
        >
          {/* 재생 아이콘, 재생 바, 시간 */}
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <IconButton onClick={togglePlay} color="primary">
              {isPlaying ? <Pause /> : <PlayArrow />}
            </IconButton>
            <Slider
              size="small"
              value={currentTime}
              max={duration}
              color="secondary"
              onChangeCommitted={(_, newValue) =>
                handleProgressChange(newValue)
              }
              sx={{ mx: 2, flexGrow: 1 }}
            />
            <Typography
              variant="caption"
              sx={{ textAlign: 'left', minWidth: '80px' }}
            >
              {formatTime(currentTime)} / {formatTime(duration)}
            </Typography>
          </Box>

          {/* 볼륨 조정 */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexShrink: 0,
              maxWidth: '200px',
              ml: 2,
            }}
          >
            <IconButton
              onClick={handleVolumeToggle}
              color="primary"
              size="small"
            >
              {isMuted ? <VolumeOff /> : <VolumeUp />}
            </IconButton>
            <Slider
              size="small"
              value={volume}
              max={1}
              step={0.01}
              color="secondary"
              onChange={(_, newValue) => handleVolumeChange(newValue)}
              sx={{ ml: 1, mr: 3, width: '60px' }}
            />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default MusicPlayerFloating;
