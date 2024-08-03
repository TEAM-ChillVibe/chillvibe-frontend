import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BaseContainer from '../../components/layout/BaseContainer';
import { Box, Button, TextField, Typography } from '@mui/material';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [passwordMatchError, setPasswordMatchError] = useState('');
  const navigate = useNavigate();

  // 로그인화면으로 버튼 액션
  const handleNavigateLogin = () => {
    navigate('/login');
  };

  // 회원가입 버튼 액션
  const handleSubmit = event => {
    event.preventDefault();

    // 비밀번호 확인
    if (password !== confirmPassword) {
      setPasswordMatchError('비밀번호가 일치하지 않습니다.');
      return;
    }
    setPasswordMatchError('');

    // 회원가입 정보를 서버로 전송하는 로직 추가
  };

  // 입력 여부 확인 (버튼 활성화용)
  const isFormValid = email && password && nickname;

  return (
    <BaseContainer>
      <Typography variant="title">Sign Up</Typography>
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
          p: 2,
        }}
      >
        <form onSubmit={handleSubmit}>
          {/* 회원정보 입력 필드 */}
          <TextField
            label="닉네임"
            fullWidth
            required
            value={nickname}
            onChange={e => setNickname(e.target.value)}
            margin="normal"
          />
          <TextField
            label="이메일"
            fullWidth
            type="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            margin="normal"
          />
          <TextField
            label="비밀번호"
            fullWidth
            type="password"
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
            margin="normal"
          />
          <TextField
            label="비밀번호 확인"
            fullWidth
            type="password"
            required
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            margin="normal"
            error={!!passwordMatchError}
            helperText={passwordMatchError}
          />
          {/* 버튼 */}
          <Box sx={{ width: '100%', display: 'flex', mt: 6, gap: 2 }}>
            <Button
              variant="outlined"
              onClick={handleNavigateLogin}
              sx={{ flex: 1 }}
            >
              로그인 화면으로
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={{ flex: 1 }}
              disabled={!isFormValid}
            >
              회원가입
            </Button>
          </Box>
        </form>
      </Box>
    </BaseContainer>
  );
};

export default Signup;
