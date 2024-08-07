import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPost } from '../../api/post/postApi';
import { getUserPlaylistsForSelection } from '../../api/playlist/playlist';
import { fetchAllHashtags } from '../../api/hashtag/hashtagApi';

import {
  TextField,
  Button,
  Box,
  Grid,
  Typography,
  Snackbar,
  Alert,
} from '@mui/material';
import HashtagChips from '../../components/common/HashtagChips';
import usePostStore from '../../store/usePostStore';
import BaseContainer from '../../components/layout/BaseContainer';

const NewPost = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedPlaylistId, setSelectedPlaylistId] = useState('');
  const [playlists, setPlaylists] = useState([]);
  const [selectedHashtags, setSelectedHashtags] = useState([]);
  const addPost = usePostStore(state => state.addPost);
  const navigate = useNavigate();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const defaultImageUrl = 'https://via.placeholder.com/100';

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await getUserPlaylistsForSelection();
        console.log(response);
        setPlaylists(response);
      } catch (error) {
        console.error('Error fetching playlists:', error);
      }
    };

    fetchPlaylists();
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    const newPost = {
      title,
      description,
      playlistId: selectedPlaylistId,
      hashtagIds: selectedHashtags,
    };
    try {
      const response = await createPost(newPost);
      addPost(response);
      setOpenSnackbar(true);
      setTimeout(() => {
        navigate('/api/posts'); // 게시글 목록 페이지로 이동
      }, 3000); // 3초 후에 페이지 이동
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const handleHashtagClick = tagId => {
    setSelectedHashtags(prevSelected =>
      prevSelected.includes(tagId)
        ? prevSelected.filter(id => id !== tagId)
        : [...prevSelected, tagId],
    );
  };

  const fetchHashtags = async () => {
    try {
      const response = await fetchAllHashtags();
      return response;
    } catch (error) {
      console.error('Error fetching hashtags:', error);
      return [];
    }
  };

  const handleCancel = () => {
    navigate(-1); // 이전 페이지로 이동
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <BaseContainer>
      <Typography variant="title">New Post</Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
      >
        <Typography variant="h6" sx={{ fontSize: '1.2rem' }}>
          제목
        </Typography>
        <TextField
          label="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
        <Typography variant="h6" sx={{ fontSize: '1.2rem' }}>
          플레이리스트 소개
        </Typography>
        <TextField
          label="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          required
          multiline
          rows={4}
        />
        <Typography variant="h6" sx={{ fontSize: '1.2rem' }}>
          태그 선택
        </Typography>
        <HashtagChips
          fetchHashtags={fetchHashtags}
          selectedHashtag={selectedHashtags}
          onHashtagClick={handleHashtagClick}
        />
        <Typography variant="h6" sx={{ fontSize: '1.2rem' }}>
          플레이리스트 선택
        </Typography>
        <Grid container spacing={2}>
          {playlists.map(playlist => (
            <Grid item xs={12} sm={6} key={playlist.id}>
              <Box
                onClick={() => setSelectedPlaylistId(playlist.id)}
                sx={{
                  cursor: 'pointer',
                  border:
                    selectedPlaylistId === playlist.id
                      ? '2px solid #3f51b5'
                      : '1px solid #ccc',
                  padding: 1,
                  borderRadius: 1,
                  display: 'flex',
                  alignItems: 'center',
                  '&:hover': {
                    border: '2px solid #3f51b5',
                  },
                }}
              >
                <img
                  src={playlist.imageUrl || defaultImageUrl}
                  alt={playlist.title}
                  style={{
                    width: '120px',
                    height: '120px',
                    marginLeft: '10px',
                    marginRight: '50px',
                  }}
                />
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                  }}
                >
                  <Typography variant="body1">{playlist.title}</Typography>
                  <Typography variant="body2">
                    트랙 수 {playlist.trackCount}개
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleCancel}
            sx={{ color: 'black', borderColor: 'black' }}
          >
            취소
          </Button>
          <Button type="submit" variant="contained" color="primary">
            작성
          </Button>
        </Box>
      </Box>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: '100%' }}
        >
          게시글이 성공적으로 생성되었습니다!
        </Alert>
      </Snackbar>
    </BaseContainer>
  );
};

export default NewPost;
