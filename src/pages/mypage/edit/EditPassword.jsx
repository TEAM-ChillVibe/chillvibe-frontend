import React, { useState } from 'react';
import { Box, Button, InputAdornment, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { editPassword } from '../../../api/auth/authApi';
import IconButton from '@mui/material/IconButton';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import SnackbarAlert from '../../../components/common/Alert/SnackbarAlert';
import SimpleModal from '../../../components/common/Modal/SimpleModal';

const EditPassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [confirmError, setConfirmError] = useState('');
  const [oldPasswordError, setOldPasswordError] = useState('');
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
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

    // 비밀번호 확인
    if (newPassword !== confirmPassword) {
      setError('새 비밀번호와 확인 비밀번호가 일치하지 않습니다.');
      return;
    }

    // 기존 비밀번호와 새로운 비밀번호가 같을 경우
    if (oldPassword === newPassword) {
      setConfirmError('기존 비밀번호와 새 비밀번호가 동일합니다.');
      return;
    }

    setModalOpen(true);
  };

  const handleModalClose = () => setModalOpen(false);

  const handleConfirm = async () => {
    setModalOpen(false);
    try {
      await editPassword(oldPassword, newPassword, confirmPassword);

      setSnackbar(prev => ({
        open: true,
        message: '비밀번호가 성공적으로 변경되었습니다.',
        severity: 'success',
      }));

      navigate('/my-page');
    } catch (error) {
      // 에러 처리
      if (error.response) {
        const { code } = error.response.data;
        if (code === 'U004') {
          setOldPasswordError('현재 비밀번호가 일치하지 않습니다.');
        } else {
          setSnackbar({
            open: true,
            message: '비밀번호 변경에 실패했습니다. 다시 시도해 주세요.',
            severity: 'error',
          });
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

  const handleOldPasswordChange = e => {
    setOldPassword(e.target.value);
    if (oldPasswordError) {
      setOldPasswordError('');
    }
  };

  const handleNewPasswordChange = e => {
    setNewPassword(e.target.value);
    if (confirmError) {
      setConfirmError('');
    }
  };

  const handleConfirmPasswordChange = e => {
    setConfirmPassword(e.target.value);
    if (error) {
      setError('');
    }
  };

  return (
    <Box
      sx={{
        width: '70%',
        minWidth: '350px',
        maxWidth: '500px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        m: '0 auto',
        mt: 15,
        p: 2,
      }}
    >
      <form onSubmit={handleSubmit}>
        <TextField
          label="현재 비밀번호"
          fullWidth
          type={showOldPassword ? 'text' : 'password'}
          value={oldPassword}
          onChange={handleOldPasswordChange}
          margin="normal"
          error={!!oldPasswordError}
          helperText={oldPasswordError}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowOldPassword(!showOldPassword)}
                  edge="end"
                >
                  {showOldPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          label="새 비밀번호"
          fullWidth
          type="password"
          type={showNewPassword ? 'text' : 'password'}
          onChange={handleNewPasswordChange}
          margin="normal"
          error={!!confirmError}
          helperText={confirmError}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  edge="end"
                >
                  {showNewPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          label="비밀번호 확인"
          fullWidth
          type={showConfirmPassword ? 'text' : 'password'}
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          margin="normal"
          error={!!error}
          helperText={error}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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
            다음에 변경하기
          </Button>
          <Button
            type="submit"
            variant="contained"
            sx={{ flex: 1 }}
            size="large"
          >
            비밀번호 변경
          </Button>
        </Box>
      </form>
      <SimpleModal
        open={modalOpen}
        onClose={handleModalClose}
        description="비밀번호를 변경하시겠습니까?"
        primaryButtonText="확인"
        secondaryButtonText="취소"
        onPrimaryClick={handleConfirm}
        onSecondaryClick={handleModalClose}
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

export default EditPassword;
