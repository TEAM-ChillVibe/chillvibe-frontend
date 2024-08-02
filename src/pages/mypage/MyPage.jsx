import { useState } from 'react';
import BaseContainer from '../../components/layout/BaseContainer';
import { Box, Button, Tab, Tabs, Typography } from '@mui/material';
import UserProfile from '../../components/common/UserProfile';
import MyPlaylist from './tabs/MyPlaylist';
import MyPost from './tabs/MyPost';
import MyLikedPost from './tabs/MyLikedPost';
import MyComment from './tabs/MyComment';

const MyPage = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const user = {
    id: 1,
    nickname: 'Julie Han',
    introduction: 'testing mypage profile',
    hashtags: ['#tag1', '#tag2', '#tag3'],
  };

  return (
    <BaseContainer>
      <Typography variant="title">My Page</Typography>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
        }}
      >
        <UserProfile user={user} />
        <Button
          variant="outlined"
          href="/edit-profile"
          sx={{
            minWidth: '100px',
            whiteSpace: 'nowrap',
          }}
        >
          프로필 수정
        </Button>
      </Box>
      <Box sx={{ width: '100%' }}>
        <Tabs
          value={currentTab}
          onChange={handleTabChange}
          aria-label="my-page-tabs"
          variant="fullWidth"
          scrollButtons="auto"
        >
          <Tab label="Playlists" sx={{ flex: 1 }} />
          <Tab label="Posts" sx={{ flex: 1 }} />
          <Tab label="Liked Posts" sx={{ flex: 1 }} />
          <Tab label="Comments" sx={{ flex: 1 }} />
        </Tabs>
        <Box sx={{ p: 3, my: 3 }}>
          {currentTab === 0 && <MyPlaylist />}
          {currentTab === 1 && <MyPost />}
          {currentTab === 2 && <MyLikedPost />}
          {currentTab === 3 && <MyComment />}
        </Box>
      </Box>
    </BaseContainer>
  );
};

export default MyPage;
