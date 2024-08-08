import { axiosWithToken, axiosWithoutToken } from '../../axios';

// 회원가입
export const signup = async formData => {
  try {
    const response = await axiosWithoutToken.post(`/api/signup`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

// 로그인
export const signin = async (email, password) => {
  try {
    const response = await axiosWithoutToken.post(`/login`, {
      email,
      password,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

// 로그아웃
export const signout = async () => {
  try {
    const response = await axiosWithToken.post(`/logout`);
    return response;
  } catch (error) {
    throw error;
  }
};

// 비밀번호 변경
export const editPassword = async (
  oldPassword,
  newPassword,
  confirmPassword,
) => {
  try {
    const response = await axiosWithToken.put(`/api/password`, {
      oldPassword,
      newPassword,
      confirmPassword,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

// 회원정보 수정
export const editProfile = async formData => {
  try {
    const response = await axiosWithToken.put('/api/users', {
      formData,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
