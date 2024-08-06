import React, { useRef, useEffect, useState } from 'react';
import {
  List,
  ListItem,
  Box,
  Typography,
  CircularProgress,
} from '@mui/material';
import PostListItem from '../../../components/common/ListItem/PostListItem';

const SearchPosts = ({ results, onLoadMore }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLastPage, setIsLastPage] = useState(false);
  const lastItemRef = useRef(null);

  useEffect(() => {
    if (
      results &&
      results.content &&
      results.content.length > 0 &&
      !isLastPage
    ) {
      const observer = new IntersectionObserver(
        async entries => {
          if (entries[0].isIntersecting) {
            setIsLoading(true);
            await onLoadMore();
            setIsLoading(false);
          }
        },
        { threshold: 1 },
      );

      if (lastItemRef.current) {
        observer.observe(lastItemRef.current);
      }

      return () => {
        if (lastItemRef.current) {
          observer.unobserve(lastItemRef.current);
        }
      };
    }
  }, [results, onLoadMore, isLastPage]);

  useEffect(() => {
    if (
      results &&
      results.page &&
      results.page.totalPages !== undefined &&
      results.page.number !== undefined
    ) {
      setIsLastPage(results.page.number + 1 >= results.page.totalPages);
    }
  }, [results]);

  if (!results || !results.content || results.content.length === 0)
    return <Typography>게시글 검색 결과가 없습니다.</Typography>;

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        게시글 검색 결과
      </Typography>
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {results.content.map((post, index) => (
          <ListItem
            key={post.id}
            disablePadding
            sx={{ mb: 1 }}
            ref={index === results.content.length - 1 ? lastItemRef : null}
          >
            <PostListItem
              post={{
                ...post,
                user: {
                  id: post.user.id,
                  name: post.user.nickname,
                  avatar: post.user.profileUrl,
                },
                likes: post.likeCount,
              }}
            />
          </ListItem>
        ))}
      </List>
      {isLoading && !isLastPage && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
};

export default SearchPosts;
