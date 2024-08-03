import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BaseContainer from '../../../components/layout/BaseContainer';
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { AddPhotoAlternate } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [passwordMatchError, setPasswordMatchError] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [marketingAccepted, setMarketingAccepted] = useState(false);
  const [privacyPolicyAccepted, setPrivacyPolicyAccepted] = useState(false);
  const [allAccepted, setAllAccepted] = useState(false);
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

  // 전체 동의 체크박스 핸들러
  const handleAllAcceptedChange = event => {
    const isChecked = event.target.checked;
    setAllAccepted(isChecked);
    setTermsAccepted(isChecked);
    setMarketingAccepted(isChecked);
    setPrivacyPolicyAccepted(isChecked);
  };

  // 로그인화면으로 버튼 액션
  const handleNavigateLogin = () => {
    navigate('/login');
  };

  // 회원가입 버튼 액션
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
  const isFormValid =
    email && password && nickname && termsAccepted && privacyPolicyAccepted;

  return (
    <BaseContainer>
      <Typography variant="title">Sign Up</Typography>
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
            label="이메일"
            fullWidth
            type="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
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
            label="닉네임"
            fullWidth
            required
            value={nickname}
            onChange={e => setNickname(e.target.value)}
            margin="normal"
          />
          {/* 약관 동의 */}
          <Box sx={{ width: '100%', my: 3 }}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={allAccepted}
                    onChange={handleAllAcceptedChange}
                  />
                }
                label={
                  <Typography sx={{ fontWeight: 'bold' }}>전체 동의</Typography>
                }
              />
              <Divider sx={{ my: 1 }} />
              <FormControlLabel
                required
                control={
                  <Checkbox
                    size="small"
                    checked={termsAccepted}
                    onChange={e => setTermsAccepted(e.target.checked)}
                  />
                }
                label="서비스 이용약관에 동의합니다."
              />
              <FormControlLabel
                required
                control={
                  <Checkbox
                    size="small"
                    checked={privacyPolicyAccepted}
                    onChange={e => setPrivacyPolicyAccepted(e.target.checked)}
                  />
                }
                label="개인정보 수집 및 이용에 동의합니다."
              />
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    checked={marketingAccepted}
                    onChange={e => setMarketingAccepted(e.target.checked)}
                  />
                }
                label="마케팅 정보 수신에 동의합니다."
              />
            </FormGroup>
          </Box>
          {/* 버튼 */}
          <Box sx={{ width: '100%', display: 'flex', mt: 5, gap: 2 }}>
            <Button
              variant="outlined"
              onClick={handleNavigateLogin}
              sx={{ flex: 1 }}
              size="large"
            >
              로그인 화면으로
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={{ flex: 1 }}
              disabled={!isFormValid}
              size="large"
            >
              회원가입
            </Button>
          </Box>
        </form>
      </Box>
    </BaseContainer>
  );
};

export default Signup;
