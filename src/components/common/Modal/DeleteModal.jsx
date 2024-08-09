import React from 'react';

const DeleteModal = ({ isOpen, onClose, onDelete }) => {
  if (!isOpen) return null;

  const modalOverlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  };

  const modalContentStyle = {
    backgroundColor: '#000',
    color: '#fff',
    padding: '20px',
    borderRadius: '8px',
    textAlign: 'center',
    width: '400px',
  };

  const modalActionsStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '20px',
  };

  const buttonStyle = {
    padding: '10px 20px',
    border: '1px solid #fff',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
    flex: 1,
  };

  const cancelButtonStyle = {
    ...buttonStyle,
    backgroundColor: 'transparent',
    color: '#fff',
    marginRight: '10px',
  };

  const deleteButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#d9534f',
    color: '#fff',
  };

  return (
    <div style={modalOverlayStyle}>
      <div style={modalContentStyle}>
        <h2>Delete Post</h2>
        <p>
          정말 삭제하시겠습니까?
          <br />
          삭제된 게시글은 복구할 수 없습니다.
        </p>
        <div style={modalActionsStyle}>
          <button style={cancelButtonStyle} onClick={onClose}>
            취소
          </button>
          <button style={deleteButtonStyle} onClick={onDelete}>
            삭제
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
