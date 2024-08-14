import { axiosWithoutToken } from '../../axios';

// 모든 트랙 검색 결과 조회
export const searchTracks = async (query, page = 0, size = 20) => {
  try {
    const response = await axiosWithoutToken.get('/api/tracks/search', {
      params: { query, page, size },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to search tracks:', error);
    throw error;
  }
};

/**
 * Spotify 인기 플레이리스트 가져오기
 * @param {string} locale - 지역 설정 (기본값: ko_KR)
 * @param {number} page - 페이지 번호 (기본값: 0)
 * @param {number} size - 페이지 크기 (기본값: 5)
 * @returns {Promise<FeaturedPlaylistResponseDto>} - 인기 플레이리스트 데이터
 */
export const getFeaturedPlaylists = async (
  locale = 'ko_KR',
  page = 0,
  size = 5,
) => {
  try {
    const response = await axiosWithoutToken.get(
      `/api/tracks/featured-playlists`,
      {
        params: {
          locale,
          page,
          size,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching featured playlists:', error);
    throw error;
  }
};
