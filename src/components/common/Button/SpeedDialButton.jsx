import { useState } from 'react';
import {
  Box,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  Tooltip,
} from '@mui/material';
import { DriveFileRenameOutline } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import useUserStore from '../../../store/useUserStore';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import { createEmptyPlaylist } from '../../../api/playlist/playlistApi';
import SnackbarAlert from '../../../components/common/Alert/SnackbarAlert';
import FormModal from '../../../components/common/Modal/FormModal';

const SpeedDialButton = () => {
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const navigate = useNavigate();
  const { isAuthenticated } = useUserStore();

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const [playlistTitle, setPlaylistTitle] = useState('');
  const [titleError, setTitleError] = useState('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => {
    setModalOpen(false);
    setPlaylistTitle('');
    setTitleError('');
  };

  const handlePostClick = () => {
    if (!isAuthenticated) {
      setSnackbar({
        open: true,
        message: '로그인이 필요한 서비스입니다.',
        severity: 'warning',
      });
      navigate('/login');
      window.scrollTo(0, 0);
    } else {
      navigate('/new-post');
      window.scrollTo(0, 0);
    }
  };

  const handlePlaylistClick = () => {
    if (!isAuthenticated) {
      setSnackbar({
        open: true,
        message: '로그인이 필요한 서비스입니다.',
        severity: 'warning',
      });
      navigate('/login');
    } else {
      handleModalOpen();
    }
  };

  const handlePrimaryClick = async () => {
    if (!playlistTitle.trim()) {
      return;
    }
    if (playlistTitle.length < 1 || playlistTitle.length > 50) {
      setTitleError('플레이리스트의 제목은 1자 이상, 50자 이하여야 합니다.');
      return;
    }
    try {
      await createEmptyPlaylist(playlistTitle);
      handleModalClose();
      setSnackbar({
        open: true,
        message: '새 플레이리스트가 생성되었습니다.',
        severity: 'success',
      });
    } catch (error) {
      handleModalClose();
      setSnackbar({
        open: true,
        message: '플레이리스트 생성에 실패했습니다. 다시 시도해 주세요.',
        severity: 'error',
      });
    }
  };

  const handleSecondaryClick = () => handleModalClose();

  const actions = [
    {
      icon: <DriveFileRenameOutline />,
      name: 'New Post',
      onClick: handlePostClick,
    },
    {
      icon: <QueueMusicIcon />,
      name: 'New Playlist',
      onClick: handlePlaylistClick,
    },
  ];

  return (
    <>
      <SpeedDial
        ariaLabel="SpeedDial New post/playlist"
        sx={{ position: 'fixed', bottom: 24, right: 24 }}
        icon={<SpeedDialIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
      >
        {actions.map(action => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={
              <Tooltip title={action.name} arrow>
                <Box sx={{ fontSize: '0.8rem' }}>{action.name}</Box>
              </Tooltip>
            }
            tooltipOpen
            onClick={() => {
              action.onClick();
              handleClose(); // Close the SpeedDial after an action is clicked
            }}
          />
        ))}
      </SpeedDial>

      <FormModal
        open={modalOpen}
        onClose={handleModalClose}
        title="New Playlist"
        description={`새 플레이리스트의 제목을 정해주세요!\n플레이리스트 생성 후, 검색창을 통해 음악을 추가할 수 있습니다.`}
        formFields={[
          {
            label: 'Title of playlist',
            type: 'text',
            value: playlistTitle,
            onChange: e => {
              setPlaylistTitle(e.target.value);
              setTitleError('');
            },
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
    </>
  );
};

export default SpeedDialButton;
