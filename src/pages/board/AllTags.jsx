import BaseContainer from '../../components/layout/BaseContainer';
import { Box, Button, Typography } from '@mui/material';
import PostList from '../../components/common/PostList';
import { fetchAllHashtags } from '../../api/hashtag/hashtagApi';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SingleHashtagChips from '../../components/common/HashtagChips/SingleHashtagChips';

const AllTags = () => {
  const [sortOrder, setSortOrder] = useState('latest');
  const [selectedHashtag, setSelectedHashtag] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const hashtag = queryParams.get('hashtag');
    setSelectedHashtag(hashtag);
  }, [location.search]);

  const handleHashtagClick = hashtag => {
    navigate(`/all-tags?hashtag=${hashtag.id}`);
  };

  return (
    <BaseContainer>
      <Typography variant="title">All Tags</Typography>
      <SingleHashtagChips
        fetchHashtags={fetchAllHashtags}
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

export default AllTags;
