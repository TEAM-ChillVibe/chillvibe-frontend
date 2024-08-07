import useSortingStore from '../../store/useSortingStore';
import usePostStore from '../../store/usePostStore';
import BaseContainer from '../../components/layout/BaseContainer';
import { Box, Button, Typography } from '@mui/material';
import PostList from '../../components/common/PostList';
import HashtagChips from '../../components/common/HashtagChips';
import { fetchAllHashtags } from '../../api/hashtag/hashtagApi';
import { useState } from 'react';
import useHashtagStore from '../../store/useHashtagStore';

const AllTags = () => {
  const { sortOrder, setSortOrder } = useSortingStore();

  const { selectedHashtag } = useHashtagStore(state => ({
    selectedHashtag: state.selectedHashtag,
  }));

  const handleHashtagClick = hashtagId => {
    useHashtagStore.getState().setSelectedHashtag(hashtagId);
  };

  const loadPosts = selectedHashtag
    ? usePostStore.getState().loadPostsByHashtagId
    : usePostStore.getState().loadPosts;

  return (
    <BaseContainer>
      <Typography variant="title">태그별 플레이리스트</Typography>
      <HashtagChips
        fetchHashtags={fetchAllHashtags}
        selectedHashtag={selectedHashtag}
        onHashtagClick={handleHashtagClick}
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
      <PostList
        // fetchPosts={loadPosts}
        selectedHashtag={selectedHashtag}
        sortOrder={sortOrder}
      />
    </BaseContainer>
  );
};

export default AllTags;
