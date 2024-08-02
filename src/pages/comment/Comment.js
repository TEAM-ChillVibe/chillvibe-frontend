import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import BaseContainer from '../../components/layout/BaseContainer';
import axios from 'axios';

const CommentSectionWrapper = styled.div`
  background-color: #1c1c1c;
  padding: 20px;
  border-radius: 10px;
  margin-top: 20px;
  color: white;
  font-family: 'Arial', sans-serif;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  max-width: 1200px;
`;

const CommentWrapper = styled.div`
  background-color: #2a2a2a;
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 10px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

const CommentAvatar = styled.img`
  width: 55px;
  height: 55px;
  border-radius: 50%;
  margin-right: 30px;
`;

const CommentDetails = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const CommentHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const CommentAuthorDateWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const CommentAuthor = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-top: 5px;
`;

const CommentDate = styled.div`
  font-size: 12px;
  color: #888;
  margin-top: 4px;
`;

const CommentContent = styled.div`
  font-size: 15px;
  line-height: 1;
`;

const CommentActions = styled.div`
  display: flex;
  align-items: center;
`;

const ActionButton = styled.button`
  background-color: transparent;
  border: none;
  color: #888;
  cursor: pointer;
  margin-left: 10px;

  &:hover {
    color: white;
  }
`;

const CommentInput = styled.textarea`
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #444;
  background-color: #333;
  color: white;
  resize: none;
  margin-bottom: 10px;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #777;
  }
`;

const CommentButton = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: #45a049;
  }
`;

const Comment = () => {
  const { postId } = useParams(); // URL에서 postId를 가져옴
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingContent, setEditingContent] = useState('');

  const token =
    'eyJhbGciOiJIUzI1NiJ9.eyJjYXRlZ29yeSI6ImFjY2VzcyIsInN1YiI6IjIiLCJlbWFpbCI6InNqQGV4YW1wbGUuY29tIiwiaWF0IjoxNzIyNTYzOTAwLCJleHAiOjE3MjI1NjYwNjB9._cuxvBC02Lu0NnJ6OrP6veP24ua4h0uvUyoye29sQ-4';

  useEffect(() => {
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
        setComments(
          comments.map(comment =>
            comment.id === editingCommentId ? response.data : comment,
          ),
        );
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
    if (!email) return '';
    const atIndex = email.indexOf('@');
    return `${email.slice(0, Math.min(4, atIndex))}***`;
  };

  return (
    <BaseContainer>
      <CommentSectionWrapper>
        <h2>Comments</h2>
        {comments.map(comment => (
          <CommentWrapper key={comment.id}>
            <CommentAvatar src={comment.userProfileUrl} alt="Profile" />
            <CommentDetails>
              <CommentHeader>
                <div>
                  <CommentAuthor>
                    {comment.userNickname} ({getMaskedEmail(comment.userEmail)})
                  </CommentAuthor>
                </div>
              </CommentHeader>
              {editingCommentId === comment.id ? (
                <>
                  <CommentInput
                    value={editingContent}
                    onChange={handleEditChange}
                  />
                  <CommentButton onClick={handleEditSubmit}>
                    Update
                  </CommentButton>
                </>
              ) : (
                <>
                  <CommentContent>{comment.content}</CommentContent>
                  <CommentDate>
                    {new Date(comment.modifiedAt).toLocaleString()}
                    {comment.createdAt !== comment.modifiedAt && (
                      <span style={{ marginLeft: '10px', color: '#888' }}>
                        수정됨
                      </span>
                    )}
                  </CommentDate>
                </>
              )}
            </CommentDetails>
            <CommentActions>
              <ActionButton
                onClick={() => handleEdit(comment.id, comment.content)}
              >
                Edit
              </ActionButton>
              <ActionButton onClick={() => handleDelete(comment.id)}>
                Delete
              </ActionButton>
            </CommentActions>
          </CommentWrapper>
        ))}
        <CommentInput
          placeholder="Write a new comment"
          value={newComment}
          onChange={handleNewCommentChange}
        />
        <CommentButton onClick={handleCommentSubmit}>Submit</CommentButton>
      </CommentSectionWrapper>
    </BaseContainer>
  );
};

export default Comment;
