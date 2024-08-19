import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Pagination,
  Typography,
} from '@mui/material';
import PlaylistListItemMini from '../../../components/common/ListItem/PlaylistListItemMini';
import React, { useEffect, useState } from 'react';
import FormModal from '../../../components/common/Modal/FormModal';
import {
  createEmptyPlaylist,
  getUserPlaylists,
} from '../../../api/playlist/playlistApi';
import SnackbarAlert from '../../../components/common/Alert/SnackbarAlert';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';

// 페이지네이션 단위 고정값
const itemsPerPage = 10;

const MyPlaylist = () => {
  // 모달 상태
  const [open, setOpen] = useState(false);
  // 플레이리스트 (생성)
  const [playlistTitle, setPlaylistTitle] = useState('');
  const [playlists, setPlaylists] = useState([]);
  // 페이지
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  // 로딩
  const [isLoading, setIsLoading] = useState(false);
  // 스낵바
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });
  // 생성 상태 관리
  const [isCreating, setIsCreating] = useState(false);
  // 플레이리스트 글자 수 에러 표시 위해
  const [titleError, setTitleError] = useState('');

  // 플레이리스트 데이터 로드
  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const data = await getUserPlaylists(page - 1, itemsPerPage);
        setPlaylists(data.content);
        setTotalPages(data.page.totalPages);
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

  // 모달 핸들러
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setPlaylistTitle(''); // 모달 닫을 때 폼 필드 초기화
  };

  // 모달 버튼 이벤트
  const handlePrimaryClick = async () => {
    // 유효성 검사
    if (!playlistTitle.trim()) {
      return;
    } // 제목이 비어있으면 처리하지 않음

    if (playlistTitle.length < 1 || playlistTitle.length > 50) {
      setTitleError('플레이리스트의 제목은 1자 이상, 50자 이하여야 합니다. ');
      return;
    } // 플레이리스트 글자 수 제한

    setIsCreating(true);
    try {
      await createEmptyPlaylist(playlistTitle);
      handleClose();
      setPage(1); // 생성 후 첫페이지로 이동
      const data = await getUserPlaylists(0, itemsPerPage); // 첫 페이지의 플레이리스트를 가져옵니다.
      setPlaylists(data.content); // 업데이트된 플레이리스트 설정
      setTotalPages(data.page.totalPages); // 업데이트된 총 페이지 수 설정
      setSnackbar({
        open: true,
        message: '새 플레이리스트가 생성되었습니다.',
        severity: 'success',
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: '플레이리스트 생성에 실패했습니다. 다시 시도해 주세요.',
        severity: 'error',
      });
    } finally {
      setIsCreating(false);
    }
  };

  const handleSecondaryClick = () => {
    handleClose();
  };

  // 플레이리스트 제목 폼 핸들러
  const handleTitleChange = e => {
    const newTitle = e.target.value;
    setPlaylistTitle(newTitle);
    setTitleError('');
  };

  // 페이지 핸들러
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="subtitleMypage">My Playlists</Typography>
        <Box>
          <Button
            variant="contained"
            size="small"
            startIcon={<QueueMusicIcon />}
            onClick={handleOpen}
          >
            새 플레이리스트
          </Button>
          <FormModal
            open={open}
            onClose={handleClose}
            title="New Playlist"
            description={`새 플레이리스트의 제목을 정해주세요!\n플레이리스트 생성 후, 검색창을 통해 음악을 추가할 수 있습니다.`}
            formFields={[
              {
                label: 'Title of playlist',
                type: 'text',
                value: playlistTitle,
                onChange: handleTitleChange,
              },
            ]}
            primaryButtonText="저장"
            secondaryButtonText="취소"
            onPrimaryClick={handlePrimaryClick}
            onSecondaryClick={handleSecondaryClick}
            isPrimaryButtonDisabled={!playlistTitle.trim() || isCreating}
            errorMessage={titleError} // 에러 메시지 전달
          />
        </Box>
      </Box>
      <Box sx={{ width: '100%', my: 2 }}>
        {isLoading ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              py: 10,
            }}
          >
            <CircularProgress color="secondary" />
          </Box>
        ) : playlists.length === 0 ? (
          <Typography variant="body1" sx={{ textAlign: 'center', my: 15 }}>
            아직 플레이리스트가 없습니다.
          </Typography>
        ) : (
          <>
            <Grid container>
              {playlists.map(playlist => (
                <Grid item xs={6} key={playlist.id}>
                  <PlaylistListItemMini playlist={playlist} />
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
          </>
        )}
      </Box>

      <SnackbarAlert
        open={snackbar.open}
        onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
        message={snackbar.message}
        severity={snackbar.severity}
      />
    </Box>
  );
};
export default MyPlaylist;
