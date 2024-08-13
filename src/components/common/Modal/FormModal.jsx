import React from 'react';
import { Modal, Box, Typography, Button, TextField } from '@mui/material';

const FormModal = ({
  open,
  onClose,
  title,
  description,
  formFields,
  primaryButtonText,
  secondaryButtonText,
  onPrimaryClick,
  onSecondaryClick,
  isPrimaryButtonDisabled,
  errorMessage,
}) => {
  // 플레이리스트의 제목을 입력하고 Enter 누르면 생성
  const handleSubmit = event => {
    event.preventDefault();
    onPrimaryClick(event);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="form-modal-title"
      aria-describedby="form-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'auto',
          bgcolor: '#1f1f1f',
          borderRadius: 1,
          boxShadow: 24,
          py: 4,
          px: 6,
        }}
      >
        <Typography
          id="form-modal-title"
          variant="modalTitle"
          sx={{ display: 'flex', justifyContent: 'center' }}
        >
          {title}
        </Typography>
        <Typography
          id="form-modal-description"
          sx={{
            display: 'flex',
            justifyContent: 'center',
            mt: 3,
            whiteSpace: 'pre-line', // 줄바꿈을 문자열에 포함
            textAlign: 'center',
          }}
        >
          {description}
        </Typography>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          sx={{ mt: 5 }}
          onSubmit={handleSubmit}
        >
          {formFields.map((field, index) => (
            <TextField
              key={index}
              label={field.label}
              variant="outlined"
              fullWidth
              margin="dense"
              type={field.type || 'text'}
              value={field.value || ''}
              onChange={field.onChange || (() => {})}
            />
          ))}
        </Box>
        {errorMessage && ( // 에러 메시지 표시
          <Typography color="error" sx={{ mt: 2, textAlign: 'center' }}>
            {errorMessage}
          </Typography>
        )}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5, gap: 1 }}>
          <Button onClick={onSecondaryClick} color="inherit">
            {secondaryButtonText}
          </Button>
          <Button
            onClick={onPrimaryClick}
            variant="contained"
            color="primary"
            disabled={isPrimaryButtonDisabled}
          >
            {primaryButtonText}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default FormModal;
