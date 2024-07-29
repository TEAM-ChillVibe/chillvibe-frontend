import Router from './Router';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import Footer from './components/layout/Footer';
import TopBar from './components/layout/TopBar/TopBar';
import TopButton from './components/common/Button/TopButton';

function App() {
  const theme = createTheme({
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
      fontFamily: 'Roboto, Arial, sans-serif',
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
    },
    spacing: 8,
  });

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline /> {/*공통 테마 적용*/}
        <BrowserRouter>
          <TopBar />
          <Router />
          <Footer />
          <TopButton />
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
