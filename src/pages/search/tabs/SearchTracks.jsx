import React, { useRef, useEffect, useState } from 'react';
import {
  List,
  ListItem,
  Box,
  Typography,
  CircularProgress,
} from '@mui/material';
import TrackListItem from '../../../components/common/ListItem/TrackListItem';

const SearchTracks = ({ results, onLoadMore, isLoading }) => {
  const [isLastPage, setIsLastPage] = useState(false);
  const lastItemRef = useRef(null);

  useEffect(() => {
    if (
      results &&
      results.content &&
      results.content.length > 0 &&
      !isLastPage
    ) {
      const observer = new IntersectionObserver(
        async entries => {
          if (entries[0].isIntersecting) {
            await onLoadMore();
          }
        },
        { threshold: 1 },
      );

      if (lastItemRef.current) {
        observer.observe(lastItemRef.current);
      }

      return () => {
        if (lastItemRef.current) {
          observer.unobserve(lastItemRef.current);
        }
      };
    }
  }, [results, onLoadMore, isLastPage]);

  useEffect(() => {
    if (
      results &&
      results.page &&
      results.page.totalPages !== undefined &&
      results.page.number !== undefined
    ) {
      setIsLastPage(results.page.number + 1 >= results.page.totalPages);
    }
  }, [results]);

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (
    !isLoading &&
    (!results || !results.content || results.content.length === 0)
  ) {
    return (
      <Box
        sx={{ display: 'flex', justifyContent: 'center', width: '100%', mt: 4 }}
      >
        <Typography>트랙 검색 결과가 없습니다.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%', overflow: 'hidden' }}>
      <List sx={{ width: '100%' }}>
        {results.content.map((track, index) => (
          <ListItem
            key={track.id}
            disablePadding
            sx={{ mb: 1 }}
            ref={index === results.content.length - 1 ? lastItemRef : null}
          >
            <TrackListItem
              key={track.id}
              music={{
                id: track.id,
                name: track.name,
                artist: track.artist,
                thumbnailUrl: track.thumbnailUrl,
                duration: track.duration,
                previewUrl: track.previewUrl,
                trackId: track.trackId,
              }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default SearchTracks;
