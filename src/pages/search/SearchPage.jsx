import React, { useState, useEffect, useCallback } from 'react';
import { Tabs, Tab, Box, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import BaseContainer from '../../components/layout/BaseContainer';
import SearchTracks from './tabs/SearchTracks';
import SearchPosts from './tabs/SearchPosts';
import { searchTracks } from '../../api/track/trackApi';
import { searchPosts } from '../../api/post/postApi';

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
      <Typography variant="h6" sx={{ mb: 3 }}>
        <Typography component="span" variant="searchQuery">
          {searchQuery}
        </Typography>{' '}
        에 대한 검색 결과입니다.
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
          <SearchTracks
            results={trackResults}
            onLoadMore={handleLoadMore}
            isLoading={isLoading}
          />
        )}
        {searchType === 'post' && (
          <SearchPosts
            results={postResults}
            onLoadMore={handleLoadMore}
            isLoading={isLoading}
          />
        )}
      </Box>
    </BaseContainer>
  );
};

export default SearchPage;
