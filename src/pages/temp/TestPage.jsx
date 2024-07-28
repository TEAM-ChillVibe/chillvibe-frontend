import { Box, Grid, Typography } from '@mui/material';
import BaseContainer from '../../components/layout/BaseContainer';
import UserProfile from '../../components/common/UserProfile';
import TrackListItem from '../../components/common/TrackListItem';
import PostListItem from '../../components/common/PostListItem';
import PostListItemMini from '../../components/common/PostListItemMini';

function TestPage() {
  const user = {
    nickname: 'Julie Han',
    introduction: 'testing userprofile now',
    hashtags: ['#tag1', '#tag2', '#tag3'],
  };

  const musicList = [
    {
      id: 1,
      title: 'Dynamite',
      artist: 'BTS',
      albumCover: 'https://example.com/dynamite.jpg',
      duration: '3:19',
    },
    {
      id: 2,
      title: 'Butter',
      artist: 'BTS',
      albumCover: 'https://example.com/butter.jpg',
      duration: '2:44',
    },
    {
      id: 3,
      title: 'Permission to Dance',
      artist: 'BTS',
      albumCover: 'https://example.com/ptd.jpg',
      duration: '4:03',
    },
  ];

  const postList = [
    {
      id: 1,
      images: [
        './albumSample.jpeg',
        'https://example.com/image2.jpg',
        'https://example.com/image3.jpg',
        'https://example.com/image4.jpg',
      ],
      title: '여름밤 드라이브 플레이리스트',
      date: '2024년 7월 25일',
      trackCount: 15,
      hashtags: ['#팝', '#여름', '#드라이브'],
      user: {
        name: 'Alice',
        avatar: 'https://example.com/alice.jpg',
      },
      likes: 3256,
    },
    {
      id: 2,
      images: [
        'https://example.com/image5.jpg',
        'https://example.com/image6.jpg',
      ],
      title: '집중력 향상을 위한 클래식 음악',
      date: '2024년 7월 20일',
      trackCount: 8,
      hashtags: ['#클래식', '#집중', '#공부'],
      user: {
        name: 'Bob',
        avatar: 'https://example.com/bob.jpg',
      },
      likes: 180,
    },
  ];

  return (
    <BaseContainer>
      {/*사용자 프로필*/}
      <Typography
        variant="title"
        sx={{ textAlign: 'left', alignSelf: 'flex-start', ml: 2 }}
      >
        사용자 프로필
      </Typography>
      <UserProfile {...user} />

      {/*트랙 리스트*/}
      <Typography variant="title">Tracklist</Typography>
      <Box sx={{ width: '100%' }}>
        {musicList.map(music => (
          <TrackListItem key={music.id} music={music} />
        ))}
      </Box>

      {/*게시글 리스트*/}
      <Typography variant="title">Posts</Typography>
      <Box sx={{ width: '100%' }}>
        {postList.map(post => (
          <PostListItem key={post.id} post={post} />
        ))}
      </Box>

      {/*게시글 리스트 mini (메인페이지용) */}
      <Typography variant="title">Posts for mainpage</Typography>
      <Grid container spacing={2}>
        {' '}
        {postList.map(post => (
          <Grid item xs={6} key={post.id}>
            {' '}
            {/* 각 아이템이 50% 차지 */}
            <PostListItemMini post={post} />
          </Grid>
        ))}
      </Grid>

      {/*empty box*/}
      <Box
        sx={{
          height: '1000px',
          border: 1,
        }}
      >
        empty box for scroll test
      </Box>
    </BaseContainer>
  );
}

export default TestPage;
