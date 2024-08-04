import React from 'react';
import { List, ListItem, Box, Pagination, Typography } from '@mui/material';
import PostListItem from '../../../components/common/ListItem/PostListItem';

const SearchPosts = ({ results, onPageChange }) => {
  if (!results || !results.postContent)
    return <Typography>게시글 검색 결과가 없습니다.</Typography>;

  const handlePageChange = (event, value) => {
    onPageChange(value - 1);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        게시글 검색 결과
      </Typography>
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {results.postContent.map(post => (
          <ListItem key={post.id} disablePadding sx={{ mb: 1 }}>
            <PostListItem
              post={{
                ...post,
                likes: post.likeCount,
              }}
            />
          </ListItem>
        ))}
      </List>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <Pagination
          count={Math.ceil(results.totalPosts / results.pageSize)}
          page={results.currentPage + 1}
          onChange={handlePageChange}
        />
      </Box>
    </Box>
  );
};

// Post List
// const postList = [
//   {
//     id: 1,
//     title: '여름밤 드라이브 플레이리스트',
//     date: '2024년 7월 25일',
//     trackCount: 15,
//     hashtags: ['#팝', '#여름', '#드라이브'],
//     user: {
//       id: 2,
//       name: 'Alice',
//       avatar: 'https://example.com/alice.jpg',
//     },
//     likes: 3256,
//   },

export default SearchPosts;
