import { Box, Typography } from '@mui/material';

function PlaylistListItem({ playlist }) {
  const { title, trackCount, thumbnailUrl } = playlist;

  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        py: 2,
        overflowWrap: 'break-word',
        cursor: 'pointer', // 클릭 가능 표시
      }}
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
          alt="PlaylistThumbnail"
          src={thumbnailUrl}
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

export default PlaylistListItem;
