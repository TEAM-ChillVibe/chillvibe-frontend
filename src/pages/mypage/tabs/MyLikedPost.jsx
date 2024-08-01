import { useState } from 'react';
import { Box, Button, Pagination, Typography } from '@mui/material';
import MyPostListItem from '../../../components/common/ListItem/MyPostListItem';
import PostListItem from '../../../components/common/ListItem/PostListItem';

const MyLikedPost = () => {
  const postList = [
    {
      id: 1,
      title: '여름밤 드라이브 플레이리스트',
      trackCount: 15,
      hashtags: ['#팝', '#여름', '#드라이브'],
      user: {
        name: 'Alice',
        avatar: 'https://example.com/alice.jpg',
      },
      likes: 3256,
      createdAt: '2024-07-25T18:00:00Z',
    },
    {
      id: 2,
      title: '집중력 향상을 위한 클래식 음악',
      trackCount: 8,
      hashtags: ['#클래식', '#집중', '#공부'],
      user: {
        name: 'Bob',
        avatar: 'https://example.com/bob.jpg',
      },
      likes: 180,
      createdAt: '2024-07-20T09:30:00Z',
    },
    {
      id: 3,
      title: '편안한 주말 아침 재생목록',
      trackCount: 12,
      hashtags: ['#편안', '#주말', '#아침'],
      user: {
        name: 'Charlie',
        avatar: 'https://example.com/charlie.jpg',
      },
      likes: 2100,
      createdAt: '2024-07-15T07:45:00Z',
    },
    {
      id: 4,
      title: '운동 중 듣기 좋은 비트',
      trackCount: 10,
      hashtags: ['#운동', '#비트', '#에너지'],
      user: {
        name: 'David',
        avatar: 'https://example.com/david.jpg',
      },
      likes: 3400,
      createdAt: '2024-07-10T12:00:00Z',
    },
    {
      id: 5,
      title: '여름 휴가를 위한 재생목록',
      trackCount: 20,
      hashtags: ['#여름', '#휴가', '#바다'],
      user: {
        name: 'Eva',
        avatar: 'https://example.com/eva.jpg',
      },
      likes: 4200,
      createdAt: '2024-07-05T14:30:00Z',
    },
    {
      id: 6,
      title: '겨울밤의 따뜻한 재생목록',
      trackCount: 16,
      hashtags: ['#겨울', '#따뜻함', '#저녁'],
      user: {
        name: 'Frank',
        avatar: 'https://example.com/frank.jpg',
      },
      likes: 1500,
      createdAt: '2024-06-30T19:00:00Z',
    },
    {
      id: 7,
      title: '감성적인 발라드 재생목록',
      trackCount: 14,
      hashtags: ['#발라드', '#감성', '#로맨스'],
      user: {
        name: 'Grace',
        avatar: 'https://example.com/grace.jpg',
      },
      likes: 2800,
      createdAt: '2024-06-25T20:15:00Z',
    },
    {
      id: 8,
      title: '재즈와 블루스의 조화',
      trackCount: 18,
      hashtags: ['#재즈', '#블루스', '#즉흥'],
      user: {
        name: 'Henry',
        avatar: 'https://example.com/henry.jpg',
      },
      likes: 1900,
      createdAt: '2024-06-20T11:30:00Z',
    },
    {
      id: 9,
      title: '일상 속 활력을 주는 음악',
      trackCount: 22,
      hashtags: ['#활력', '#일상', '#에너지'],
      user: {
        name: 'Ivy',
        avatar: 'https://example.com/ivy.jpg',
      },
      likes: 3100,
      createdAt: '2024-06-15T13:00:00Z',
    },
    {
      id: 10,
      title: '지속적인 집중을 위한 음악',
      trackCount: 9,
      hashtags: ['#집중', '#연구', '#조용함'],
      user: {
        name: 'Jack',
        avatar: 'https://example.com/jack.jpg',
      },
      likes: 220,
      createdAt: '2024-06-10T08:45:00Z',
    },
  ];

  // Pagination
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  // Calculate the indices of the items to display
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPosts = postList.slice(startIndex, endIndex);

  return (
    <Box sx={{ width: '100%' }}>
      <Box
        sx={{
          width: '100%',
        }}
      >
        <Typography variant="subtitleMypage">Liked Posts</Typography>
      </Box>
      <Box sx={{ width: '100%', my: 2 }}>
        {/* list 배열 처리, 컴포넌트의 props로 데이터 전달 */}
        {postList.map(post => (
          <PostListItem key={post.id} post={post} />
        ))}
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Pagination
          count={Math.ceil(postList.length / itemsPerPage)}
          page={page}
          onChange={handlePageChange}
          // color="primary"
        />
      </Box>
    </Box>
  );
};

export default MyLikedPost;
