import React, { useEffect, useState } from 'react';
import { Typography, Grid, Box, Chip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import BaseContainer from '../../components/layout/BaseContainer';
import PostListItemMini from '../../components/common/ListItem/PostListItemMini';
import TrackListItem from '../../components/common/ListItem/TrackListItem';
import {
  fetchPostsInMainPage,
  fetchPostsByHashtagId,
} from '../../api/post/postApi';
// import { fetchRecommendedTracks } from '../../api/track/trackApi';
import {
  fetchPopularHashtags,
  fetchHashtagsOfPost,
} from '../../api/hashtag/hashtagApi';

const Main = () => {
  const [playlists, setPlaylists] = useState([]);
  const [popularHashtags, setPopularHashtags] = useState([]);
  const [selectedHashtag, setSelectedHashtag] = useState(null);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true);
        const posts = await fetchPostsInMainPage();
        const postsWithHashtags = await Promise.all(
          posts.map(async post => {
            const hashtags = await fetchHashtagsOfPost(post.id);
            return { ...post, hashtags };
          }),
        );
        setPlaylists(postsWithHashtags);
        setLoading(false);
      } catch (error) {
        console.error('Failed to load posts:', error);
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  useEffect(() => {
    const initializePage = async () => {
      try {
        setLoading(true);

        // 인기 태그 불러오기
        const hashtags = await fetchPopularHashtags(0, 10);
        setPopularHashtags(hashtags);

        if (hashtags.length > 0) {
          const firstHashtag = hashtags[0];

          setSelectedHashtag(firstHashtag.id);

          const response = await fetchPostsByHashtagId(
            firstHashtag.id,
            'likes',
            0,
            6,
          );
          const posts = response.content;

          if (Array.isArray(posts)) {
            setFilteredPosts(posts);
          } else {
            console.error('Expected array but got:', posts);
            setFilteredPosts([]);
          }
        }
      } catch (error) {
        console.error('Error initializing page:', error);
      } finally {
        setLoading(false);
      }
    };

    initializePage();
  }, []);

  const handleHashtagClick = async hashtag => {
    if (loading) return;
    try {
      setLoading(true);
      setSelectedHashtag(hashtag.id);

      // 선택된 해시태그와 관련된 게시글 불러오기
      const response = await fetchPostsByHashtagId(hashtag.id, 'likes', 0, 6);
      const posts = response.content;

      if (Array.isArray(posts)) {
        setFilteredPosts(posts);
      } else {
        console.error('Expected array but got:', posts);
        setFilteredPosts([]);
      }

      setLoading(false);
    } catch (error) {
      console.error('Failed to filter posts for hashtag:', error);
    } finally {
      setLoading(false);
    }
  };

  // 추천트랙
  // useEffect(() => {
  //   const getTracks = async () => {
  //     try {
  //       const data = await fetchRecommendedTracks();
  //       setTracks(data);
  //     } catch (error) {
  //       console.error('Failed to fetch recommended tracks:', error);
  //     }
  //   };
  //   getTracks();
  // }, []);

  const handleTrackClick = id => {
    navigate(`/track/${id}`);
  };

  return (
    <BaseContainer>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ textAlign: 'center', marginBottom: 4 }}
      >
        지금 가장 인기있는 플레이리스트
      </Typography>
      <Grid container spacing={2}>
        {playlists.length > 0 ? (
          playlists.map(playlist => (
            <Grid item xs={6} key={playlist.id}>
              <Box sx={{ padding: '1px' }}>
                <PostListItemMini
                  post={playlist}
                  hashtags={playlist.hashtags}
                />
              </Box>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography>게시글이 없습니다.</Typography>
          </Grid>
        )}
      </Grid>

      <Typography
        variant="h4"
        gutterBottom
        sx={{ textAlign: 'center', marginBottom: 4 }}
      >
        요즘 인기있는 태그
      </Typography>
      <Box sx={{ textAlign: 'center', marginBottom: 4 }}>
        {popularHashtags.length > 0 ? (
          popularHashtags.map(hashtag => (
            <Chip
              key={hashtag.id}
              label={`#${hashtag.name}`}
              onClick={() => handleHashtagClick(hashtag)}
              sx={{
                margin: '4px',
                backgroundColor:
                  selectedHashtag === hashtag.id ? '#D1A3FF' : 'default', // 선택된 해시태그의 배경색 변경
                color: selectedHashtag === hashtag.id ? 'white' : 'default', // 선택된 해시태그의 텍스트 색 변경
              }}
            />
          ))
        ) : (
          <Typography>태그가 없습니다.</Typography>
        )}
      </Box>
      {filteredPosts.length > 0 && (
        <>
          <Grid container spacing={2}>
            {filteredPosts.map(post => (
              <Grid item xs={6} key={post.id}>
                <Box sx={{ cursor: 'pointer' }}>
                  <PostListItemMini post={post} hashtags={post.hashtags} />
                </Box>
              </Grid>
            ))}
          </Grid>
        </>
      )}
      {/* 
      <Typography
        variant="h4"
        gutterBottom
        sx={{ textAlign: 'center', marginBottom: 4 }}
      >
        추천 트랙
      </Typography>
      <Grid container spacing={1}>
        {tracks.length > 0 ? (
          tracks.map(track => (
            <Grid item xs={12} sm={6} md={4} key={track.id}>
              <Box
                sx={{ cursor: 'pointer', padding: 2 }}
                onClick={() => handleTrackClick(track.id)}
              >
                <TrackListItem music={track} />
              </Box>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography align="center">추천 트랙이 없습니다.</Typography>
          </Grid>
        )}
      </Grid> */}
    </BaseContainer>
  );
};

export default Main;
