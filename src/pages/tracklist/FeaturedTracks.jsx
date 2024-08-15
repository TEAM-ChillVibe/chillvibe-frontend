import { getFeaturedPlaylists } from '../../api/track/trackApi';
import { useEffect, useState } from 'react';
import BaseContainer from '../../components/layout/BaseContainer';
import { Box, Typography } from '@mui/material';
import TrackListItem from '../../components/common/ListItem/TrackListItem';

const FeaturedTracks = () => {
  const [loading, setLoading] = useState(true);
  const [tracks, setTracks] = useState([]);

  const fetchFeaturedTracks = async () => {
    try {
      setLoading(true);
      const featuredData = await getFeaturedPlaylists('ko_KR', 0, 50); // 6개의 트랙만 가져오기
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
      <Box sx={{ width: '100%' }}>
        {tracks.map((track, index) => (
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
        ))}
        {/*{tracks.map(track => (*/}
        {/*  <TrackListItem music={track} />*/}
        {/*))}*/}
      </Box>
    </BaseContainer>
  );
};

export default FeaturedTracks;
