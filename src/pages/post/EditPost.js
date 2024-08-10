import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchPostById, updatePost } from '../../api/post/postApi';
import { getPlaylistByPostId } from '../../api/playlist/playlistApi';
import { fetchAllHashtags } from '../../api/hashtag/hashtagApi';

import {
  TextField,
  Button,
  Box,
  Typography,
  Snackbar,
  Alert,
} from '@mui/material';
import HashtagChips from '../../components/common/HashtagChips';
import BaseContainer from '../../components/layout/BaseContainer';
import PlaylistListItem from '../../components/common/ListItem/PlaylistListItem';

const EditPost = () => {
  const { postId } = useParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [selectedHashtags, setSelectedHashtags] = useState([]);
  const navigate = useNavigate();
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const post = await fetchPostById(postId);
        setTitle(post.title);
        setDescription(post.description);

        // postId를 이용해 연관된 플레이리스트 가져오기
        const playlist = await getPlaylistByPostId(postId);
        setSelectedPlaylist(playlist);

        // 로컬스토리지에서 선택된 해시태그 불러오기
        const storedHashtags = JSON.parse(
          localStorage.getItem('selectedHashtags') || '[]',
        );
        setSelectedHashtags(storedHashtags);
      } catch (error) {
        console.error('Error fetching post data:', error);
      }
    };

    fetchPostData();
  }, [postId]);

  const handleSubmit = async e => {
    e.preventDefault();
    const updatedPost = {
      title,
      description,
      hashtagIds: selectedHashtags,
    };
    console.log('updating post with data: ', updatedPost);
    try {
      await updatePost(postId, updatedPost);
      setOpenSnackbar(true);
      setTimeout(() => {
        navigate(`/post/${postId}`); // 게시글 상세 페이지로 이동
      }, 2000); // 2초 후에 페이지 이동
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  const handleHashtagClick = selectedHashtags => {
    setSelectedHashtags(selectedHashtags);
  };

  const handleCancel = () => {
    navigate(-1); // 이전 페이지로 이동
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <BaseContainer>
      <Typography variant="title">Edit Post</Typography>
      <Box
        sx={{
          width: '70%',
          minWidth: '400px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          m: '0 auto',
          p: 2,
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          <TextField
            label="게시글 제목"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
          <TextField
            label="플레이리스트 소개글"
            value={description}
            onChange={e => setDescription(e.target.value)}
            required
            multiline
            minRows={4}
          />
          <Typography variant="h6" sx={{ fontSize: '1.2rem', mt: 1 }}>
            해시태그 선택
          </Typography>
          <HashtagChips
            fetchHashtags={fetchAllHashtags}
            onChipClick={handleHashtagClick}
            multiSelectMode={true}
          />
          <Typography variant="h6" sx={{ fontSize: '1.2rem', mt: 2, mb: 1 }}>
            플레이리스트
          </Typography>
          <Box sx={{ mt: 2 }}>
            {selectedPlaylist ? (
              <PlaylistListItem playlist={selectedPlaylist} />
            ) : (
              <Typography variant="body2" sx={{ color: 'gray' }}>
                선택된 플레이리스트가 없습니다.
              </Typography>
            )}
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              gap: 2,
              marginTop: 8,
            }}
          >
            <Button variant="outlined" onClick={handleCancel}>
              취소
            </Button>
            <Button type="submit" variant="contained" color="primary">
              수정
            </Button>
          </Box>
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
          게시글이 성공적으로 수정되었습니다!
        </Alert>
      </Snackbar>
    </BaseContainer>
  );
};

export default EditPost;
