import { axiosWithToken, axiosWithoutToken } from '../../axios';
import useUserStore from '../../store/useUserStore';

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
    const response = await axiosWithoutToken.post(`/api/login`, {
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
    const response = await axiosWithToken.post(`/api/logout`);
    return response;
  } catch (error) {
    const { logout } = useUserStore.getState();
    logout();
    localStorage.clear();
    window.location.href = '/';
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

// 재인증 store 세팅
export const reauth = async () => {
  try {
    const response = await axiosWithToken.get(`/api/reauth`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 토큰 재발급
export const reissue = async () => {
  try {
    const response = await axiosWithoutToken.post(`/api/reissue`);
    return response;
  } catch (error) {
    throw error;
  }
};

// 탈퇴
export const withdraw = async password => {
  try {
    const response = await axiosWithToken.post(`/api/users/delete`, {
      password,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
