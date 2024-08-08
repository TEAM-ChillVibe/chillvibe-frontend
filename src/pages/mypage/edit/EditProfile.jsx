import BaseContainer from '../../../components/layout/BaseContainer';
import {
  Avatar,
  Box,
  Button,
  TextField,
  FormControlLabel,
  Switch,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { AddPhotoAlternate } from '@mui/icons-material';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosWithToken } from '../../../axios';
import { fetchAllHashtags } from '../../../api/hashtag/hashtagApi';
import HashtagChips from '../../../components/common/HashtagChips';

const EditProfile = () => {
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [introduction, setIntroduction] = useState(''); // 소개글 상태 추가
  const [profileImage, setProfileImage] = useState(null);
  const [isPublic, setIsPublic] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [selectedHashtags, setSelectedHashtags] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // 사용자 정보를 가져오는 비동기 함수
    const fetchUserData = async () => {
      try {
        const response = await axiosWithToken.get('/api/mypage'); // 적절한 API 엔드포인트로 수정하세요.
        const userData = response.data;

        console.log(response.data);

        // 사용자 정보 상태 업데이트
        setEmail(userData.email);
        setNickname(userData.nickname);
        setIntroduction(userData.introduction || ''); // 소개글 추가
        setImagePreview(userData.profileUrl || ''); // 프로필 이미지 URL이 있을 경우 미리보기 설정
        setIsPublic(userData.public);
      } catch (error) {}
    };

    fetchUserData();
  }, []);

  const handleHashtagClick = tagId => {
    setSelectedHashtags(prevSelected =>
      prevSelected.includes(tagId)
        ? prevSelected.filter(id => id !== tagId)
        : [...prevSelected, tagId],
    );
  };

  const fetchHashtags = async () => {
    try {
      const response = await fetchAllHashtags();
      return response;
    } catch (error) {
      console.error('Error fetching hashtags:', error);
      return [];
    }
  };

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
      formData.append('email', email);
      formData.append('nickname', nickname);
      formData.append('introduction', introduction);
      if (profileImage) {
        formData.append('profileImage', profileImage);
      }

      await axiosWithToken.put('/api/mypage', formData); // 적절한 API 엔드포인트로 수정하세요.
      navigate('/mypage'); // 성공 후 리디렉션
    } catch (error) {}
  };

  const isFormValid = email && nickname;

  const handleChangePassword = () => {
    navigate('/edit-password'); // 비밀번호 변경 페이지로 이동
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
            value={email}
            InputProps={{
              readOnly: true,
            }}
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
          <HashtagChips
            fetchHashtags={fetchHashtags}
            selectedHashtag={selectedHashtags}
            onHashtagClick={handleHashtagClick}
            multiSelectMode={true}
          />
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{ mt: 5 }}
          >
            <FormControlLabel
              label="게시글 공개"
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
        <Button
          variant="text"
          fullWidth
          onClick={handleChangePassword}
          sx={{ flex: 1, my: 5 }}
          size="large"
        >
          비밀번호 변경
        </Button>
      </Box>
    </BaseContainer>
  );
};

export default EditProfile;
