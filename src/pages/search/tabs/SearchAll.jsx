import React from 'react';
import { List, ListItem, ListItemText, Typography } from '@mui/material';

const SearchAll = ({ results }) => {
  if (!results)
    return <Typography>검색 결과를 불러오는 중입니다...</Typography>;

  const { trackContent = [], postContent = [] } = results;

  return (
    <>
      <Typography variant="h6">Tracks (Top 5)</Typography>
      {trackContent.length > 0 ? (
        <List>
          {trackContent.map(track => (
            <ListItem key={track.id}>
              <ListItemText primary={track.name} secondary={track.artistName} />
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography>트랙 검색 결과가 없습니다.</Typography>
      )}

      <Typography variant="h6">Posts (Top 5)</Typography>
      {postContent.length > 0 ? (
        <List>
          {postContent.map(post => (
            <ListItem key={post.id}>
              <ListItemText primary={post.title} secondary={post.author} />
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography>게시글 검색 결과가 없습니다.</Typography>
      )}
    </>
  );
};

export default SearchAll;
