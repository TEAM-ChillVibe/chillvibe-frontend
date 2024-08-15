import React, { useState } from 'react';
import {
  Box,
  Button,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { withdraw } from '../../../api/auth/authApi';
import IconButton from '@mui/material/IconButton';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import SnackbarAlert from '../../../components/common/Alert/SnackbarAlert';
import SimpleModal from '../../../components/common/Modal/SimpleModal';
import { signout } from '../../../api/auth/authApi';
import BaseContainer from '../../../components/layout/BaseContainer';

const Withdraw = () => {
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  // 스낵바
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const handleSubmit = async event => {
    event.preventDefault();

    setModalOpen(true);
  };

  const handleModalClose = () => setModalOpen(false);

  const handleConfirm = async () => {
    setModalOpen(false);
    try {
      await withdraw(confirmPassword);
      await signout();
      setSnackbar({
        open: true,
        message: '탈퇴되었습니다.',
        severity: 'success',
      });
    } catch (error) {
      // 에러 처리
      if (error.response) {
        const { code } = error.response.data;
        if (code === 'U004') {
          setConfirmPassword('');
          setError('');
          setSnackbar({
            open: true,
            message: '잘못된 비밀번호입니다.',
            severity: 'error',
          });
        } else {
          navigate('/');
        }
      } else {
        setSnackbar({
          open: true,
          message: '서버에 연결할 수 없습니다. 다시 시도해 주세요.',
          severity: 'error',
        });
      }
    }
  };

  const handleSkip = () => {
    navigate(-1); // 이전 페이지로 이동
  };

  const handleConfirmPassword = e => {
    setConfirmPassword(e.target.value);
    if (error) {
      setError('');
    }
  };

  return (
    <BaseContainer>
      <Box
        sx={{
          width: '60%',
          minWidth: '300px',
          maxWidth: '450px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          m: '0 auto',
          p: 2,
        }}
      >
        <Typography variant="title" sx={{ mb: 3 }}>
          탈퇴
        </Typography>
        <Box sx={{ width: '100%' }}>
          <form onSubmit={handleSubmit}>
            <TextField
              label="비밀번호"
              fullWidth
              type={showConfirmPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={handleConfirmPassword}
              margin="normal"
              error={!!error}
              helperText={error}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Box sx={{ width: '100%', display: 'flex', mt: 5, gap: 2 }}>
              <Button
                variant="outlined"
                onClick={handleSkip}
                sx={{ flex: 1 }}
                size="large"
              >
                뒤로가기
              </Button>
              <Button
                type="submit"
                variant="contained"
                sx={{ flex: 1 }}
                size="large"
                color="error"
              >
                탈퇴하기
              </Button>
            </Box>
          </form>
        </Box>
        <SimpleModal
          open={modalOpen}
          onClose={handleModalClose}
          description="정말 탈퇴하시겠습니까?"
          primaryButtonText="확인"
          secondaryButtonText="취소"
          onPrimaryClick={handleConfirm}
          onSecondaryClick={handleModalClose}
          primaryButtonStyle="error"
        />

        <SnackbarAlert
          open={snackbar.open}
          onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
          message={snackbar.message}
          severity={snackbar.severity}
        />
      </Box>
    </BaseContainer>
  );
};

export default Withdraw;
