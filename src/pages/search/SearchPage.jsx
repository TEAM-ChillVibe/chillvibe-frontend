import React, { useState, useEffect, useCallback } from 'react';
import { Tabs, Tab, Box, Typography, CircularProgress } from '@mui/material';
import { useLocation } from 'react-router-dom';
import BaseContainer from '../../components/layout/BaseContainer';
import SearchTracks from './tabs/SearchTracks';
import SearchPosts from './tabs/SearchPosts';
import axios from 'axios';

const SearchPage = () => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('track');
  const [searchResults, setSearchResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const fetchSearchResults = useCallback(async () => {
    if (!searchQuery) return;

    setIsLoading(true);
    try {
      const response = await axios.get(`http://localhost:8080/api/search`, {
        params: { q: searchQuery, type: searchType, page: currentPage },
      });
      setSearchResults(response.data);
    } catch (error) {
      // 검색 에러
      setSearchResults(null);
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery, searchType, currentPage]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('q');
    if (query) {
      setSearchQuery(query);
    }
  }, [location.search]);

  useEffect(() => {
    fetchSearchResults();
  }, [fetchSearchResults]);

  const handleTabChange = (event, newValue) => {
    setSearchType(newValue);
    setCurrentPage(0);
  };

  return (
    <BaseContainer>
      <Typography variant="h5" sx={{ mt: 2, mb: 3 }}>
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
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Box mt={3} sx={{ width: '100%' }}>
          {searchType === 'track' && (
            <SearchTracks
              results={searchResults}
              onPageChange={setCurrentPage}
            />
          )}
          {searchType === 'post' && (
            <SearchPosts
              results={searchResults}
              onPageChange={setCurrentPage}
            />
          )}
        </Box>
      )}
    </BaseContainer>
  );
};

export default SearchPage;
