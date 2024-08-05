import React from 'react';
import { List, ListItem, Box, Pagination, Typography } from '@mui/material';
import TrackListItem from '../../../components/common/ListItem/TrackListItem';

const SearchTracks = ({ results, onPageChange }) => {
  if (!results || !results.content || results.content.length === 0)
    return <Typography>트랙 검색 결과가 없습니다.</Typography>;

  const handlePageChange = (event, value) => {
    onPageChange(value - 1);
  };
  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        트랙 검색 결과
      </Typography>
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {results.content.map(track => (
          <ListItem key={track.id} disablePadding sx={{ mb: 1 }}>
            <TrackListItem
              music={{
                title: track.name,
                artist: track.artistName,
                albumCover: track.albumImageUrl,
                duration: track.duration,
                audioSrc: track.previewUrl,
              }}
            />
          </ListItem>
        ))}
      </List>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <Pagination
          count={results.page.totalPages}
          page={results.page.number + 1}
          onChange={handlePageChange}
        />
      </Box>
    </Box>
  );
};

export default SearchTracks;
