import { Suspense, lazy } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { Route, Routes } from 'react-router-dom';

const Main = lazy(() => import('./pages/main/Main'));
const MyPage = lazy(() => import('./pages/mypage/MyPage'));
const Comment = lazy(() => import('./pages/comment/Comment'));
const Login = lazy(() => import('./pages/auth/login/Login'));
const Signup = lazy(() => import('./pages/auth/signup/Signup'));
const EditProfile = lazy(() => import('./pages/mypage/edit/EditProfile'));
const EditPassword = lazy(() => import('./pages/mypage/edit/EditPassword'));
const Search = lazy(() => import('./pages/search/SearchPage'));
const Forbidden = lazy(() => import('./pages/error/code/Forbidden'));
const InternalServerError = lazy(
  () => import('./pages/error/code/InternalServerError'),
);
const NotFound = lazy(() => import('./pages/error/code/NotFound'));
const ServiceUnavailable = lazy(
  () => import('./pages/error/code/ServiceUnavailable'),
);
const UserPage = lazy(() => import('./pages/userpage/UserPage'));
const Discover = lazy(() => import('./pages/board/Discover'));
const AllTags = lazy(() => import('./pages/board/AllTags'));
const PopularTags = lazy(() => import('./pages/board/PopularTags'));
const NewPost = lazy(() => import('./pages/post/NewPost'));
const EditPost = lazy(() => import('./pages/post/EditPost'));
const PostDetail = lazy(() => import('./pages/post/PostDetail'));
const PlaylistDetail = lazy(
  () => import('./pages/mypage/playlist/PlaylistDetail'),
);
const Withdraw = lazy(() => import('./pages/mypage/edit/Withdraw'));

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
        <Route path="/my-page" element={<MyPage />} />
        <Route path="/comment" element={<Comment />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/edit-password" element={<EditPassword />} />
        <Route path="/search" element={<Search />} />
        <Route path="/403" element={<Forbidden />} />
        <Route path="/500" element={<InternalServerError />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="/503" element={<ServiceUnavailable />} />
        <Route path="/user/:userId" element={<UserPage />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/all-tags" element={<AllTags />} />
        <Route path="/popular-tags" element={<PopularTags />} />
        <Route path="/new-post" element={<NewPost />} />
        <Route path="/edit-post/:postId" element={<EditPost />} />
        <Route path="/post/:postId" element={<PostDetail />} />
        <Route
          path="/my-page/playlist/:playlistId"
          element={<PlaylistDetail />}
        />
        <Route path="/withdraw" element={<Withdraw />} />
      </Routes>
    </Suspense>
  );
};

export default Router;
