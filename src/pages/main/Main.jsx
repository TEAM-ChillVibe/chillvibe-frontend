import React, { useEffect, useState } from 'react';
import { Typography, Grid, Box, Chip } from '@mui/material';
import BaseContainer from '../../components/layout/BaseContainer';
import PostListItemMini from '../../components/common/ListItem/PostListItemMini';
import TrackListItem from '../../components/common/ListItem/TrackListItem';
import {
  fetchPostsInMainPage,
  fetchPostsByHashtagId,
  fetchMainPagePosts,
} from '../../api/post/postApi';
import { getFeaturedPlaylists } from '../../api/track/trackApi';
import {
  fetchPopularHashtags,
  fetchHashtagsOfPost,
} from '../../api/hashtag/hashtagApi';
import MainPlaylists from './components/MainPlaylists';
import SingleHashtagChips from '../../components/common/HashtagChips/SingleHashtagChips';
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
  const [activePages, setActivePages] = useState([]);

  const getRandomTracks = (tracks, count) => {
    const shuffled = tracks.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  useEffect(() => {
    loadPosts(page);
  }, [page]);

  const loadPosts = async pageNum => {
    try {
      setLoading(true);
      const postsData = await fetchMainPagePosts(pageNum, 6);

      const postsWithHashtags = await Promise.all(
        postsData.content.map(async post => {
          const hashtags = await fetchHashtagsOfPost(post.id);
          return { ...post, hashtags };
        }),
      );

      setPlaylists(postsWithHashtags);
      setTotalPages(postsData.page.totalPages);
      updateActivePages(postsData.page.totalPages);
      setLoading(false);
    } catch (error) {
      console.error('Failed to load posts:', error);
      setLoading(false);
    }
  };

  const updateActivePages = total => {
    const pages = [...Array(Math.min(total, 3))].map((_, i) => i);
    setActivePages(pages);
  };

  const handlePageChange = async newPageFunc => {
    const newPage =
      typeof newPageFunc === 'function' ? newPageFunc(page) : newPageFunc;
    if (newPage >= 0 && newPage < totalPages) {
      try {
        setLoading(true);
        const newPostsData = await fetchMainPagePosts(newPage, 6);
        if (newPostsData.content.length > 0) {
          const newPostsWithHashtags = await Promise.all(
            newPostsData.content.map(async post => {
              const hashtags = await fetchHashtagsOfPost(post.id);
              return { ...post, hashtags };
            }),
          );
          setPage(newPage);
          setPlaylists(newPostsWithHashtags);
          setTotalPages(newPostsData.page.totalPages);
          updateActivePages(newPostsData.page.totalPages);
        }
      } catch (error) {
        console.error('Failed to load new page:', error);
      } finally {
        setLoading(false);
      }
    }
  };

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
    if (loading) {
      return;
    }
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

  const fetchFeaturedTracks = async () => {
    try {
      setLoading(true);
      const featuredData = await getFeaturedPlaylists('ko_KR', 0, 20); // 6개의 트랙만 가져오기
      const randomTracks = getRandomTracks(featuredData.tracks || [], 6);
      setFeaturedTracks(randomTracks);
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

  const refreshTracks = () => {
    fetchFeaturedTracks();
  };

  return (
    <BaseContainer>
      <Typography variant="title" sx={{ textAlign: 'center' }}>
        지금 가장 인기있는 플레이리스트
      </Typography>
      <MainPlaylists
        playlists={playlists}
        loading={loading}
        page={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      <Box sx={{ display: 'inline-flex', alignItems: 'center', mt: 3 }}>
        <Typography variant="title" sx={{ flexShrink: 0 }}>
          추천 트랙
        </Typography>
        <IconButton onClick={refreshTracks} color="primary" sx={{ ml: 1 }}>
          <Refresh />
        </IconButton>
      </Box>
      <Grid container>
        {featuredTracks.length > 0 ? (
          featuredTracks.map(track => (
            <Grid item xs={6} key={track.id}>
              <Box sx={{ py: 2, mr: 1 }}>
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

      <Typography variant="title" sx={{ textAlign: 'center', mt: 3 }}>
        요즘 인기있는 태그
      </Typography>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          mb: 3,
        }}
      >
        <SingleHashtagChips
          fetchHashtags={fetchPopularHashtags}
          onChipClick={handleHashtagClick}
          selectedHashtagId={selectedHashtag}
        />

        <Box sx={{ mb: 10 }} />
        {filteredPosts.length > 0 && (
          <>
            <Grid container spacing={2}>
              {filteredPosts.map(post => (
                <Grid item xs={6} key={post.id}>
                  <Box sx={{ p: 1 }}>
                    <PostListItemMini post={post} hashtags={post.hashtags} />
                  </Box>
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </Box>
    </BaseContainer>
  );
};

export default Main;
