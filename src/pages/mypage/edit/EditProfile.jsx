import BaseContainer from '../../../components/layout/BaseContainer';
import {
  Avatar,
  Box,
  Button,
  TextField,
  FormControlLabel,
  Switch,
  Typography,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { AddPhotoAlternate } from '@mui/icons-material';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchAllHashtags } from '../../../api/hashtag/hashtagApi';
import { editProfile, myInfo } from '../../../api/user/userApi';
import SnackbarAlert from '../../../components/common/Alert/SnackbarAlert';
import MultiHashtagChips from '../../../components/common/HashtagChips/MultiHashtagChips';

const EditProfile = () => {
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [introduction, setIntroduction] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [imagePreview, setImagePreview] = useState('');
  const [selectedHashtags, setSelectedHashtags] = useState([]);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });
  const navigate = useNavigate();

  useEffect(() => {
    // 사용자 정보를 가져오는 비동기 함수
    const fetchUserData = async () => {
      try {
        const response = await myInfo();
        const userData = response;

        // 사용자 정보 상태 업데이트
        setEmail(userData.email);
        setNickname(userData.nickname);
        setIntroduction(userData.introduction || '');
        setImagePreview(userData.profileUrl || '');
        setIsPublic(userData.public);
        const userHashtags = userData.hashtags.map(hashtag => hashtag.id);
        setSelectedHashtags(userHashtags);
      } catch (error) {
        setSnackbar({
          open: true,
          message: '사용자 정보를 가져오는 데 실패했습니다.',
          severity: 'error',
        });
      }
    };

    fetchUserData();
  }, []);

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

  const handleCancel = () => {
    navigate(-1); // 이전 페이지로 이동
  };

  const handleSubmit = async event => {
    event.preventDefault();

    // 사용자 정보 업데이트 API 호출
    try {
      const formData = new FormData();
      const userUpdateDto = {
        nickname,
        introduction,
        hashtagIds: selectedHashtags,
        isPublic,
      };

      formData.append('userUpdateDto', JSON.stringify(userUpdateDto));

      if (profileImage) {
        formData.append('profileImg', profileImage);
      }

      if (window.confirm('회원정보를 수정하시겠습니까?')) {
        await editProfile(formData);
        setSnackbar({
          open: true,
          message: '회원정보가 수정되었습니다.',
          severity: 'success',
        });
        setTimeout(() => {
          navigate('/my-page');
        }, 1500);
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: '프로필 업데이트에 실패했습니다. 다시 시도해 주세요.',
        severity: 'error',
      });
    }
  };

  const isFormValid = email && nickname;

  const handleSelectionChange = newSelection => {
    setSelectedHashtags(newSelection);
  };

  const handleWithdraw = () => {
    navigate('/withdraw');
  };

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
            label="이메일"
            fullWidth
            value={email}
            InputProps={{
              readOnly: true,
            }}
            margin="normal"
            disabled
          />
          <TextField
            label="닉네임"
            fullWidth
            required
            value={nickname}
            onChange={e => setNickname(e.target.value)}
            margin="normal"
          />
          <TextField
            label="소개글"
            fullWidth
            multiline
            rows={5}
            value={introduction}
            onChange={e => setIntroduction(e.target.value)}
            margin="normal"
          />
          <Typography variant="body1" sx={{ mt: 2, mb: 1 }}>
            해시태그 선택
          </Typography>
          <MultiHashtagChips
            fetchHashtags={fetchAllHashtags}
            selectedHashtags={selectedHashtags}
            onSelectionChange={handleSelectionChange}
          />
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            sx={{ mt: 5 }}
          >
            <FormControlLabel
              label="내 게시글 공개"
              labelPlacement="start"
              control={
                <Switch
                  checked={isPublic}
                  onChange={() => setIsPublic(prev => !prev)}
                />
              }
            />
          </Box>
          {/* 버튼 */}
          <Box sx={{ width: '100%', display: 'flex', mt: 8, gap: 2 }}>
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
        <Button
          variant="outlined"
          color="error"
          onClick={handleWithdraw}
          sx={{ flex: 1, mt: 20, width: '100%' }}
          size="large"
        >
          회원 탈퇴하기
        </Button>
      </Box>

      <SnackbarAlert
        open={snackbar.open}
        onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
        message={snackbar.message}
        severity={snackbar.severity}
      />
    </BaseContainer>
  );
};

export default EditProfile;
