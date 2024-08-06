import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    // 임시값
    primary: {
      main: '#007BFF',
      // main: '#333',
      light: '#999',
    },
    secondary: {
      main: '#D8A1F0',
      light: '#F3E5F5',
      contrastText: '#FFFFFF',
    },
    // background: {
    //   default: '#000000',
    // },
    // text: {
    //   primary: '#FFFFFF',
    // },
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
    subtitleMypage: {
      fontSize: '1.6rem',
    },
    modalTitle: {
      fontSize: '1.6rem',
    },
  },
  spacing: 8,
});
