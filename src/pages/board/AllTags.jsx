import BaseContainer from '../../components/layout/BaseContainer';
import { Box, Button, Typography } from '@mui/material';
import PostList from '../../components/common/PostList';
import { fetchAllHashtags } from '../../api/hashtag/hashtagApi';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import SingleHashtagChips from '../../components/common/HashtagChips/SingleHashtagChips';
import { myInfo } from '../../api/user/userApi';

const AllTags = () => {
  const [sortOrder, setSortOrder] = useState('latest');
  const [selectedHashtag, setSelectedHashtag] = useState(null);
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const hashtagId = queryParams.get('hashtag');
    setSelectedHashtag(hashtagId);
  }, [location.search]);

  useEffect(() => {
    console.log('selectedhashtag', selectedHashtag);
  }, [selectedHashtag]);

  const handleHashtagClick = hashtag => {
    setSelectedHashtag(hashtag.id);
  };

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      try {
        const user = await myInfo();
        if (user) {
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
        setIsLoggedIn(false);
      }
    };

    checkUserLoggedIn();
  }, []);

  return (
    <BaseContainer>
      <Typography variant="title">All Tags</Typography>
      <SingleHashtagChips
        fetchHashtags={fetchAllHashtags}
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
        {isLoggedIn && (
          <Button variant="contained" href="/new-post">
            새 게시글
          </Button>
        )}
      </Box>
      <PostList selectedHashtag={selectedHashtag} sortOrder={sortOrder} />
    </BaseContainer>
  );
};

export default AllTags;
