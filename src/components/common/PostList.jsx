import { useEffect, useState, useRef, useCallback } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import PostListItem from './ListItem/PostListItem';
import { fetchAllPosts, fetchPostsByHashtagId } from '../../api/post/postApi';

const PostList = ({ selectedHashtag, sortOrder }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true); // 더 가져올 게시물이 있는지 확인
  const observer = useRef();

  const itemsPerPage = 6;

  // 게시물 가져오기 함수
  const loadPosts = useCallback(async () => {
    setLoading(true);
    try {
      const data = selectedHashtag
        ? await fetchPostsByHashtagId(
            selectedHashtag,
            sortOrder,
            page,
            itemsPerPage,
          )
        : await fetchAllPosts(sortOrder, page, itemsPerPage);

      setPosts(prevPosts => [...prevPosts, ...data.content]);
      setHasMore(data.content.length > 0);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [selectedHashtag, sortOrder, page]);

  // 무한 스크롤을 위한 마지막 요소 감지
  const lastPostElementRef = useCallback(
    node => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(
        entries => {
          if (entries[0].isIntersecting && hasMore) {
            setPage(prevPage => prevPage + 1);
          }
        },
        {
          rootMargin: '80px', // 이 값을 조정하여 감지 시작 위치를 조정할 수 있습니다.
        },
      );

      if (node) observer.current.observe(node);
    },
    [loading, hasMore],
  );

  useEffect(() => {
    // 정렬 순서나 해시태그 변경 시 게시물 초기화
    setPosts([]);
    setPage(0);
    setHasMore(true);
  }, [selectedHashtag, sortOrder]);

  useEffect(() => {
    loadPosts();
  }, [page, loadPosts]);

  return (
    <Box sx={{ width: '100%' }}>
      {posts.length === 0 && !loading && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            py: 10,
          }}
        >
          <Typography>게시글이 없습니다.</Typography>
        </Box>
      )}
      {posts.map((post, index) => (
        <Box
          key={post.id}
          ref={index === posts.length - 1 ? lastPostElementRef : null} // 마지막 요소 감지
        >
          <PostListItem post={post} selectedHashtag={selectedHashtag} />
        </Box>
      ))}
      {loading && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            py: 10,
          }}
        >
          <CircularProgress color="secondary" />
        </Box>
      )}
    </Box>
  );
};

export default PostList;
