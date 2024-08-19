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
        overflowWrap: 'break-word',
        cursor: 'pointer',
      }}
      onClick={handleNavigateToPlaylist}
    >
      <Box
        sx={{
          width: 80,
          height: 80,
          mr: 2,
          borderRadius: 1,
          overflow: 'hidden',
          flexShrink: 0,
        }}
      >
        <img
          src={thumbnailUrl}
          alt={title}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </Box>

      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          gap: 1,
          pr: 1,
        }}
      >
        <Typography
          variant="trackTitle"
          sx={{
            wordBreak: 'break-word',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'normal',
          }}
        >
          {title}
        </Typography>
        <Typography variant="trackArtist">트랙 {trackCount}개</Typography>
      </Box>
    </Box>
  );
}

export default PlaylistListItemMini;
