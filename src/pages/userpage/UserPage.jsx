import BaseContainer from '../../components/layout/BaseContainer';
import { Box, Typography } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import UserProfile from '../../components/common/UserProfile';
import MyPostListItem from '../../components/common/ListItem/MyPostListItem';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { axiosWithToken } from '../../axios';

const UserPage = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [postList, setPostList] = useState([]); // 초기 상태를 빈 배열로 설정
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPublic, setIsPublic] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const userResponse = await axiosWithToken.get(`/api/userpage`, {
          params: { userId }, // 쿼리 파라미터로 userId를 전달합니다.
        });
        const postResponse = await axiosWithToken.get(
          `/api/posts/user/${userId}`,
        );

        setUser(userResponse.data);
        setPostList(postResponse.data.content);
        setIsPublic(userResponse.data.public);
      } catch (err) {
        setError('사용자 정보를 가져오는 데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, [userId]);

  if (loading) {
    return (
      <BaseContainer>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            my: 15,
          }}
        >
          <Typography variant="h6">로딩 중...</Typography>
        </Box>
      </BaseContainer>
    );
  }

  if (error) {
    return (
      <BaseContainer>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            my: 15,
          }}
        >
          <Typography variant="h6" color="error">
            {error}
          </Typography>
        </Box>
      </BaseContainer>
    );
  }

  if (!isPublic) {
    return (
      <BaseContainer>
        <UserProfile user={user} />
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            my: 15,
          }}
        >
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              mb: 1,
            }}
          >
            <LockIcon sx={{ fontSize: '2rem', mr: 1 }} />
            <Typography variant="h1" sx={{ fontWeight: 'bold' }}>
              비공개 계정입니다.
            </Typography>
          </Box>
          <Typography variant="span" sx={{ fontSize: '0.8rem' }}>
            해당 사용자의 게시글을 열람할 수 없습니다.
          </Typography>
        </Box>
      </BaseContainer>
    );
  }

  return (
    <BaseContainer>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
        }}
      >
        <UserProfile user={user} />
      </Box>
      <Typography variant="subtitleMypage">Posts</Typography>
      <Box sx={{ width: '100%', my: 2 }}>
        {postList.length === 0 ? (
          <Typography variant="body1" sx={{ textAlign: 'center', my: 15 }}>
            아직 게시물이 없습니다.
          </Typography>
        ) : (
          <>
            {postList.map(post => (
              <MyPostListItem key={post.id} post={post} />
            ))}
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }} />
          </>
        )}
      </Box>
    </BaseContainer>
  );
};

export default UserPage;
