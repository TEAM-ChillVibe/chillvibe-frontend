import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchPostById, updatePost } from '../../api/post/postApi';
import { getPlaylistByPostId } from '../../api/playlist/playlistApi';
import {
  fetchAllHashtags,
  fetchHashtagsOfPost,
} from '../../api/hashtag/hashtagApi';

import { TextField, Button, Box, Typography } from '@mui/material';
import BaseContainer from '../../components/layout/BaseContainer';
import PlaylistListItem from '../../components/common/ListItem/PlaylistListItem';
import SnackbarAlert from '../../components/common/Alert/SnackbarAlert';
import MultiHashtagChips from '../../components/common/HashtagChips/MultiHashtagChips';

const EditPost = () => {
  const { postId } = useParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [selectedHashtags, setSelectedHashtags] = useState([]);
  const navigate = useNavigate();
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  useEffect(() => {
    const fetchPlaylistData = async () => {
      try {
        const post = await fetchPostById(postId);
        setTitle(post.title);
        setDescription(post.description);

        const hashtags = await fetchHashtagsOfPost(postId);
        const hashtagIds = hashtags.map(hashtag => hashtag.id);
        setSelectedHashtags(hashtagIds || []);

        const playlist = await getPlaylistByPostId(postId);
        setSelectedPlaylist(playlist);
      } catch (error) {
        console.error('Error fetching post data:', error);
      }
    };

    fetchPlaylistData();
  }, [postId]);

  const handleSubmit = async e => {
    e.preventDefault();

    // 프론트엔드 유효성 검사
    if (title.length < 1 || title.length > 50) {
      setSnackbar({
        open: true,
        message: '게시글 제목은 1자 이상, 50자 이하로 입력해주세요.',
        severity: 'warning',
      });
      return;
    }

    if (description.length < 1 || description.length > 10000) {
      setSnackbar({
        open: true,
        message: '게시글 설명은 1자 이상, 10000자 이하로 입력해주세요.',
        severity: 'warning',
      });
      return;
    }

    if (selectedHashtags.length > 5) {
      setSnackbar({
        open: true,
        message: '해시태그는 최대 5개까지 선택할 수 있습니다.',
        severity: 'warning',
      });
      return;
    }

    const updatedPost = {
      title,
      description,
      hashtagIds: selectedHashtags,
    };

    try {
      await updatePost(postId, updatedPost);
      setSnackbar({
        open: true,
        message: '게시글이 성공적으로 수정되었습니다!',
        severity: 'success',
      });
      setTimeout(() => {
        navigate(`/post/${postId}`);
      }, 1000);
    } catch (error) {
      setSnackbar({
        open: true,
        message: '게시글 수정에 실패했습니다. 다시 시도해 주세요.',
        severity: 'error',
      });
    } finally {
      setSelectedHashtags([]);
    }
  };

  const handleSelectionChange = newSelection => {
    setSelectedHashtags(newSelection);
  };

  const handleCancel = () => {
    navigate(-1);
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
            error={title.length > 50}
            helperText={
              title.length > 50 ? '제목은 50자 이하로 입력해주세요.' : ''
            }
          />
          <TextField
            label="플레이리스트 소개글"
            value={description}
            onChange={e => setDescription(e.target.value)}
            required
            multiline
            minRows={4}
            error={description.length > 10000}
            helperText={
              description.length > 10000
                ? '설명은 10000자 이하로 입력해주세요.'
                : ''
            }
          />
          <Typography variant="h6" sx={{ fontSize: '1.2rem', mt: 1 }}>
            해시태그 선택
          </Typography>
          <MultiHashtagChips
            fetchHashtags={fetchAllHashtags}
            selectedHashtags={selectedHashtags}
            onSelectionChange={handleSelectionChange}
          />
          {selectedHashtags.length > 5 && (
            <Typography color="error">
              해시태그는 최대 5개까지 선택할 수 있습니다.
            </Typography>
          )}
          <Box>
            <Typography variant="h6" sx={{ fontSize: '1.2rem', mt: 2 }}>
              플레이리스트
            </Typography>
            <Typography variant="body2" color="text.secondary">
              (수정할 수 없습니다.)
            </Typography>
          </Box>
          <Box sx={{ width: '100%' }}>
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
      <SnackbarAlert
        open={snackbar.open}
        onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
        message={snackbar.message}
        severity={snackbar.severity}
      />
    </BaseContainer>
  );
};

export default EditPost;
