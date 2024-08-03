import ErrorPage from '../ErrorPage';

function ServiceUnavaliable() {
  return (
    <ErrorPage
      errorCode="503"
      message="서비스를 이용할 수 없습니다. 잠시 후 다시 시도해 주세요"
    />
  );
}

export default ServiceUnavaliable;
