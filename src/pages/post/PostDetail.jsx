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
import { formatDate, formatRelativeTime } from '../../utils/reusableFn';

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

  // 생성일과 수정일을 포맷하여 사용
  const createdAt = post.createdAt;
  const modifiedAt = post.modifiedAt;
  const isModified = createdAt !== modifiedAt;

  const formattedCreatedAt = formatDate(createdAt);
  const formattedModifiedAt = formatRelativeTime(modifiedAt);

  return (
    <BaseContainer>
      <Typography variant="h4">{post.title}</Typography>
      <Typography variant="body2">
        트랙 {post.playlists.trackCount}개 | {formattedCreatedAt}
      </Typography>
      {isModified && (
        <Typography variant="body2" color="textSecondary">
          수정됨 ({formattedModifiedAt})
        </Typography>
      )}
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
                  name: track.name,
                  artist: track.artist,
                  thumbnailUrl: track.thumbnailUrl,
                  duration: track.duration,
                  previewUrl: track.previewUrl,
                }}
              />
            </ListItem>
          ))
        ) : (
          <Typography>No tracks available</Typography>
        )}
      </List>

      <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
        Comments
      </Typography>
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
      <Box sx={{ width: '100%', mt: -10 }}>
        <Comment />
      </Box>
    </BaseContainer>
  );
};

export default PostDetail;
