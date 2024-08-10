import ErrorPage from '../ErrorPage';

function NotFound() {
  return <ErrorPage errorCode="404" message="페이지를 찾을 수 없습니다" />;
}

export default NotFound;
