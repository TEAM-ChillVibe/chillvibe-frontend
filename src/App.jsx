import Router from './Router';
import { createTheme, ThemeProvider } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#007BFF',
      },
      secondary: {
        main: '#D8A1F0',
        light: '#F3E5F5',
        contrastText: '#FFFFFF',
      },
      background: {
        default: '#000000',
      },
      text: {
        primary: '#FFFFFF',
      },
    },
  });

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
