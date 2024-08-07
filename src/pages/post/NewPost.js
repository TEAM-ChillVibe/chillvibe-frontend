import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPost } from '../../api/post/postApi';
import { getUserPlaylistsForSelection } from '../../api/playlist/playlist';
import { fetchAllHashtags } from '../../api/hashtag/hashtagApi';

import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Grid,
  Typography,
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

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await getUserPlaylistsForSelection();
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
      navigate('/'); // 게시글 목록 페이지로 이동
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

  return (
    <BaseContainer>
      <Typography variant="title">New Post</Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
      >
        <TextField
          label="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
        <TextField
          label="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          required
          multiline
          rows={4}
        />
        <HashtagChips
          fetchHashtags={fetchHashtags}
          selectedHashtag={selectedHashtags}
          onHashtagClick={handleHashtagClick}
        />
        <Grid container spacing={2}>
          {playlists.map(playlist => (
            <Grid item xs={12} sm={6} md={4} key={playlist.id}>
              <Box
                onClick={() => setSelectedPlaylistId(playlist.id)}
                sx={{
                  cursor: 'pointer',
                  border:
                    selectedPlaylistId === playlist.id
                      ? '2px solid #3f51b5'
                      : '1px solid #ccc',
                  padding: 2,
                  borderRadius: 1,
                  '&:hover': {
                    border: '2px solid #3f51b5',
                  },
                }}
              >
                <img
                  src={playlist.thumbnailUrl}
                  alt={playlist.title}
                  style={{ width: '100%', height: 'auto' }}
                />
                <Box sx={{ mt: 1, textAlign: 'center' }}>{playlist.title}</Box>
              </Box>
            </Grid>
          ))}
        </Grid>
        <Button type="submit" variant="contained" color="primary">
          Create Post
        </Button>
      </Box>
    </BaseContainer>
  );
};

export default NewPost;
