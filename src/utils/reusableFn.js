import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

// 날짜 포맷팅 함수
export function formatDate(date, format = 'YYYY-MM-DD HH:mm:ss') {
  return dayjs(date).format(format);
}

// 상대시간 반환 함수 (ex: "1시간 전")
export function formatRelativeTime(date) {
  return dayjs(date).fromNow();
}
