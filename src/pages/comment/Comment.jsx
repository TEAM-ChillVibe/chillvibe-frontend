import React, { useState, useEffect } from 'react';
import {
  getCommentsByPost,
  createComment,
  updateComment,
  deleteComment,
} from '../../api/comment/commentApi';
import { Avatar, Box, Button, TextField, Typography } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { formatDate } from '../../utils/reusableFn';
import SimpleModal from '../../components/common/Modal/SimpleModal';
import SnackbarAlert from '../../components/common/Alert/SnackbarAlert';
import useUserStore from '../../store/useUserStore';

const Comment = () => {
  const { postId } = useParams(); // URL에서 postId를 가져옴
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingContent, setEditingContent] = useState('');
  const [userId, setUserId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);
  const [loginModalOpen, setLoginModalOpen] = useState(false); // 로그인 모달 상태 추가
  const [newCommentError, setNewCommentError] = useState('');
  const [editingCommentError, setEditingCommentError] = useState('');
  const navigate = useNavigate();

  const { user } = useUserStore(state => ({
    user: state.user,
  }));

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  useEffect(() => {
    // 토큰 디코딩하여 사용자 ID 가져오기
    const token = localStorage.getItem('access');
    if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      setUserId(decodedToken.sub); // sub => 사용자 ID 나타냄
      console.log('Decoded User ID:', decodedToken.sub);
    }

    // 댓글 데이터를 가져오는 함수 (API 요청)
    getCommentsByPost(postId)
      .then(response => setComments(response))
      .catch(error => {
        console.error('Error fetching comments:', error);
      });
  }, [postId]);

  const handleNewCommentChange = e => {
    setNewComment(e.target.value);
    if (e.target.value.length > 255) {
      setNewCommentError('댓글은 255자 이내로 작성해주세요.');
    } else {
      setNewCommentError('');
    }
  };

  const handleCommentClick = () => {
    if (!userId) {
      setLoginModalOpen(true); // 비로그인 상태에서 다이얼로그 열기
    }
  };

  const handleLoginModalClose = () => {
    setLoginModalOpen(false);
  };

  const handleLogin = () => {
    setLoginModalOpen(false); // 모달 닫기
    navigate('/login'); // 로그인 페이지로 이동
    window.scrollTo(0, 0); // 페이지 이동 후 맨위로 스크롤
  };

  // 생성
  const handleCommentSubmit = () => {
    if (newComment.length > 255) {
      setNewCommentError('댓글은 255자 이내로 작성해주세요.');
      return;
    }
    createComment({ content: newComment, postId })
      .then(response => {
        setComments(prevComments => {
          // 새로운 댓글을 추가한 후, 전체 목록의 마지막에 추가
          const updatedComments = [...prevComments, response];
          return updatedComments;
        });
        setNewComment('');
        setNewCommentError('');
      })
      .catch(error => {
        setSnackbar({
          open: true,
          message: '댓글 작성에 실패했습니다. 다시 시도해 주세요.',
          severity: 'error',
        });
      });
  };

  const handleEdit = (id, content) => {
    setEditingCommentId(id);
    setEditingContent(content);
  };

  const handleEditChange = e => {
    setEditingContent(e.target.value);
    if (e.target.value.length > 255) {
      setEditingCommentError('댓글은 255자 이내로 작성해주세요.');
    } else {
      setEditingCommentError('');
    }
  };

  // 수정
  const handleEditSubmit = () => {
    if (editingContent.length > 255) {
      setEditingCommentError('댓글은 255자 이내로 작성해주세요.');
      return;
    }
    updateComment(editingCommentId, { content: editingContent })
      .then(response => {
        setComments(prevComments => {
          const updatedComments = prevComments.map(comment =>
            comment.id == editingCommentId
              ? {
                  ...comment,
                  content: response.content,
                  modifiedAt: response.modifiedAt,
                }
              : comment,
          );
          setSnackbar({
            open: true,
            message: '댓글이 수정되었습니다.',
            severity: 'success',
          });
          return updatedComments;
        });
        setEditingCommentId(null);
        setEditingContent('');
        setEditingCommentError('');
      })
      .catch(error => {
        setSnackbar({
          open: true,
          message: '댓글 수정에 실패했습니다. 다시 시도해 주세요',
          severity: 'error',
        });
      });
  };

  // 삭제
  const handleDelete = id => {
    setCommentToDelete(id);
    setModalOpen(true);
  };

  const handleConfirmDelete = () => {
    deleteComment(commentToDelete)
      .then(() => {
        setComments(comments.filter(comment => comment.id !== commentToDelete));
        setModalOpen(false);
        setSnackbar({
          open: true,
          message: '댓글이 삭제되었습니다.',
          severity: 'success',
        });
      })
      .catch(error => {
        setSnackbar({
          open: true,
          message: '댓글 삭제에 실패했습니다. 다시 시도해 주세요.',
          severity: 'error',
        });
      });
  };

  const handleCancelDelete = () => {
    setCommentToDelete(null);
    setModalOpen(false);
  };

  // 이메일 일부 표시
  const getMaskedEmail = email => {
    if (!email) {
      return '';
    }
    const atIndex = email.indexOf('@');
    return `${email.slice(0, Math.min(4, atIndex))}***`;
  };

  return (
    <Box sx={{ width: '100%', px: 2 }}>
      {comments.length === 0 && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100px',
            mb: 2,
          }}
        >
          <Typography variant="body2">첫 번째 댓글을 작성해보세요!</Typography>
        </Box>
      )}
      {comments.map(comment => (
        <Box key={comment.id} sx={{ p: 2, mb: 2, width: '100%' }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              width: '100%',
            }}
          >
            <Avatar
              src={comment.userProfileUrl}
              sx={{ width: 55, height: 55, mr: 2 }}
            />
            <Box sx={{ flexGrow: 1 }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  mb: 1,
                }}
              >
                <Typography variant="h6" sx={{ fontSize: '1rem' }}>
                  {comment.userNickname} ({getMaskedEmail(comment.userEmail)})
                </Typography>
              </Box>
              {editingCommentId === comment.id ? (
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-betweem',
                    alignItems: 'flex-end',
                    mt: 1,
                  }}
                >
                  <TextField
                    multiline
                    fullWidth
                    row={4}
                    variant="outlined"
                    value={editingContent}
                    onChange={handleEditChange}
                    sx={{ mr: 1 }}
                    error={Boolean(editingCommentError)}
                    helperText={editingCommentError}
                  />
                  <Button
                    variant="contained"
                    size="small"
                    onClick={handleEditSubmit}
                    sx={{ ml: 1 }}
                    disabled={Boolean(editingCommentError)}
                  >
                    수정
                  </Button>
                </Box>
              ) : (
                <>
                  <Typography
                    variant="body1"
                    paragraph
                    sx={{ mb: 1 }}
                    dangerouslySetInnerHTML={{
                      // 줄바꿈을 <br> 태그로 변환하여 HTML로 렌더링
                      __html: comment.content.replace(/\n/g, '<br />'),
                    }}
                  />
                  <Typography variant="date">
                    {formatDate(comment.modifiedAt)}
                  </Typography>
                  {comment.createdAt !== comment.modifiedAt && (
                    <Typography
                      variant="caption"
                      color="text.date"
                      sx={{ ml: 0.5 }}
                    >
                      (수정됨)
                    </Typography>
                  )}
                </>
              )}
            </Box>
            {comment.userId == userId && ( // 댓글 작성자와 현재 사용자가 동일한 경우에만 버튼 표시
              <Box display="flex" flexDirection="column" alignItems="end">
                <Button
                  size="small"
                  color="error"
                  onClick={() => handleDelete(comment.id)}
                >
                  삭제
                </Button>
                {editingCommentId !== comment.id && (
                  <Button
                    size="small"
                    color="inherit"
                    onClick={() => handleEdit(comment.id, comment.content)}
                  >
                    수정
                  </Button>
                )}
              </Box>
            )}
          </Box>
        </Box>
      ))}
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          alignItems: 'flex-start',
          gap: 2,
          px: 2,
          my: 5,
        }}
      >
        <Avatar src={user?.profileUrl} sx={{ width: 55, height: 55 }} />
        <TextField
          multiline
          fullWidth
          rows={4}
          variant="outlined"
          placeholder="Write a new comment"
          value={newComment}
          onChange={handleNewCommentChange}
          onClick={handleCommentClick}
          sx={{ mb: 2 }}
          error={Boolean(newCommentError)}
          helperText={newCommentError}
        />
        <Button
          variant="contained"
          onClick={handleCommentSubmit}
          disabled={Boolean(newCommentError) || newComment.length === 0} // 0자 이거나 255자 이상이면 버튼 비활성화
        >
          등록
        </Button>
      </Box>

      <SimpleModal
        open={loginModalOpen}
        onClose={handleLoginModalClose}
        description={`댓글을 작성하려면 로그인해야 합니다.\n로그인 페이지로 이동하시겠습니까?`}
        primaryButtonText="확인"
        secondaryButtonText="취소"
        onPrimaryClick={handleLogin}
        onSecondaryClick={handleLoginModalClose}
      />

      <SimpleModal
        open={modalOpen}
        onClose={handleCancelDelete}
        description="댓글을 삭제하시겠습니까?"
        primaryButtonText="삭제"
        secondaryButtonText="취소"
        onPrimaryClick={handleConfirmDelete}
        onSecondaryClick={handleCancelDelete}
      />

      <SnackbarAlert
        open={snackbar.open}
        onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
        message={snackbar.message}
        severity={snackbar.severity}
      />
    </Box>
  );
};

export default Comment;
