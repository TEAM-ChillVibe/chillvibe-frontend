import { Suspense, lazy } from 'react';
import { CircularProgress } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import TestPage from './pages/temp/TestPage';

const Main = lazy(() => import('./pages/main/Main'));

const Router = () => {
  return (
    <Suspense fallback={<CircularProgress color="secondary" />}>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/test" element={<TestPage />} />
      </Routes>
    </Suspense>
  );
};

export default Router;
