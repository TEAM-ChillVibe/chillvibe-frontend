import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    mode: 'dark', // 다크모드
    primary: {
      main: '#D8A1F0', // 포인트컬러
      light: '#F3E5F5',
    },
    secondary: {
      main: '#F3DAF5',
      light: '#F3E5F5',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#000000', // 기본 배경색
      paper: '#1f1f1f', // 카드와 같은 요소의 배경색
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#DDD', // 보조 텍스트 색상
      date: '#999', // 보조 텍스트 색상
      dark: '#000',
    },
  },
  typography: {
    fontFamily: 'Pretendard, Roboto, Arial, sans-serif',
    h1: {
      fontSize: '2rem',
    },
    h2: {
      fontSize: '1.5rem',
    },
    body1: {
      fontSize: '1rem',
    },
    body2: {
      fontSize: '0.875rem',
    },
    body3: {
      fontSize: '0.75rem',
    },
    title: {
      fontSize: '2rem',
    },
    subtitle1: {
      fontSize: '1.7rem',
      fontWeight: 500,
    },
    subtitleMypage: {
      fontSize: '1.6rem',
    },
    modalTitle: {
      fontSize: '1.6rem',
    },
    modalPoint: {
      fontSize: '1.6rem',
      color: '#D8A1F0',
    },
    searchQuery: {
      fontSize: '1.2rem',
      color: '#D8A1F0',
    },
    trackTitle: {
      fontSize: '1.2rem',
    },
    trackArtist: {
      fontSize: '0.7rem',
    },
    postDate: {
      fontSize: '0.8rem',
    },
  },
  spacing: 8,
});
