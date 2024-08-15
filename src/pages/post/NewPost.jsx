import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPost } from '../../api/post/postApi';
import { getUserPlaylists } from '../../api/playlist/playlistApi';
import { fetchAllHashtags } from '../../api/hashtag/hashtagApi';

import {
  TextField,
  Button,
  Box,
  Grid,
  Typography,
  Pagination,
  CircularProgress,
} from '@mui/material';
import usePostStore from '../../store/usePostStore';
import BaseContainer from '../../components/layout/BaseContainer';
import PlaylistListItem from '../../components/common/ListItem/PlaylistListItem';
import SnackbarAlert from '../../components/common/Alert/SnackbarAlert';
import MultiHashtagChips from '../../components/common/HashtagChips/MultiHashtagChips';

const itemsPerPage = 10;

const NewPost = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedPlaylistId, setSelectedPlaylistId] = useState('');
  const [playlists, setPlaylists] = useState([]);
  const [selectedHashtags, setSelectedHashtags] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const addPost = usePostStore(state => state.addPost);
  const navigate = useNavigate();
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await getUserPlaylists(page - 1, itemsPerPage);
        setPlaylists(response.content || []);
        setTotalPages(response.page.totalPages || 0);
      } catch (error) {
        setSnackbar({
          open: true,
          message: '플레이리스트 로딩에 실패했습니다. 다시 시도해 주세요.',
          severity: 'error',
        });
      }
    };

    fetchPlaylists();
  }, [page]);

  const handleSubmit = async e => {
    e.preventDefault();

    // 이미 제출 중이면 함수 종료
    if (isSubmitting) return;

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

    if (!selectedPlaylistId) {
      setSnackbar({
        open: true,
        message: '플레이리스트를 선택하셔야 합니다.',
        severity: 'warning',
      });
      return;
    }

    setIsSubmitting(true);

    const newPost = {
      title,
      description,
      playlistId: selectedPlaylistId,
      hashtagIds: selectedHashtags,
    };

    try {
      const response = await createPost(newPost);
      addPost(response);
      setSnackbar({
        open: true,
        message: '게시글이 성공적으로 작성되었습니다!',
        severity: 'success',
      });
      setTimeout(() => {
        navigate(`/post/${response}`); // 작성한 게시글 페이지로 이동
      }, 1000);
    } catch (error) {
      setSnackbar({
        open: true,
        message: '게시글 작성에 실패했습니다. 다시 시도해 주세요.',
        severity: 'error',
      });
    } finally {
      setTimeout(() => {
        setIsSubmitting(false);
      }, 1500);
      setSelectedHashtags([]);
    }
  };

  const handleSelectionChange = newSelection => {
    setSelectedHashtags(newSelection);
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <BaseContainer>
      <Typography variant="title">New Post</Typography>
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
          <Typography variant="h6" sx={{ fontSize: '1.2rem', mt: 2 }}>
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
          <Typography variant="h6" sx={{ fontSize: '1.2rem', mt: 3 }}>
            플레이리스트 선택
          </Typography>
          <Grid container>
            {playlists.map(playlist => (
              <Grid item xs={12} sm={6} key={playlist.id}>
                <Box
                  onClick={() => setSelectedPlaylistId(playlist.id)}
                  sx={{
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    opacity:
                      !selectedPlaylistId || selectedPlaylistId !== playlist.id
                        ? 0.5
                        : 1,
                    transition: 'opacity 0.3s ease',
                  }}
                >
                  <PlaylistListItem playlist={playlist} />
                </Box>
              </Grid>
            ))}
          </Grid>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              color="primary"
            />
          </Box>
          <Box
            sx={{ display: 'flex', justifyContent: 'center', gap: 2, my: 5 }}
          >
            <Button variant="outlined" onClick={handleCancel}>
              취소
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                '작성'
              )}
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

export default NewPost;
