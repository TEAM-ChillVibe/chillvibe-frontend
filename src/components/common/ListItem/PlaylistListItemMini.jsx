import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function PlaylistListItemMini({ playlist }) {
  const { id, title, trackCount, thumbnailUrls = [] } = playlist;
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
        flexWrap: 'wrap',
        cursor: 'pointer', // 클릭 가능 표시
      }}
      onClick={handleNavigateToPlaylist} // 클릭 시 페이지 이동
    >
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)', // 2열 설정
          gridTemplateRows: 'repeat(2, 1fr)', // 2행 설정
          width: 80,
          height: 80,
          mr: 2,
          borderRadius: 1,
          overflow: 'hidden',
          order: 1,
        }}
      >
        {thumbnailUrls.slice(0, 4).map((url, index) => (
          <Box
            key={index}
            sx={{ width: '100%', height: '100%', overflow: 'hidden' }}
          >
            <img
              src={url}
              alt={index}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </Box>
        ))}
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
