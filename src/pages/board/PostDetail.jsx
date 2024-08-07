import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPostById } from '../../api/post/postApi';
import {
  Box,
  Typography,
  Avatar,
  Chip,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import BaseContainer from '../../components/layout/BaseContainer';
import Comment from '../comment/Comment';
import TrackListItem from '../../components/common/ListItem/TrackListItem';

const PostDetail = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getPost = async () => {
      try {
        const response = await fetchPostById(postId);
        console.log(response);
        setPost(response);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    getPost();
  }, [postId]);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography>Error loading post: {error.message}</Typography>;
  }

  return (
    <BaseContainer>
      <Typography variant="h4">{post.title}</Typography>
      <Typography variant="body1">{post.description}</Typography>

      {post.user && (
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar src={post.user.profileUrl} alt={post.user.nickname} />
          <Typography variant="body1" sx={{ ml: 2 }}>
            {post.user.nickname}
          </Typography>
        </Box>
      )}

      <Box sx={{ mb: 2 }}>
        {post.hashtags &&
          post.hashtags.map(hashtag => (
            <Chip key={hashtag.id} label={hashtag.name} sx={{ mr: 1 }} />
          ))}
      </Box>

      <Typography variant="h6">Tracks</Typography>
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {post.playlists &&
        post.playlists.tracks &&
        post.playlists.tracks.length > 0 ? (
          post.playlists.tracks.map((track, index) => (
            <ListItem key={track.id} disablePadding sx={{ mb: 1 }}>
              <TrackListItem
                music={{
                  title: track.name,
                  artist: track.artist,
                  albumCover: track.thumbnailUrl,
                  duration: track.duration,
                  audioSrc: track.previewUrl,
                }}
              />
            </ListItem>
          ))
        ) : (
          <Typography>No tracks available</Typography>
        )}
      </List>

      <Typography variant="h6">Comments</Typography>
      {/* <List>
        {post.comments &&
          post.comments.map(comment => (
            <ListItem key={comment.id}>
              <ListItemText
                primary={comment.content}
                secondary={comment.userNickname}
              />
            </ListItem>
          ))}
      </List> */}
      <Comment />
    </BaseContainer>
  );
};

export default PostDetail;
