import ErrorPage from '../ErrorPage';

function Forbidden() {
  return <ErrorPage errorCode="403" message="이 페이지에 접근할 수 없습니다" />;
}

export default Forbidden;
