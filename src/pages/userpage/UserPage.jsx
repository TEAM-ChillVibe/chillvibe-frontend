import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, CircularProgress, Card } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import BaseContainer from '../../components/layout/BaseContainer';
import UserProfile from '../../components/common/UserProfile';
import PostListItem from '../../components/common/ListItem/PostListItem';
import { userInfo } from '../../api/user/userApi';
import { fetchPostsByUserId } from '../../api/post/postApi';

const UserPage = () => {
  const { userId } = useParams(); // 파라미터에서 userId 추철
  const [user, setUser] = useState(null); // 사용자 정보
  const [postList, setPostList] = useState([]); // 게시글 목록
  const [loading, setLoading] = useState(true); //로딩 상태
  const [error, setError] = useState(null); // 에러 상태
  const [isPublic, setIsPublic] = useState(null); // 계정 공개 여부
  const [sortOrder, setSortOrder] = useState('latest'); // 정렬 순서
  const [page, setPage] = useState(0); // 현재 페이지 번호
  const [hasMore, setHasMore] = useState(true); // 추가 데이터 존재 여부
  const observer = useRef(); // Intersaction Observer 참조
  const navigate = useNavigate();

  // 무한스크롤을 위한 마지막 요소 참조 콜백
  const lastPostElementRef = useCallback(
    node => {
      if (loading) {
        return;
      }
      if (observer.current) {
        observer.current.disconnect();
      }
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore) {
          setPage(prevPage => prevPage + 1);
        }
      });
      if (node) {
        observer.current.observe(node);
      }
    },
    [loading, hasMore],
  );

  // 게시글 가져오기
  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetchPostsByUserId(userId, sortOrder, page);
      setPostList(prevPosts => [...prevPosts, ...response.content]);
      setHasMore(response.content.length > 0);
    } catch (err) {
      navigate('/500');
      setError('게시글을 가져오는 데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  }, [userId, sortOrder, page]);

  // 사용자 정보 가져오기
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const userResponse = await userInfo(userId);
        setUser(userResponse.data);
        setIsPublic(userResponse.data.public);
      } catch (err) {
        navigate('/404');
        setError('사용자 정보를 가져오는 데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, [userId]);

  // 정렬 순서나 공개여부 변경 시 게시글 목록 초기화
  useEffect(() => {
    if (isPublic) {
      setPostList([]);
      setPage(0);
      setHasMore(true);
    }
  }, [sortOrder, isPublic]);

  // 공개 계정일 경우 게시글 가져오기
  useEffect(() => {
    if (isPublic) {
      fetchPosts();
    }
  }, [fetchPosts, isPublic]);

  // 정렬 순서 변경 핸들러
  const handleSortChange = newSortOrder => {
    setSortOrder(newSortOrder);
    setPostList([]);
    setPage(0);
    setHasMore(true);
  };

  // 초기 로딩 중 표시
  if (loading && page === 0) {
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
          <CircularProgress />
        </Box>
      </BaseContainer>
    );
  }

  // 에러 발생 시 표시
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

  // 비공개 계정일 경우 표시
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

  // 공개 계정일 경우 사용자 프로필과 게시글 목록 표시
  return (
    <BaseContainer>
      <Card sx={{ width: '100%' }}>
        <UserProfile user={user} />
      </Card>
      <Typography variant="title">Posts</Typography>
      <Box sx={{ width: '100%' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'row',
            gap: 1,
            mb: 2,
          }}
        >
          <Typography
            variant="body2"
            sx={{
              cursor: 'pointer',
              fontWeight: sortOrder === 'latest' ? 'bold' : 'normal',
              color: sortOrder === 'latest' ? 'primary.main' : 'text.primary',
            }}
            onClick={() => handleSortChange('latest')}
          >
            최신순
          </Typography>
          <Typography
            variant="body2"
            sx={{
              cursor: 'pointer',
              fontWeight: sortOrder === 'popular' ? 'bold' : 'normal',
              color: sortOrder === 'popular' ? 'primary.main' : 'text.primary',
            }}
            onClick={() => handleSortChange('popular')}
          >
            인기순
          </Typography>
        </Box>
        {postList.length === 0 && !loading ? (
          <Typography variant="body1" sx={{ textAlign: 'center', my: 15 }}>
            아직 게시물이 없습니다.
          </Typography>
        ) : (
          <>
            {postList.map((post, index) => (
              <Box
                ref={index === postList.length - 1 ? lastPostElementRef : null}
                key={post.id}
              >
                <PostListItem post={post} />
              </Box>
            ))}
            {loading && (
              <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
                <CircularProgress sx={{ color: 'blue' }} />
              </Box>
            )}
          </>
        )}
      </Box>
    </BaseContainer>
  );
};

export default UserPage;
