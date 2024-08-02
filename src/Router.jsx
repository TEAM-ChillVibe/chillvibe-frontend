import { Suspense, lazy } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { Route, Routes } from 'react-router-dom';

const Main = lazy(() => import('./pages/main/Main'));
const TestPage = lazy(() => import('./pages/temp/TestPage'));
const Comment = lazy(() => import('./pages/comment/Comment'));

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
        <Route path="/comment" element={<Comment />} />
      </Routes>
    </Suspense>
  );
};

export default Router;
