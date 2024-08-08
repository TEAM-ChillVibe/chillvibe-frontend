import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Grid, Box } from '@mui/material';
import BaseContainer from '../../components/layout/BaseContainer';
import PostListItemMini from '../../components/common/ListItem/PostListItemMini';
import HashtagChips from '../../components/common/HashtagChips';
import TrackListItem from '../../components/common/ListItem/TrackListItem';

// 지금 가장 인기있는 플레이리스트
const fetchPlaylists = async () => {
  return [
    {
      id: 1,
      title: 'OST 감성 국내 발라드 노래 모음',
      user: { name: '핑프' },
    },
    {
      id: 2,
      title: 'OST 감성 국내 발라드 노래 모음',
      user: { name: '핑프' },
    },
    {
      id: 3,
      title: 'OST 감성 국내 발라드 노래 모음',
      user: { name: '핑프' },
    },
    {
      id: 4,
      title: 'OST 감성 국내 발라드 노래 모음',
      user: { name: '핑프' },
    },
    {
      id: 5,
      title: 'OST 감성 국내 발라드 노래 모음',
      user: { name: '핑프' },
    },
    {
      id: 6,
      title: 'OST 감성 국내 발라드 노래 모음',
      user: { name: '핑프' },
    },
  ];
};

//인기태그 부분
const fetchHashtags = async () => {
  return [
    { id: 1, name: '발라드' },
    { id: 2, name: '힙합' },
    { id: 3, name: '인디' },
    { id: 4, name: '댄스' },
    { id: 5, name: '재즈' },
    { id: 6, name: '팝' },
    { id: 7, name: 'OST' },
    { id: 8, name: 'JPOP' },
    { id: 9, name: '트로트' },
    { id: 10, name: '알앤비' },
  ];
};

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

const Main = () => {
  const [playlists, setPlaylists] = useState([]);
  const [tracks, setTracks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getPlaylists = async () => {
      const data = await fetchPlaylists();
      setPlaylists(data);
    };
    getPlaylists();
  }, []);

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
      <HashtagChips fetchHashtags={fetchHashtags} />
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
