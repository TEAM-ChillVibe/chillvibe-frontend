import { Box, Button, Typography } from '@mui/material';
import BaseContainer from '../../components/layout/BaseContainer';
import PostList from '../../components/common/PostList';
import useSortingStore from '../../store/useSortingStore';
import { fetchAllPosts } from '../../api/post/postApi';

const Discover = () => {
  // 필터링 상태
  const { sortOrder, setSortOrder } = useSortingStore();

  return (
    <BaseContainer>
      <Typography variant="title">Discover</Typography>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography
            variant="body2"
            sx={{
              cursor: 'pointer',
              fontWeight: sortOrder === 'latest' ? 'bold' : 'noramal',
              mr: 1,
            }}
            onClick={() => setSortOrder('latest')}
          >
            최신순
          </Typography>
          <Typography
            variant="body2"
            sx={{
              cursor: 'pointer',
              fontWeight: sortOrder === 'popular' ? 'bold' : 'noramal',
            }}
            onClick={() => setSortOrder('popular')}
          >
            인기순
          </Typography>
        </Box>
        <Button variant="contained" href="/new-post">
          새 게시글
        </Button>
      </Box>
      <PostList sortOrder={sortOrder} />
    </BaseContainer>
  );
};

export default Discover;
