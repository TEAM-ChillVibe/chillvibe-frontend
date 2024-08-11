import React, { useState } from 'react';
import { Fab, Box } from '@mui/material';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import FormModal from '../../../components/common/Modal/FormModal';
import { createEmptyPlaylist } from '../../../api/playlist/playlistApi';
import SnackbarAlert from '../../../components/common/Alert/SnackbarAlert';
import useMusicPlayerStore from '../../../store/useMusicPlayerStore';

const NewPlaylistButton = () => {
  const { isVisible: isMusicPlayerVisible } = useMusicPlayerStore();

  // 모달 상태
  const [open, setOpen] = useState(false);
  const [playlistTitle, setPlaylistTitle] = useState('');
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  // 모달 핸들러
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setPlaylistTitle(''); // 모달 닫을 때 폼 필드 초기화
  };

  // 모달 버튼 이벤트
  const handlePrimaryClick = async () => {
    if (!playlistTitle.trim()) {
      return;
    } // 제목이 비어있으면 처리하지 않음

    try {
      await createEmptyPlaylist(playlistTitle);
      handleClose();
      setSnackbar({
        open: true,
        message: '새 플레이리스트가 생성되었습니다.',
        severity: 'success',
      });
    } catch (e) {
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
  };

  return (
    <Box>
      <Fab
        size="medium"
        // color="secondary"
        aria-label="new playlist"
        onClick={handleOpen}
        sx={{
          position: 'fixed',
          bottom: isMusicPlayerVisible ? 100 : 24,
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
