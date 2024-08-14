import React, { useRef, useEffect, useState, useCallback } from 'react';
import {
  List,
  ListItem,
  Box,
  Typography,
  CircularProgress,
} from '@mui/material';
import PostListItem from '../../../components/common/ListItem/PostListItem';

const SearchPosts = ({ results, onLoadMore, isLoading }) => {
  const [isLastPage, setIsLastPage] = useState(false);
  const lastItemRef = useRef(null);
  const observerRef = useRef(null);
  const loadingRef = useRef(false);

  const handleIntersection = useCallback(
    async entries => {
      const target = entries[0];
      if (target.isIntersecting && !loadingRef.current && !isLastPage) {
        loadingRef.current = true;
        await onLoadMore();
        loadingRef.current = false;
      }
    },
    [onLoadMore, isLastPage],
  );

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '20px',
      threshold: 0.1,
    };

    observerRef.current = new IntersectionObserver(handleIntersection, options);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [handleIntersection]);

  useEffect(() => {
    if (lastItemRef.current && observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current.observe(lastItemRef.current);
    }
  }, [results]);

  useEffect(() => {
    if (
      results?.page?.totalPages !== undefined &&
      results?.page?.number !== undefined
    ) {
      setIsLastPage(results.page.number + 1 >= results.page.totalPages);
    }
  }, [results]);

  if (isLoading && (!results?.content || results.content.length === 0)) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!isLoading && results.content.length === 0) {
    return (
      <Box
        sx={{ display: 'flex', justifyContent: 'center', width: '100%', mt: 4 }}
      >
        <Typography>게시글 검색 결과가 없습니다.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%', overflow: 'hidden' }}>
      <List sx={{ width: '100%' }}>
        {results.content.map((post, index) => (
          <ListItem
            key={post.id}
            disablePadding
            sx={{ mb: 1 }}
            ref={index === results.content.length - 1 ? lastItemRef : null}
          >
            <PostListItem post={post} />
          </ListItem>
        ))}
      </List>
      {isLoading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
};

export default SearchPosts;
