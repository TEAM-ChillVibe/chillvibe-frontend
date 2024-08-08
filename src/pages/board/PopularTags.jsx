import useSortingStore from '../../store/useSortingStore';
import useHashtagStore from '../../store/useHashtagStore';
import BaseContainer from '../../components/layout/BaseContainer';
import { Box, Button, Typography } from '@mui/material';
import HashtagChips from '../../components/common/HashtagChips';
import { fetchPopularHashtags } from '../../api/hashtag/hashtagApi';
import PostList from '../../components/common/PostList';

const PopularTags = () => {
  const { sortOrder, setSortOrder } = useSortingStore();

  const { selectedHashtag } = useHashtagStore(state => ({
    selectedHashtag: state.selectedHashtag,
  }));

  const handleHashtagClick = hashtagId => {
    useHashtagStore.getState().setSelectedHashtag(hashtagId);
  };

  return (
    <BaseContainer>
      <Typography variant="title">인기 태그별 플레이리스트</Typography>
      <HashtagChips
        fetchHashtags={fetchPopularHashtags}
        onChipClick={handleHashtagClick}
      />
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
          새 글 작성
        </Button>
      </Box>
      <PostList selectedHashtag={selectedHashtag} sortOrder={sortOrder} />
    </BaseContainer>
  );
};

export default PopularTags;
