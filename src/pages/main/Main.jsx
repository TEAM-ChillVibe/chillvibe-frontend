import React, { useEffect, useState } from 'react';
import { Typography, Grid, Box, Chip } from '@mui/material';
import BaseContainer from '../../components/layout/BaseContainer';
import PostListItemMini from '../../components/common/ListItem/PostListItemMini';
import TrackListItem from '../../components/common/ListItem/TrackListItem';
import {
  fetchPostsByHashtagId,
  fetchMainPagePosts,
} from '../../api/post/postApi';
import { getFeaturedPlaylists } from '../../api/track/trackApi';
import { fetchPopularHashtags } from '../../api/hashtag/hashtagApi';
import MainPlaylists from './components/MainPlaylists';
import { Refresh } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';

const Main = () => {
  const [playlists, setPlaylists] = useState([]);
  const [popularHashtags, setPopularHashtags] = useState([]);
  const [selectedHashtag, setSelectedHashtag] = useState(null);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [featuredTracks, setFeaturedTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    loadPosts(page);
    initializePage();
    fetchFeaturedTracks();
  }, []);

  const loadPosts = async pageNum => {
    try {
      setLoading(true);
      const postsData = await fetchMainPagePosts(pageNum, 6);
      setPlaylists(postsData.content);
      setTotalPages(postsData.page.totalPages);
      setLoading(false);
    } catch (error) {
      console.error('Failed to load posts:', error);
      setLoading(false);
    }
  };

  const initializePage = async () => {
    try {
      setLoading(true);
      const hashtags = await fetchPopularHashtags(0, 10);
      setPopularHashtags(hashtags);

      if (hashtags.length > 0) {
        const firstHashtag = hashtags[0];
        setSelectedHashtag(firstHashtag);
        await loadPostsByHashtag(firstHashtag);
      }
    } catch (error) {
      console.error('Error initializing page:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadPostsByHashtag = async hashtag => {
    try {
      const response = await fetchPostsByHashtagId(hashtag.id, 'likes', 0, 6);
      setFilteredPosts(response.content);
    } catch (error) {
      console.error('Failed to load posts for hashtag:', error);
      setFilteredPosts([]);
    }
  };

  const handleHashtagClick = async hashtag => {
    if (loading) {
      return;
    }
    setLoading(true);
    setSelectedHashtag(hashtag);
    await loadPostsByHashtag(hashtag);
    setLoading(false);
  };

  const getRandomTracks = (tracks, count) => {
    const shuffled = [...tracks].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const fetchFeaturedTracks = async () => {
    try {
      setLoading(true);
      const featuredData = await getFeaturedPlaylists('ko_KR', 0, 40);
      const randomTracks = getRandomTracks(featuredData.tracks || [], 6);
      setFeaturedTracks(randomTracks);
    } catch (error) {
      console.error('Failed to fetch featured playlists:', error);
    } finally {
      setLoading(false);
    }
  };

  const refreshTracks = () => {
    fetchFeaturedTracks();
  };

  return (
    <BaseContainer>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <Typography variant="title" sx={{ textAlign: 'center' }}>
          Popular Playlists
        </Typography>
        <MainPlaylists
          playlists={playlists}
          loading={loading}
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
          loadPosts={loadPosts} // 추가: 페이지 변경 시 데이터 로딩을 위한 함수 전달
        />
      </Box>

      <Box sx={{ display: 'inline-flex', alignItems: 'center', mt: 3 }}>
        <Typography variant="title" sx={{ flexShrink: 0 }}>
          Recommended Track
        </Typography>
        <IconButton onClick={refreshTracks} color="primary" sx={{ ml: 1 }}>
          <Refresh />
        </IconButton>
      </Box>
      <Grid container>
        {featuredTracks.map(track => (
          <Grid item xs={6} key={track.id}>
            <Box sx={{ p: 1 }}>
              <TrackListItem music={track} />
            </Box>
          </Grid>
        ))}
      </Grid>

      <Typography variant="title" sx={{ textAlign: 'center', mt: 3 }}>
        Popular Hashtags
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 1,
          my: 2,
        }}
      >
        {popularHashtags.map(hashtag => (
          <Chip
            size="small"
            key={hashtag.id}
            label={`#${hashtag.name}`}
            onClick={() => handleHashtagClick(hashtag)}
            color={
              selectedHashtag && selectedHashtag.id === hashtag.id
                ? 'primary'
                : 'default'
            }
          />
        ))}
      </Box>

      <Grid container sx={{ px: 2 }}>
        {filteredPosts.map(post => (
          <Grid item xs={6} key={post.id}>
            <Box sx={{ px: 2, py: 1 }}>
              <PostListItemMini post={post} hashtags={post.hashtags} />
            </Box>
          </Grid>
        ))}
      </Grid>
    </BaseContainer>
  );
};

export default Main;
