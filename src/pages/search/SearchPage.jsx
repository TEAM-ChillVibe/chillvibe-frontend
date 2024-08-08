import React, { useState, useEffect, useCallback } from 'react';
import { Tabs, Tab, Box, Typography, CircularProgress } from '@mui/material';
import { useLocation } from 'react-router-dom';
import BaseContainer from '../../components/layout/BaseContainer';
import SearchTracks from './tabs/SearchTracks';
import SearchPosts from './tabs/SearchPosts';
import { searchTracks } from '../..//api/track/trackApi';
import { searchPosts } from '../..//api/post/postApi';

const SearchPage = () => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('track');
  const [trackResults, setTrackResults] = useState({ content: [] });
  const [postResults, setPostResults] = useState({ content: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const fetchSearchResults = useCallback(async () => {
    if (!searchQuery) {
      return;
    }

    setIsLoading(true);
    try {
      // 트랙 검색 결과일때
      if (searchType === 'track') {
        const response = await searchTracks(searchQuery, currentPage);
        setTrackResults(prev => ({
          ...response,
          content:
            currentPage === 0
              ? response.content
              : [...prev.content, ...response.content],
        }));
      } else {
        // 게시글 검색 결과일때
        const response = await searchPosts(searchQuery, currentPage);
        setPostResults(prev => ({
          ...response,
          content:
            currentPage === 0
              ? response.content
              : [...prev.content, ...response.content],
        }));
      }
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery, searchType, currentPage]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('q');
    if (query) {
      setSearchQuery(query);
      setCurrentPage(0);
      window.scrollTo(0, 0);
    }
  }, [location.search]);

  useEffect(() => {
    fetchSearchResults();
  }, [fetchSearchResults]);

  const handleTabChange = (event, newValue) => {
    setSearchType(newValue);
    setCurrentPage(0);
  };

  const handleLoadMore = () => {
    setCurrentPage(prev => prev + 1);
  };

  return (
    <BaseContainer>
      <Typography variant="h6" sx={{ mt: 2, mb: 3 }}>
        "
        <Box component="span" sx={{ fontWeight: 'bold' }}>
          {searchQuery}
        </Box>
        "에 대한 검색 결과입니다.
      </Typography>
      <Tabs
        value={searchType}
        onChange={handleTabChange}
        variant="fullWidth"
        sx={{
          width: '100%',
        }}
      >
        <Tab label="Tracks" value="track" />
        <Tab label="Posts" value="post" />
      </Tabs>
      <Box sx={{ width: '100%' }}>
        {searchType === 'track' && (
          <SearchTracks results={trackResults} onLoadMore={handleLoadMore} />
        )}
        {searchType === 'post' && (
          <SearchPosts results={postResults} onLoadMore={handleLoadMore} />
        )}
      </Box>
      {isLoading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <CircularProgress />
        </Box>
      )}
    </BaseContainer>
  );
};

export default SearchPage;
