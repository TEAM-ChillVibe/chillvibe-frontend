import { Box, Button, Typography } from '@mui/material';
import BaseContainer from '../../components/layout/BaseContainer';
import PostList from '../../components/common/PostList';
import React, { useState, useEffect } from 'react';
import { myInfo } from '../../api/user/userApi';
import { DriveFileRenameOutline } from '@mui/icons-material';

const Discover = () => {
  const [sortOrder, setSortOrder] = useState('latest');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
      <Typography variant="title">Discover</Typography>
      <Box sx={{ width: '100%' }}>
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
              ml: 0.5,
            }}
          >
            <Typography
              variant="body2"
              sx={{
                cursor: 'pointer',
                fontWeight: sortOrder === 'latest' ? 'bold' : 'normal',
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
                fontWeight: sortOrder === 'popular' ? 'bold' : 'normal',
                color:
                  sortOrder === 'popular' ? 'primary.main' : 'text.primary',
              }}
              onClick={() => setSortOrder('popular')}
            >
              인기순
            </Typography>
          </Box>
          {isLoggedIn && (
            <Button
              variant="contained"
              size="small"
              startIcon={<DriveFileRenameOutline />}
              href="/new-post"
            >
              새 글 작성
            </Button>
          )}
        </Box>
        <PostList sortOrder={sortOrder} />
      </Box>
    </BaseContainer>
  );
};

export default Discover;
