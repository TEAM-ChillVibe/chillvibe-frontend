import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import { theme } from './styles/globalStyle';

/**
 * dayjs 설정
 */
import dayjs from 'dayjs';
import isLeapYear from 'dayjs/plugin/isLeapYear'; // 윤년 판단 플러그인
import 'dayjs/locale/ko'; // 한국어

dayjs.extend(isLeapYear);
dayjs.locale('ko');

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/*공통 테마 적용*/}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
