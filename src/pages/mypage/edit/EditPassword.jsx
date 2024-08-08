import React, { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { editPassword } from '../../../api/auth/authApi';

const EditPassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [oldPasswordError, setOldPasswordError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async event => {
    event.preventDefault();

    // 비밀번호 확인
    if (newPassword !== confirmPassword) {
      setError('새 비밀번호와 확인 비밀번호가 일치하지 않습니다.');
      return;
    }

    // 기존 비밀번호와 새로운 비밀번호가 같을 경우
    if (oldPassword === newPassword) {
      setError('기존 비밀번호와 새 비밀번호가 동일합니다.');
      return;
    }

    setError('');
    setOldPasswordError('');

    // 확인 창 표시
    const isConfirmed = window.confirm('비밀번호를 변경하시겠습니까?');
    if (!isConfirmed) {
      return; // 사용자가 취소를 클릭하면 아무 작업도 하지 않음
    }

    try {
      await editPassword(oldPassword, newPassword, confirmPassword);

      // 변경 성공 알림
      window.alert('비밀번호가 성공적으로 변경되었습니다.');

      navigate('/my-page');
    } catch (error) {
      // 에러 처리
      if (error.response) {
        const { code } = error.response.data;
        if (code === 'U004') {
          setOldPasswordError('현재 비밀번호가 틀렸습니다.');
        } else {
          setError('비밀번호 변경에 실패했습니다. 다시 시도해 주세요.');
        }
      } else {
        setError('서버에 연결할 수 없습니다. 다시 시도해 주세요.');
      }
    }
  };

  const handleSkip = () => {
    navigate(-1); // 이전 페이지로 이동
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
          type="password"
          value={oldPassword}
          onChange={e => setOldPassword(e.target.value)}
          margin="normal"
          error={!!oldPasswordError}
          helperText={oldPasswordError}
        />
        <TextField
          label="새 비밀번호"
          fullWidth
          type="password"
          value={newPassword}
          onChange={e => setNewPassword(e.target.value)}
          margin="normal"
        />
        <TextField
          label="비밀번호 확인"
          fullWidth
          type="password"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          margin="normal"
          error={!!error}
          helperText={error}
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
    </Box>
  );
};

export default EditPassword;
