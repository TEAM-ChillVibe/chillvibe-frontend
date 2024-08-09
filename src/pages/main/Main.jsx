import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Grid, Box } from '@mui/material';
import BaseContainer from '../../components/layout/BaseContainer';
import PostListItemMini from '../../components/common/ListItem/PostListItemMini';
import HashtagChips from '../../components/common/HashtagChips';
import TrackListItem from '../../components/common/ListItem/TrackListItem';
import { fetchPostsInMainPage } from '../../api/post/postApi';
import { fetchPopularHashtags } from '../../api/hashtag/hashtagApi';

// 지금 가장 인기있는 플레이리스트
const Main = () => {
  const [playlists, setPlaylists] = useState([]);
  const [tracks, setTracks] = useState([]);
  const navigate = useNavigate();
  const [hashtags, setHashtags] = useState([]);

  useEffect(() => {
    const getPostsInMainPage = async () => {
      try {
        const data = await fetchPostsInMainPage();
        setPlaylists(data); // 응답 데이터를 상태에 저장
      } catch (error) {
        console.error('Error fetching playlists:', error);
      }
    };
    getPostsInMainPage();
  }, []);

  useEffect(() => {
    const getPopularHashtags = async () => {
      try {
        const data = await fetchPopularHashtags(0, 10);
        setHashtags(data);
      } catch (error) {
        console.error('Error fetching popular hashtags:', error);
      }
    };
    getPopularHashtags();
  }, []);

  //추천 트랙 부분
  const fetchTracks = async () => {
    return [
      {
        id: 1,
        title: 'Track 1',
        artist: 'Artist 1',
        albumCover: 'path/to/cover1.jpg',
        duration: '3:45',
        audioSrc:
          'https://p.scdn.co/mp3-preview/4d63fe1638aa41592706f835bd076443b09d8afa?cid=cfe923b2d660439caf2b557b21f31221',
      },
      {
        id: 2,
        title: '제목 2',
        artist: 'Artist 2',
        albumCover: 'path/to/cover2.jpg',
        duration: '4:30',
        audioSrc: null,
      },
      {
        id: 3,
        title: '제목 3',
        artist: 'Artist 3',
        albumCover: 'path/to/cover3.jpg',
        duration: '2:22',
        audioSrc: 'path/to/audio3.mp3',
      },
      {
        id: 4,
        title: '제목 4',
        artist: 'Artist 4',
        albumCover: 'path/to/cover4.jpg',
        duration: '2:44',
        audioSrc: 'path/to/audio4.mp3',
      },
      {
        id: 5,
        title: '제목5',
        artist: 'Artist 5',
        albumCover: 'path/to/cover5.jpg',
        duration: '7:55',
        audioSrc: 'path/to/audio5.mp3',
      },
      {
        id: 6,
        title: '제목6',
        artist: 'Artist 6',
        albumCover: 'path/to/cover6.jpg',
        duration: '5:32',
        audioSrc: 'path/to/audio6.mp3',
      },
    ];
  };

  useEffect(() => {
    const getTracks = async () => {
      const data = await fetchTracks();
      setTracks(data);
    };
    getTracks();
  }, []);

  const handlePlaylistClick = id => {
    navigate(`/playlist/${id}`);
  };

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
              <Box
                sx={{ cursor: 'pointer' }}
                onClick={() => handlePlaylistClick(playlist.id)}
              >
                <PostListItemMini post={playlist} />
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
      <HashtagChips hashtags={hashtags} />
      <Grid container spacing={2}>
        {playlists.length > 0 ? (
          playlists.map(playlist => (
            <Grid item xs={6} key={playlist.id}>
              <Box
                sx={{ cursor: 'pointer', padding: 2 }}
                onClick={() => handlePlaylistClick(playlist.id)}
              >
                <PostListItemMini post={playlist} />
              </Box>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography align="center">게시글이 없습니다.</Typography>
          </Grid>
        )}
      </Grid>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ textAlign: 'center', marginBottom: 4 }}
      >
        추천 트랙
      </Typography>
      <Grid container spacing={2}>
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
      </Grid>
    </BaseContainer>
  );
};

export default Main;
