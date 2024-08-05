import BaseContainer from '../../components/layout/BaseContainer';
import { Box, Typography } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import UserProfile from '../../components/common/UserProfile';
import MyPostListItem from '../../components/common/ListItem/MyPostListItem';

const UserPage = () => {
  const user = {
    id: 1,
    nickname: 'Julie Han',
    introduction: 'testing mypage profile',
    hashtags: ['#tag1', '#tag2', '#tag3'],
    isPublic: false,
  };

  const postList = [
    {
      id: 1,
      title: '여름밤 드라이브 플레이리스트',
      date: '2024년 7월 25일',
      trackCount: 15,
      hashtags: ['#팝', '#여름', '#드라이브'],
      likes: 3256,
      createdAt: '2024-07-25T18:00:00Z',
    },
    {
      id: 2,
      title: '집중력 향상을 위한 클래식 음악',
      date: '2024년 7월 20일',
      trackCount: 8,
      hashtags: ['#클래식', '#집중', '#공부'],
      likes: 180,
      createdAt: '2024-07-20T09:30:00Z',
    },
    {
      id: 3,
      title: '편안한 주말 아침 재생목록',
      date: '2024년 7월 15일',
      trackCount: 12,
      hashtags: ['#편안', '#주말', '#아침'],
      likes: 2100,
      createdAt: '2024-07-15T07:45:00Z',
    },
    {
      id: 4,
      title: '운동 중 듣기 좋은 비트',
      date: '2024년 7월 10일',
      trackCount: 10,
      hashtags: ['#운동', '#비트', '#에너지'],
      likes: 3400,
      createdAt: '2024-07-10T12:00:00Z',
    },
    {
      id: 5,
      title: '여름 휴가를 위한 재생목록',
      date: '2024년 7월 5일',
      trackCount: 20,
      hashtags: ['#여름', '#휴가', '#바다'],
      likes: 4200,
      createdAt: '2024-07-05T14:30:00Z',
    },
    {
      id: 6,
      title: '겨울밤의 따뜻한 재생목록',
      date: '2024년 6월 30일',
      trackCount: 16,
      hashtags: ['#겨울', '#따뜻함', '#저녁'],
      likes: 1500,
      createdAt: '2024-06-30T19:00:00Z',
    },
    {
      id: 7,
      title: '감성적인 발라드 재생목록',
      date: '2024년 6월 25일',
      trackCount: 14,
      hashtags: ['#발라드', '#감성', '#로맨스'],
      likes: 2800,
      createdAt: '2024-06-25T20:15:00Z',
    },
    {
      id: 8,
      title: '재즈와 블루스의 조화',
      date: '2024년 6월 20일',
      trackCount: 18,
      hashtags: ['#재즈', '#블루스', '#즉흥'],
      likes: 1900,
      createdAt: '2024-06-20T11:30:00Z',
    },
    {
      id: 9,
      title: '일상 속 활력을 주는 음악',
      date: '2024년 6월 15일',
      trackCount: 22,
      hashtags: ['#활력', '#일상', '#에너지'],
      likes: 3100,
      createdAt: '2024-06-15T13:00:00Z',
    },
    {
      id: 10,
      title: '지속적인 집중을 위한 음악',
      date: '2024년 6월 10일',
      trackCount: 9,
      hashtags: ['#집중', '#연구', '#조용함'],
      likes: 220,
      createdAt: '2024-06-10T08:45:00Z',
    },
    {
      id: 11,
      title: '창의력 증진을 위한 재생목록',
      date: '2024년 6월 5일',
      trackCount: 13,
      hashtags: ['#창의력', '#영감', '#혁신'],
      likes: 2500,
      createdAt: '2024-06-05T10:30:00Z',
    },
    {
      id: 12,
      title: '명상과 휴식을 위한 음악',
      date: '2024년 5월 30일',
      trackCount: 11,
      hashtags: ['#명상', '#휴식', '#평화'],
      likes: 600,
      createdAt: '2024-05-30T15:00:00Z',
    },
  ];

  if (!user.isPublic) {
    return (
      <BaseContainer>
        <UserProfile user={user} />
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            my: 15,
          }}
        >
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              mb: 1,
            }}
          >
            <LockIcon sx={{ fontSize: '2rem', mr: 1 }} />
            <Typography variant="h1" sx={{ fontWeight: 'bold' }}>
              비공개 계정입니다.
            </Typography>
          </Box>
          <Typography variant="span" sx={{ fontSize: '0.8rem' }}>
            해당 사용자의 게시글을 열람할 수 없습니다.
          </Typography>
        </Box>
      </BaseContainer>
    );
  }

  return (
    <BaseContainer>
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
      </Box>
      <Typography variant="subtitleMypage">Posts</Typography>
      <Box sx={{ width: '100%', my: 2 }}>
        {postList.length === 0 ? (
          <Typography variant="body1" sx={{ textAlign: 'center', my: 15 }}>
            아직 게시물이 없습니다.
          </Typography>
        ) : (
          <>
            {postList.map(post => (
              <MyPostListItem key={post.id} post={post} />
            ))}
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }} />
          </>
        )}
      </Box>
    </BaseContainer>
  );
};

export default UserPage;
