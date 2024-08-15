import { getFeaturedPlaylists } from '../../api/track/trackApi';
import React, { useEffect, useState } from 'react';
import BaseContainer from '../../components/layout/BaseContainer';
import { Box, CircularProgress, Typography } from '@mui/material';
import TrackListItem from '../../components/common/ListItem/TrackListItem';

const FeaturedTracks = () => {
  const [loading, setLoading] = useState(true);
  const [tracks, setTracks] = useState([]);

  const fetchFeaturedTracks = async () => {
    try {
      setLoading(true);
      const featuredData = await getFeaturedPlaylists('ko_KR', 0, 50);
      setTracks(featuredData.tracks);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch featured playlists:', error);
      setLoading(false);
    }
  };

  // 인기 트랙
  useEffect(() => {
    fetchFeaturedTracks();
  }, []);

  return (
    <BaseContainer>
      <Typography variant="title">Top 50 Featured Tracks</Typography>
      <Box sx={{ width: '100%', my: 1 }}>
        {loading ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              py: 10,
            }}
          >
            <CircularProgress color="secondary" />
          </Box>
        ) : (
          tracks.map((track, index) => (
            <Box
              key={track.id} // Ensure each Box has a unique key
              sx={{
                display: 'flex',
                alignItems: 'center',
                mb: 1,
              }}
            >
              <Typography
                variant="ranking"
                sx={{
                  width: 30,
                  textAlign: 'center',
                  mr: 1,
                }}
              >
                {index + 1}
              </Typography>
              <TrackListItem music={track} />
            </Box>
          ))
        )}
      </Box>
    </BaseContainer>
  );
};

export default FeaturedTracks;
