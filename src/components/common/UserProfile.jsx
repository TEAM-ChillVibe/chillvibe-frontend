import { Avatar, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { fetchHashtagsOfUser } from '../../api/hashtag/hashtagApi';
import SingleHashtagChips from './HashtagChips/SingleHashtagChips';

function UserProfile({ user }) {
  const navigate = useNavigate();

  if (!user) {
    return null;
  }

  const { userId, nickname, profileUrl, introduction } = user;

  if (!userId) {
    return null;
  }

  const handleNavigateToUserPage = () => {
    navigate(`/user/${userId}`); // 절대경로 유저프로필로 이동
  };

  const handleHashtagClick = hashtag => {
    navigate(`/all-tags?hashtag=${hashtag.id}`);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        m: 2,
        p: 1,
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      <Avatar
        onClick={handleNavigateToUserPage}
        src={profileUrl}
        sx={{
          width: 100,
          height: 100,
          mr: 3,
          cursor: 'pointer',
        }}
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1.5,
          flex: 1,
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
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            whiteSpace: 'normal',
            overflowWrap: 'break-word',
            wordBreak: 'break-word',
            mb: 1,
          }}
        >
          {introduction}
        </Typography>
        <SingleHashtagChips
          fetchHashtags={() => fetchHashtagsOfUser(userId)}
          onChipClick={handleHashtagClick}
        />
      </Box>
    </Box>
  );
}

export default UserProfile;
