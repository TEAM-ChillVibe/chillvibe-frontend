import { Suspense, lazy } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { Route, Routes } from 'react-router-dom';

const Main = lazy(() => import('./pages/main/Main'));
const TestPage = lazy(() => import('./pages/temp/TestPage'));
const MyPage = lazy(() => import('./pages/mypage/MyPage'));
const Comment = lazy(() => import('./pages/comment/Comment'));
const Login = lazy(() => import('./pages/login/Login'));
const Signup = lazy(() => import('./pages/signup/Signup'));

const Router = () => {
  return (
    <Suspense
      fallback={
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
          }}
        >
          <CircularProgress color="secondary" />
        </Box>
      }
    >
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/my-page" element={<MyPage />} />
        <Route path="/comment" element={<Comment />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Suspense>
  );
};

export default Router;
