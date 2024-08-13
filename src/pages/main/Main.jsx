import React, { useEffect, useState } from 'react';
import { Typography, Grid, Box, Chip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import BaseContainer from '../../components/layout/BaseContainer';
import PostListItemMini from '../../components/common/ListItem/PostListItemMini';
import TrackListItem from '../../components/common/ListItem/TrackListItem';
import { fetchPostsInMainPage } from '../../api/post/postApi';
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
    const getPopularHashtags = async () => {
      try {
        const data = await fetchPopularHashtags(0, 10); // 요즘 인기태그 10개
        setPopularHashtags(data);

        // 첫 번째 해시태그 자동 선택 및 필터링
        if (data.length > 0) {
          const firstHashtag = data[0].name;
          setSelectedHashtag(firstHashtag);
          const matchingPosts = playlists.filter(post =>
            post.hashtags.some(tag => tag.name === firstHashtag),
          );
          setFilteredPosts(matchingPosts.slice(0, 6));
        }
      } catch (error) {
        console.error('Error fetching popular hashtags:', error);
      }
    };
    getPopularHashtags();
  }, [playlists]);

  const handleHashtagClick = async hashtag => {
    if (loading) return;
    try {
      setSelectedHashtag(hashtag); // 선택된 해시태그 상태를 문자열로 저장
      const matchingPosts = playlists.filter(post =>
        post.hashtags.some(tag => tag.name === hashtag),
      );
      setFilteredPosts(matchingPosts.slice(0, 6)); // 첫 6개의 게시글만 표시
    } catch (error) {
      console.error('Failed to filter posts for hashtag:', error);
    }
  };
  useEffect(() => {
    if (selectedHashtag && playlists.length > 0) {
      const matchingPosts = playlists.filter(post =>
        post.hashtags.some(tag => tag.name === selectedHashtag),
      );
      setFilteredPosts(matchingPosts.slice(0, 6));
    }
  }, [selectedHashtag, playlists]);

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
                  onClickHashtag={handleHashtagClick}
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
              onClick={() => handleHashtagClick(hashtag.name)}
              sx={{
                margin: '4px',
                backgroundColor:
                  selectedHashtag === hashtag.name ? '#D1A3FF' : 'default', // 선택된 해시태그의 배경색 변경
                color: selectedHashtag === hashtag.name ? 'white' : 'default', // 선택된 해시태그의 텍스트 색 변경
              }}
            />
          ))
        ) : (
          <Typography>태그가 없습니다.</Typography>
        )}
      </Box>
      {filteredPosts.length > 0 && (
        <>
          {/* <Typography
            gutterBottom
            sx={{ textAlign: 'center', marginTop: 4 }}
          ></Typography> */}
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
      </Grid>
    </BaseContainer>
  );
};

export default Main;
