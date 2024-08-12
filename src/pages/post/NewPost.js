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
  CircularProgress, // ✔️ 로딩 스피너 추가
} from '@mui/material';
import usePostStore from '../../store/usePostStore';
import BaseContainer from '../../components/layout/BaseContainer';
import PlaylistListItem from '../../components/common/ListItem/PlaylistListItem';
import SnackbarAlert from '../../components/common/Alert/SnackbarAlert';
import MultiHashtagChips from '../../components/common/HashtagChips/MultiHashtagChips';

const itemsPerPage = 6; // 페이지당 표시할 플레이리스트 수

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
  const [isSubmitting, setIsSubmitting] = useState(false); // ✔️ 제출 상태 관리

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await getUserPlaylists(page - 1, itemsPerPage);
        setPlaylists(response.content || []);
        setTotalPages(response.totalPages || 0);
      } catch (error) {
        setSnackbar({
          open: true,
          message: '플레이리스트 불러오기를 실패했습니다. 다시 시도해 주세요.',
          severity: 'error',
        });
      }
    };

    fetchPlaylists();
  }, [page]);

  const handleSubmit = async e => {
    e.preventDefault();

    // 🔄 이미 제출 중이면 함수 종료
    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true); // ✔️ 제출 상태 시작

    console.log('Selected Hashtags:', selectedHashtags);

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
      }, 1000); // 1초 후에 페이지 이동
    } catch (error) {
      setSnackbar({
        open: true,
        message: '게시글 작성에 실패했습니다. 다시 시도해 주세요.',
        severity: 'error',
      });
    } finally {
      // 로딩이 끝난 후에도 버튼이 잠시 비활성화되도록 지연 시간을 추가
      setTimeout(() => {
        setIsSubmitting(false); // ✔️ 제출 상태 종료
      }, 1500); // 1.5초 지연 시간 추가
      setSelectedHashtags([]);
    }
  };

  const handleSelectionChange = newSelection => {
    setSelectedHashtags(newSelection);
  };

  const handleCancel = () => {
    navigate(-1); // 이전 페이지로 이동
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
          <MultiHashtagChips
            fetchHashtags={fetchAllHashtags}
            selectedHashtags={selectedHashtags}
            onSelectionChange={handleSelectionChange}
          />
          <Typography variant="h6" sx={{ fontSize: '1.2rem', mt: 2, mb: 1 }}>
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
                  <PlaylistListItem playlist={playlist} />
                </Box>
              </Grid>
            ))}
          </Grid>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Pagination
              count={Math.ceil(playlists.length / itemsPerPage)}
              page={page}
              onChange={handlePageChange}
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
              disabled={isSubmitting} // ✔️ 로딩 중일 때 버튼 비활성화
            >
              {isSubmitting ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                '작성'
              )}
              {/* ✔️ 로딩 중에는 로딩 스피너 표시 */}
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
