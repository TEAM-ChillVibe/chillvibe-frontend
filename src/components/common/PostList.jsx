import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import PostListItem from './ListItem/PostListItem';

const PostList = ({ selectedHashtag, sortOrder }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // API 호출을 통해 게시글 데이터를 가져온다
    // post 관련 store 구현 후에 코드 작성 예정
    //
  }, [selectedHashtag, sortOrder]);

  return (
    <Box sx={{ p: 2 }}>
      {posts.length > 0 ? (
        posts.map(post => <PostListItem key={post.id} post={post} />)
      ) : (
        <Typography>게시글이 없습니다.</Typography>
      )}
    </Box>
  );
};

export default PostList;
