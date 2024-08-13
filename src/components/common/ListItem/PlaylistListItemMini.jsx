import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function PlaylistListItemMini({ playlist }) {
  const { id, title, trackCount, thumbnailUrl } = playlist;
  const navigate = useNavigate();

  const handleNavigateToPlaylist = () => {
    navigate(`playlist/${id}`); // '/my-page/playlist/{id}'로 이동
  };

  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        py: 2,
        mb: 0.5,
        flexWrap: 'wrap',
        cursor: 'pointer', // 클릭 가능 표시
      }}
      onClick={handleNavigateToPlaylist} // 클릭 시 페이지 이동
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
          src={thumbnailUrl} // 첫 번째 썸네일 이미지만 사용
          alt={title}
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
        <Typography variant="trackTitle" component="div" noWrap>
          {title}
        </Typography>
        <Typography variant="trackArtist">트랙 {trackCount}개</Typography>
      </Box>
    </Box>
  );
}

export default PlaylistListItemMini;
