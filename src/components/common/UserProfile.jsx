import { Avatar, Box, Chip, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function UserProfile({ user }) {
  const { id, nickname, introduction, hashtags } = user;

  const navigate = useNavigate();

  const handleNavigateToUserPage = () => {
    navigate(`/user/${id}`); // 절대경로 유저프로필로 이동
  };

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
        onClick={handleNavigateToUserPage}
        sx={{
          width: 90,
          height: 90,
          mr: 3,
          cursor: 'pointer',
        }}
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 0.5,
        }}
      >
        <Typography
          variant="h2"
          onClick={handleNavigateToUserPage}
          sx={{
            cursor: 'pointer',
          }}
        >
          {nickname}
        </Typography>
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
