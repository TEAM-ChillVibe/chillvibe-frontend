import { Box, Button, TextField, Typography } from '@mui/material';
import BaseContainer from '../../components/layout/BaseContainer';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // 회원가입 버튼 액션
  const handleSignup = () => {
    navigate('/signup');
  };

  // 로그인 버튼 액션
  const handleSubmit = event => {
    event.preventDefault();
    // 로그인 정보를 서버로 전송하는 로직 추가
  };

  // 입력 여부 확인 (버튼 활성화용)
  const isFormValid = email && password;

  return (
    <BaseContainer>
      <Typography variant="title">Login</Typography>
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
        <form onSubmit={handleSubmit}>
          {/* 회원정보 입력 필드 */}
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
          {/* 버튼 */}
          <Box sx={{ width: '100%', display: 'flex', mt: 6, gap: 2 }}>
            <Button variant="outlined" onClick={handleSignup} sx={{ flex: 1 }}>
              회원가입
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={{ flex: 1 }}
              disabled={!isFormValid}
            >
              로그인
            </Button>
          </Box>
        </form>
      </Box>
    </BaseContainer>
  );
};

export default Login;
