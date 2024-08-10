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
  ListItemText,
  Button,
} from '@mui/material';
import BaseContainer from '../../components/layout/BaseContainer';
import Comment from '../../pages/comment/Comment';
import TrackListItem from '../../components/common/ListItem/TrackListItem';
import LikeButton from '../../components/common/Button/LikeButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SimpleModal from '../../components/common/Modal/SimpleModal';

const PostDetail = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 현재 사용자가 포스트의 작성자인지 여부를 확인하는 상태
  const [isOwner, setIsOwner] = useState(false);

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

  useEffect(() => {
    const getPost = async () => {
      try {
        const postResponse = await fetchPostById(postId); // 게시글 정보 가져오기
        setPost(postResponse);

        const userResponse = await myInfo(); // 사용자 정보 가져오기
        console.log('Fetched post data:', postResponse);
        console.log('Fetched user data:', userResponse);

        // userResponse에 대한 구조 확인
        const postOwnerId = postResponse?.user?.userId;
        const currentUserId = userResponse?.userId || userResponse?.id; // 두 가지 경우 모두 확인

        console.log('Post Owner ID:', postOwnerId);
        console.log('Current User ID:', currentUserId);
        console.log('Type of Post Owner ID:', typeof postOwnerId);
        console.log('Type of Current User ID:', typeof currentUserId);

        if (postOwnerId && currentUserId) {
          if (String(postOwnerId) === String(currentUserId)) {
            // 동일한 타입으로 변환 후 비교
            console.log('User is the owner of the post.');
            setIsOwner(true); // 사용자가 작성자인 경우
          } else {
            console.log('User is NOT the owner of the post.');
            setIsOwner(false); // 사용자가 작성자가 아닌 경우
          }
        }
      } catch (error) {
        console.error('Failed to fetch post or user data:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    getPost();
  }, [postId]);

  // 렌더링 전 상태를 확인합니다.
  console.log('isOwner:', isOwner);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography>Error loading post: {error.message}</Typography>;
  }

  return (
    <BaseContainer>
      <Box sx={{ mb: 2, width: '100%' }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: 2, width: '100%' }}
        >
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
              {post.title}
            </Typography>
            <Typography variant="body2" sx={{ color: '#aaa' }}>
              트랙 {post.playlists.trackCount}개 | {post.createdAt}
            </Typography>
          </Box>
          {isOwner && (
            <Box display="flex" alignItems="center">
              <Box display="flex" alignItems="center" sx={{ mr: 2 }}>
                <LikeButton postId={postId} initialLikeCount={post.likeCount} />
              </Box>
              <Button
                variant="contained"
                startIcon={<EditIcon />}
                onClick={() => navigate(`/edit-post/${postId}`)}
                sx={{
                  color: '#fff',
                  backgroundColor: '#555',
                  mr: 2,
                  '&:hover': { backgroundColor: '#777' },
                }}
              >
                수정
              </Button>
              <Button
                variant="contained"
                startIcon={<DeleteIcon />}
                onClick={openModal}
                sx={{
                  backgroundColor: '#D895FF',
                  color: '#000',
                  '&:hover': {
                    backgroundColor: '#C27BFF',
                  },
                }}
              >
                삭제
              </Button>
            </Box>
          )}
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
          <Link
            to={`/user/${post.user.userId}`}
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
              to={`/user/${post.user.userId}`}
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
      <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
        Comments
      </Typography>
      <List>
        {post.comments && post.comments.length > 0 ? (
          post.comments.map(comment => (
            <ListItem key={comment.id}>
              <ListItemText
                primary={comment.content}
                secondary={comment.userNickname}
              />
            </ListItem>
          ))
        ) : (
          <Typography>No comments available.</Typography>
        )}
      </List>

      {/* 삭제 모달 */}
      {isOwner && ( // isOwner가 true일 때만 모달 관련 코드를 렌더링
        <SimpleModal
          open={isModalOpen}
          onClose={closeModal}
          title="Delete Post"
          description={`정말 삭제하시겠습니까?\n삭제된 게시글은 복구할 수 없습니다.`}
          primaryButtonText="삭제"
          secondaryButtonText="취소"
          onPrimaryClick={handleDelete}
          onSecondaryClick={closeModal}
        />
      )}
    </BaseContainer>
  );
};

export default PostDetail;
