import { create } from 'zustand';

const useUserStore = create(set => ({
  // 기본 상태
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: localStorage.getItem('token') || null,
  isAuthenticated: JSON.parse(localStorage.getItem('isAuthenticated')) || false,

  login: (user, token) => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
    localStorage.setItem('isAuthenticated', JSON.stringify(true));
    set({ user, token, isAuthenticated: true });
  },

  logout: () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('isAuthenticated');
    set({ user: null, token: null, isAuthenticated: false });
  },

  setUser: user => {
    localStorage.setItem('user', JSON.stringify(user));
    set({ user });
  },

  clearUser: () => {
    localStorage.removeItem('user');
    set({ user: null });
  },
}));

export default useUserStore;
