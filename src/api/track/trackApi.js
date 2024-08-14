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

// Spotify 인기 플레이리스트 가져오기
export const getFeaturedPlaylist = async (
  locale = 'ko_KR',
  page = 0,
  size = 5,
) => {
  try {
    const response = await axiosWithoutToken.get(
      '/api/spotify/featured-playlists',
      {
        params: { locale, page, size },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching featured playlist:', error);
    throw error;
  }
};
