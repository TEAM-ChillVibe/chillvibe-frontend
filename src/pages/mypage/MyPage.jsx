import React, { useEffect, useState } from 'react';
import BaseContainer from '../../components/layout/BaseContainer';
import { Box, Button, Tab, Tabs, Typography } from '@mui/material';
import UserProfile from '../../components/common/UserProfile';
import MyPlaylist from './tabs/MyPlaylist';
import MyPost from './tabs/MyPost';
import MyLikedPost from './tabs/MyLikedPost';
import MyComment from './tabs/MyComment';
import useUserStore from '../../store/useUserStore';
import EditIcon from '@mui/icons-material/Edit';
import LockIcon from '@mui/icons-material/Lock';

const MyPage = () => {
  // 탭 상태 관리
  const [currentTab, setCurrentTab] = useState(() => {
    // 페이지 로드 시 상태를 로컬 스토리지에서 가져오기
    const savedTab = localStorage.getItem('currentTab');
    return savedTab ? parseInt(savedTab, 10) : 0;
  });
  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
    // 탭 변경 시 로컬 스토리지에 저장
    localStorage.setItem('currentTab', newValue);
  };

  // user 정보 가져오기
  const { user, fetchMyInfo } = useUserStore(state => ({
    user: state.user,
    fetchMyInfo: state.fetchMyInfo,
  }));

  useEffect(() => {
    fetchMyInfo();
  }, [fetchMyInfo]);

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
        <UserProfile
          user={user}
          noIntroductionMessage="나를 소개하는 한 마디를 추가해보세요!"
          isMyPage={true}
        />
        <Box
          display="flex"
          flexDirection="column"
          alignItems="end"
          sx={{ mx: 3 }}
        >
          <Button
            variant="outlined"
            size="small"
            href="/edit-profile"
            startIcon={<EditIcon />}
            sx={{
              whiteSpace: 'nowrap',
            }}
          >
            프로필 수정
          </Button>
          <Button
            variant="outlined"
            size="small"
            href="/edit-password"
            startIcon={<LockIcon />}
            sx={{
              whiteSpace: 'nowrap',
              mt: 1,
            }}
          >
            비밀번호 변경
          </Button>
        </Box>
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
          {currentTab === 1 && <MyPost user={user} />}
          {currentTab === 2 && <MyLikedPost />}
          {currentTab === 3 && <MyComment />}
        </Box>
      </Box>
    </BaseContainer>
  );
};

export default MyPage;
