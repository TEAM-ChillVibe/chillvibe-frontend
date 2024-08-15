import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    mode: 'dark', // 다크모드
    primary: {
      main: '#CC8DF0',
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
    title: {
      fontSize: '2rem',
      fontWeight: 500,
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
      fontSize: '1rem',
      fontWeight: 600,
      color: '#CC8DF0',
    },
    searchQuery: {
      fontSize: '1.2rem',
      color: '#CC8DF0',
    },
    trackTitle: {
      fontSize: '1.1rem',
    },
    trackArtist: {
      fontSize: '0.7rem',
    },
    date: {
      fontSize: '0.8rem',
      color: '#999',
    },
    ranking: {
      fontSize: '0.9rem',
      fontWeight: 700,
    },
  },
  spacing: 8,
});
