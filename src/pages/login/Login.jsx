import { Box, Button, TextField, Typography } from '@mui/material';
import BaseContainer from '../../components/layout/BaseContainer';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = () => {
    navigate('/signup');
  };

  const handleSubmit = event => {
    event.preventDefault();
    // 로그인 정보를 서버로 전송하는 로직 추가
  };

  const isFormValid = email && password;

  return (
    <BaseContainer>
      <Typography variant="title">Login</Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: '60%',
          minWidth: '300px',
          maxWidth: '450px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2,
          m: '0 auto',
          p: 2,
        }}
      >
        <TextField
          label="Email"
          fullWidth
          type="email"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          fullWidth
          type="password"
          required
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <Box sx={{ width: '100%', display: 'flex', mt: 4, gap: 2 }}>
          <Button variant="outlined" onClick={handleSignup} sx={{ flex: 1 }}>
            Sign Up
          </Button>
          <Button
            type="submit"
            variant="contained"
            sx={{ flex: 1 }}
            disabled={!isFormValid}
          >
            Login
          </Button>
        </Box>
      </Box>
    </BaseContainer>
  );
};

export default Login;
