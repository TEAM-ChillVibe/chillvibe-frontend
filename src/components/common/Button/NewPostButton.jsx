import { Fab } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useMusicPlayerStore from '../../../store/useMusicPlayerStore';
import useUserStore from '../../../store/useUserStore';
import SnackbarAlert from '../Alert/SnackbarAlert';
import React, { useState } from 'react';
import { DriveFileRenameOutline } from '@mui/icons-material';

const NewPostButton = () => {
  const navigate = useNavigate();
  const { isVisible: isMusicPlayerVisible } = useMusicPlayerStore();
  const { isAuthenticated } = useUserStore();

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const handleClick = () => {
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

  return (
    <>
      <Fab
        size="medium"
        color="primary"
        aria-label="new post"
        onClick={handleClick}
        sx={{
          position: 'fixed',
          // bottom: isMusicPlayerVisible ? 100 : 24,
          bottom: 80,
          left: 24,
        }}
      >
        <DriveFileRenameOutline />
      </Fab>
      <SnackbarAlert
        open={snackbar.open}
        onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
        message={snackbar.message}
        severity={snackbar.severity}
      />
    </>
  );
};

export default NewPostButton;
