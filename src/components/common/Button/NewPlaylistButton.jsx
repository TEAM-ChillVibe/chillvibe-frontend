import React, { useState } from 'react';
import { Fab, Box } from '@mui/material';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import FormModal from '../../../components/common/Modal/FormModal';
import { createEmptyPlaylist } from '../../../api/playlist/playlistApi';
import SnackbarAlert from '../../../components/common/Alert/SnackbarAlert';
import useMusicPlayerStore from '../../../store/useMusicPlayerStore';
import useUserStore from '../../../store/useUserStore';
import { useNavigate } from 'react-router-dom';

const NewPlaylistButton = () => {
  const navigate = useNavigate();
  const { isVisible: isMusicPlayerVisible } = useMusicPlayerStore();
  const { isAuthenticated } = useUserStore();

  // 모달 상태
  const [open, setOpen] = useState(false);
  const [playlistTitle, setPlaylistTitle] = useState('');
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  // 플레이리스트 제목 유효성 검사
  const [titleError, setTitleError] = useState('');

  // 모달 핸들러
  const handleOpen = () => {
    if (!isAuthenticated) {
      setSnackbar({
        open: true,
        message: '로그인이 필요한 서비스입니다.',
        severity: 'warning',
      });
      navigate('/login');
    } else {
      setOpen(true);
    }
  };
  const handleClose = () => {
    setOpen(false);
    setPlaylistTitle(''); // 모달 닫을 때 폼 필드 초기화
    setTitleError(''); // 에러 메세지 초기화
  };

  const handlePrimaryClick = async () => {
    // 유효성 검사
    if (!playlistTitle.trim()) {
      return;
    } // 제목이 비어있으면 처리하지 않음

    if (playlistTitle.length < 1 || playlistTitle.length > 50) {
      setTitleError('플레이리스트의 제목은 1자 이상, 50자 이하여야 합니다. ');
      return;
    } // 플레이리스트 글자 수 제한

    try {
      await createEmptyPlaylist(playlistTitle);
      handleClose();
      setSnackbar({
        open: true,
        message: '새 플레이리스트가 생성되었습니다.',
        severity: 'success',
      });
    } catch (error) {
      handleClose();
      setSnackbar({
        open: true,
        message: '플레이리스트 생성에 실패했습니다. 다시 시도해 주세요.',
        severity: 'error',
      });
    }
  };

  const handleSecondaryClick = () => {
    handleClose();
  };

  // 플레이리스트 제목 폼 핸들러
  const handleTitleChange = e => {
    setPlaylistTitle(e.target.value);
    setTitleError(''); // 사용자가 입력을 수정하면 에러메세지 초기화
  };

  return (
    <Box>
      <Fab
        size="medium"
        color="primary"
        aria-label="new playlist"
        onClick={handleOpen}
        sx={{
          position: 'fixed',
          // bottom: isMusicPlayerVisible ? 100 : 24,
          bottom: 24,
          left: 24,
        }}
      >
        <QueueMusicIcon />
      </Fab>
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
        isPrimaryButtonDisabled={!playlistTitle.trim()}
        errorMessage={titleError}
      />
      <SnackbarAlert
        open={snackbar.open}
        onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
        message={snackbar.message}
        severity={snackbar.severity}
      />
    </Box>
  );
};

export default NewPlaylistButton;
