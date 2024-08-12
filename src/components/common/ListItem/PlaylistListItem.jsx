import { Box, Typography } from '@mui/material';

function PlaylistListItem({ playlist }) {
  const { title, trackCount, thumbnailUrl } = playlist;

  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        py: 2,
        flexWrap: 'wrap',
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
          order: 1,
        }}
      >
        <img
          src={thumbnailUrl} // 첫 번째 이미지 URL만 사용
          alt="PlaylistThumbnail"
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
        <Typography variant="subtitle1" component="div" noWrap>
          {title}
        </Typography>
        <Typography variant="body2">트랙 {trackCount}개</Typography>
      </Box>
    </Box>
  );
}

export default PlaylistListItem;
