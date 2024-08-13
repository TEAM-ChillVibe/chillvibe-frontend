import BaseContainer from '../../components/layout/BaseContainer';
import { Box, Button, Typography } from '@mui/material';
import { fetchPopularHashtags } from '../../api/hashtag/hashtagApi';
import PostList from '../../components/common/PostList';
import { useEffect, useState } from 'react';
import SingleHashtagChips from '../../components/common/HashtagChips/SingleHashtagChips';
import { useLocation, useNavigate } from 'react-router-dom';

const PopularTags = () => {
  const [sortOrder, setSortOrder] = useState('latest');
  const [selectedHashtag, setSelectedHashtag] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const hashtagId = queryParams.get('hashtag');
    setSelectedHashtag(hashtagId);
  }, [location.search]);

  const handleHashtagClick = hashtag => {
    setSelectedHashtag(hashtag);
    navigate(`/popular-tags?hashtag=${hashtag.id}`);
  };

  return (
    <BaseContainer>
      <Typography variant="title">Popular Tags Now</Typography>
      <SingleHashtagChips
        fetchHashtags={fetchPopularHashtags}
        onChipClick={handleHashtagClick}
        selectedHashtag={selectedHashtag}
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
              color: sortOrder === 'latest' ? 'primary.main' : 'text.primary',
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
              color: sortOrder === 'popular' ? 'primary.main' : 'text.primary',
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
