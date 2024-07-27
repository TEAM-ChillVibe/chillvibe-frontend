import { Suspense, lazy } from 'react';
import { CircularProgress } from '@mui/material';
import { Route, Routes } from 'react-router-dom';

const Main = lazy(() => import('./pages/main/Main'));

const Router = () => {
  return (
    <Suspense fallback={<CircularProgress color="secondary" />}>
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
    </Suspense>
  );
};

export default Router;
