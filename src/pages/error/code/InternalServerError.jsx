import ErrorPage from '../ErrorPage';

function InternalServerError() {
  return <ErrorPage errorCode="500" message="서버에 문제가 발생했습니다" />;
}

export default InternalServerError;
