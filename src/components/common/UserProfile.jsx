import { Avatar, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import HashtagChips from './HashtagChips';
import { fetchHashtagsOfUser } from '../../api/hashtag/hashtagApi';

function UserProfile({ user }) {
  const navigate = useNavigate();

  const { userId, email, nickname, profileUrl, introduction, hashtags } = user;

  const handleNavigateToUserPage = () => {
    navigate(`/user/${userId}`); // 절대경로 유저프로필로 이동
  };

  const handleChipClick = tagId => {
    localStorage.setItem('selectedHashtag', tagId);
    navigate(`/all-tags/`);
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
        src={profileUrl}
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
        <HashtagChips
          fetchHashtags={() => fetchHashtagsOfUser(userId)}
          onChipClick={handleChipClick}
        />
      </Box>
    </Box>
  );
}

export default UserProfile;
