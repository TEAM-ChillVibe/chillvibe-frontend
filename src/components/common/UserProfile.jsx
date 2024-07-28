import { Avatar, Box, Chip, Typography } from '@mui/material';

function UserProfile({ nickname, introduction, hashtags }) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        m: 2,
        p: 1,
        width: '100%',
      }}
    >
      <Avatar
        sx={{
          width: 90,
          height: 90,
          mr: 3,
        }}
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 0.5,
        }}
      >
        <Typography variant="h2">{nickname}</Typography>
        <Typography variant="body2" color="text.secondary">
          {introduction}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 1,
            mt: 1,
          }}
        >
          {hashtags.map(hashtag => (
            <Chip key={hashtag} label={hashtag} size="small" />
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default UserProfile;
