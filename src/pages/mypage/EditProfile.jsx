import BaseContainer from '../../components/layout/BaseContainer';
import { Avatar, Box, Button, TextField } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { AddPhotoAlternate } from '@mui/icons-material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [passwordMatchError, setPasswordMatchError] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const navigate = useNavigate();

  // 프로필 이미지 변경 핸들러
  const handleImageChange = event => {
    const file = event.target.files[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // 취소 버튼 액션
  const handleCancel = () => {
    navigate(-1); // 이전 페이지로 이동
  };

  // 저장 버튼 액션
  const handleSubmit = event => {
    event.preventDefault();

    // 비밀번호 확인
    if (password !== confirmPassword) {
      setPasswordMatchError('비밀번호가 일치하지 않습니다.');
      return;
    }
    setPasswordMatchError('');

    // 회원가입 정보를 서버로 전송하는 로직 추가
  };

  // 입력 여부 확인 (버튼 활성화용)
  const isFormValid = email && password && nickname;

  return (
    <BaseContainer>
      <Box
        sx={{
          width: '70%',
          minWidth: '350px',
          maxWidth: '500px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          m: '0 auto',
          p: 2,
        }}
      >
        <form onSubmit={handleSubmit}>
          {/* 프로필 이미지 추가 영역 */}
          <Box
            sx={{
              position: 'relative',
              width: 150,
              height: 150,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              mb: 4,
              mx: 'auto',
            }}
          >
            <Avatar sx={{ width: 150, height: 150 }} src={imagePreview} />
            <IconButton
              component="label"
              sx={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                bgcolor: 'background.paper',
                borderRadius: '50%',
              }}
            >
              <AddPhotoAlternate />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                hidden
              />
            </IconButton>
          </Box>
          {/* 회원정보 입력 필드 */}
          <TextField
            label="닉네임"
            fullWidth
            required
            value={nickname}
            onChange={e => setNickname(e.target.value)}
            margin="normal"
          />
          <TextField
            label="이메일"
            fullWidth
            // value={email}
            value="email@example.com"
            InputProps={{
              readOnly: true,
            }}
            margin="normal"
          />
          <TextField
            label="비밀번호"
            fullWidth
            type="password"
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
            margin="normal"
          />
          <TextField
            label="비밀번호 확인"
            fullWidth
            type="password"
            required
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            margin="normal"
            error={!!passwordMatchError}
            helperText={passwordMatchError}
          />
          <TextField
            label="소개글"
            fullWidth
            multiline
            rows={5}
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            margin="normal"
          />
          {/* 버튼 */}
          <Box sx={{ width: '100%', display: 'flex', mt: 5, gap: 2 }}>
            <Button
              variant="outlined"
              onClick={handleCancel}
              sx={{ flex: 1 }}
              size="large"
            >
              취소
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={{ flex: 1 }}
              size="large"
              disabled={!isFormValid}
            >
              저장
            </Button>
          </Box>
        </form>
      </Box>
    </BaseContainer>
  );
};

export default EditProfile;
