import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BaseContainer from '../../components/layout/BaseContainer';
import axios from 'axios';
import {
  Avatar,
  Box,
  Button,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';

const Comment = () => {
  const { postId } = useParams(); // URL에서 postId를 가져옴
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingContent, setEditingContent] = useState('');
  const [userId, setUserId] = useState(null);

  const token =
    'eyJhbGciOiJIUzI1NiJ9.eyJjYXRlZ29yeSI6ImFjY2VzcyIsInN1YiI6IjEiLCJlbWFpbCI6InRlc3RAZXhhbXBsZS5jb20iLCJpYXQiOjE3MjI1NzA4ODAsImV4cCI6MTcyMjU3MzA0MH0.f4KzeDrKOdVWUSR-7FWZXCyAMgqmQSlNjVco4-vF2I4';

  useEffect(() => {
    // 토큰 디코딩하여 사용자 ID 가져오기
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    setUserId(decodedToken.sub); // sub => 사용자 ID 나타냄
    console.log('Decoded User ID:', decodedToken.sub);

    // 댓글 데이터를 가져오는 함수 (API 요청)
    axios
      .get(`http://localhost:8080/api/comments/byPost?postId=1`)
      .then(response => setComments(response.data))
      .catch(error => console.error('Error fetching comments:', error));
  }, [postId]);

  const handleNewCommentChange = e => {
    setNewComment(e.target.value);
  };

  // 생성
  const handleCommentSubmit = () => {
    // localStorage에서 토큰 가져옴
    // const token = localStorage.getItem('authToken');
    axios
      .post(
        'http://localhost:8080/api/comments',
        { content: newComment, postId: 1 },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then(response => {
        setComments(prevComments => {
          // 새로운 댓글을 추가한 후, 전체 목록을 최신순으로 정렬
          const updatedComments = [...prevComments, response.data].sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
          );
          return updatedComments;
        });
        setNewComment('');
      })
      .catch(error => console.error('Error posting comment:', error));
  };

  const handleEdit = (id, content) => {
    setEditingCommentId(id);
    setEditingContent(content);
  };

  const handleEditChange = e => {
    setEditingContent(e.target.value);
  };

  // 수정
  const handleEditSubmit = () => {
    // const token = localStorage.getItem('authToken');
    axios
      .put(
        `http://localhost:8080/api/comments/${editingCommentId}`,
        { content: editingContent },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then(response => {
        setComments(prevComments => {
          const updatedComments = prevComments.map(comment =>
            comment.id == editingCommentId
              ? {
                  ...comment,
                  content: response.data.content,
                  modifiedAt: response.data.modifiedAt,
                }
              : comment,
          );
          console.log('Updated Comments:', updatedComments);
          return updatedComments;
        });
        setEditingCommentId(null);
        setEditingContent('');
      })
      .catch(error => console.error('Error editing comment:', error));
  };

  // 삭제
  const handleDelete = id => {
    if (window.confirm('댓글을 삭제하시겠습니까?')) {
      // const token = localStorage.getItem('authToken');
      axios
        .delete(`http://localhost:8080/api/comments/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          setComments(comments.filter(comment => comment.id !== id));
        })
        .catch(error => console.error('Error deleting comment:', error));
    }
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
    <BaseContainer>
      <Box sx={{ width: '100%' }}>
        <Typography variant="h5" sx={{ pb: 2 }}>
          Comments
        </Typography>
        {comments.map(comment => (
          <Paper key={comment.id} sx={{ p: 2, mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
              <Avatar
                src={comment.userProfileUrl}
                alt="Profile"
                sx={{ width: 55, height: 55, mr: 2 }}
              />
              <Box sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Typography variant="h6">
                    {comment.userNickname} ({getMaskedEmail(comment.userEmail)})
                  </Typography>
                </Box>
                {editingCommentId === comment.id ? (
                  <>
                    <TextField
                      multiline
                      fullWidth
                      row={4}
                      variant="outlined"
                      value={editingContent}
                      onChange={handleEditChange}
                      sx={{ mb: 2 }}
                    />
                    <Button variant="contained" onClick={handleEditSubmit}>
                      Update
                    </Button>
                  </>
                ) : (
                  <>
                    <Typography variant="body1" paragraph>
                      {comment.content}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      {new Date(comment.modifiedAt).toLocaleString()}
                      {comment.createdAt !== comment.modifiedAt && (
                        <span style={{ marginLeft: '10px' }}>수정됨</span>
                      )}
                    </Typography>
                  </>
                )}
              </Box>
              {comment.userId == userId && ( // 댓글 작성자와 현재 사용자가 동일한 경우에만 버튼 표시
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <IconButton
                    onClick={() => handleEdit(comment.id, comment.content)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(comment.id)}>
                    <Delete />
                  </IconButton>
                </Box>
              )}
            </Box>
          </Paper>
        ))}
        <TextField
          multiline
          fullWidth
          rows={4}
          variant="outlined"
          placeholder="Write a new comment"
          value={newComment}
          onChange={handleNewCommentChange}
          sx={{ mb: 2 }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="contained" onClick={handleCommentSubmit} sx={{}}>
            Submit
          </Button>
        </Box>
      </Box>
    </BaseContainer>
  );
};

export default Comment;
