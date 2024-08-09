import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { fetchPostById, deletePost } from '../../api/post/postApi';
import { myInfo } from '../../api/user/userApi';
import {
  Box,
  Typography,
  Avatar,
  Chip,
  List,
  ListItem,
  Button,
} from '@mui/material';
import BaseContainer from '../../components/layout/BaseContainer';
import Comment from '../../pages/comment/Comment';
import TrackListItem from '../../components/common/ListItem/TrackListItem';
import LikeButton from '../../components/common/Button/LikeButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteModal from '../../components/common/Modal/DeleteModal';

const PostDetail = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ✔️ 새로운 상태 추가: isOwner
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    const getPost = async () => {
      try {
        const response = await fetchPostById(postId);
        setPost(response);

        // ✔️ 현재 사용자 정보 가져오기 및 작성자 여부 확인
        const userData = await myInfo();
        if (userData.id === response.user.id) {
          setIsOwner(true); // 사용자가 작성자인 경우에만 true로 설정
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    getPost();
  }, [postId]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleDelete = async () => {
    try {
      await deletePost(postId);
      setPost(null);
      navigate('/discover');
    } catch (error) {
      console.error('Error deleting post:', error);
    } finally {
      closeModal();
    }
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography>Error loading post: {error.message}</Typography>;
  }

  return (
    <BaseContainer>
      <Box sx={{ mb: 2 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
              {post.title}
            </Typography>
            <Typography variant="body2" sx={{ color: '#aaa' }}>
              트랙 {post.playlists.trackCount}개 | {post.createdAt}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <Box display="flex" alignItems="center" sx={{ mr: 2 }}>
              <LikeButton postId={postId} initialLikeCount={post.likeCount} />
            </Box>
            {isOwner && (
              <>
                <Button
                  variant="contained" // `contained` 스타일로 변경
                  startIcon={<EditIcon />}
                  onClick={() => navigate(`/edit-post/${postId}`)}
                  sx={{
                    color: '#fff',
                    backgroundColor: '#555', // 회색으로 설정
                    mr: 2,
                    '&:hover': { backgroundColor: '#777' }, // hover 시 조금 더 밝은 회색으로
                  }}
                >
                  수정
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  startIcon={<DeleteIcon />}
                  onClick={openModal}
                >
                  삭제
                </Button>
              </>
            )}
          </Box>
        </Box>

        {/* 설명 텍스트 */}
        <Typography variant="body1" sx={{ mt: 2, mb: 1, textAlign: 'left' }}>
          {post.description}
        </Typography>

        {/* 해시태그 */}
        <Box
          sx={{
            mb: 2,
            display: 'flex',
            flexWrap: 'wrap',
            gap: 1,
            textAlign: 'left',
          }}
        >
          {post.hashtags &&
            post.hashtags.map(hashtag => (
              <Chip
                key={hashtag.id}
                label={`# ${hashtag.name}`}
                sx={{
                  backgroundColor: '#444',
                  color: '#fff',
                  borderRadius: '4px',
                }}
              />
            ))}
        </Box>
      </Box>

      {/* 트랙 리스트 */}
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
        Tracks
      </Typography>
      <List sx={{ width: '100%', bgcolor: 'background.paper', mb: 4 }}>
        {post.playlists &&
        post.playlists.tracks &&
        post.playlists.tracks.length > 0 ? (
          post.playlists.tracks.map(track => (
            <ListItem
              key={track.id}
              disablePadding
              sx={{ mb: 1, borderBottom: '1px solid #ccc' }}
            >
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

      {/* 사용자 정보 */}
      {post.user && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            mt: 4,
            mb: 4,
            p: 2,
            borderRadius: '8px',
          }}
        >
          {/* Avatar와 사용자 이름에 Link를 추가 */}
          <Link
            to={`/user/${post.user.id}`}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <Avatar
              src={post.user.profileUrl}
              alt={post.user.nickname}
              sx={{ width: 64, height: 64 }}
            />
          </Link>
          <Box sx={{ ml: 2 }}>
            <Link
              to={`/user/${post.user.id}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <Typography variant="h6">{post.user.nickname}</Typography>
            </Link>
            <Typography variant="body2" color="textSecondary">
              Check out my latest playlist! A mix of old favorites and new
              discoveries!
            </Typography>
          </Box>
        </Box>
      )}
      {/* 댓글 섹션 */}
      <Typography variant="h6" sx={{ mt: 4, fontWeight: 'bold' }}>
        Comments
      </Typography>
      <Comment postId={postId} />

      {/* 삭제 모달 */}
      <DeleteModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onDelete={handleDelete}
      />
    </BaseContainer>
  );
};

export default PostDetail;
