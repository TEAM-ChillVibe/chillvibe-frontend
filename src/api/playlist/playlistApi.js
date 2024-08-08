import { axiosWithToken } from '../../axios';

// 빈 플레이리스트 생성
export const createEmptyPlaylist = async title => {
  try {
    const response = await axiosWithToken.post('/api/playlists', { title });
    return response.data;
  } catch (error) {
    console.error('Failed to create empty playlist:', error);
    throw error;
  }
};

// 본인의 플레이리스트 조회
export const getUserPlaylistsForSelection = async () => {
  try {
    const response = await axiosWithToken.get('/api/playlists/selection');
    return response.data;
  } catch (error) {
    console.error('Failed to get user playlists for selection:', error);
    throw error;
  }
};

// 플레이리스트 수정(상세) 페이지 조회
export const getPlaylistForEditing = async playlistId => {
  try {
    const response = await axiosWithToken.get('/api/playlists/edit', {
      params: { playlistId },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to get playlist for editing:', error);
    throw error;
  }
};

// 마이 페이지 - 플레이리스트들 조회 (10개 단위 페이지네이션)
export const getUserPlaylists = async (page = 0, size = 10) => {
  try {
    const response = await axiosWithToken.get('/api/playlists/my', {
      params: { page, size },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to get user playlists:', error);
    throw error;
  }
};

// 플레이리스트 제거
export const deletePlaylist = async playlistId => {
  try {
    await axiosWithToken.delete('/api/playlists', {
      params: { playlistId },
    });
  } catch (error) {
    console.error('Failed to delete playlist:', error);
    throw error;
  }
};

// 플레이리스트에 트랙 추가
export const addTrackToPlaylist = async (playlistId, track) => {
  try {
    const trackData = {
      trackId: String(track.id),
      name: track.name,
      artist: track.artist,
      duration: track.duration,
      previewUrl: track.previewUrl,
      thumbnailUrl: track.thumbnailUrl,
    };
    const response = await axiosWithToken.post(
      '/api/playlists/track',
      trackData,
      {
        params: { playlistId },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Failed to add track to playlist:', error);
    throw error;
  }
};

// 플레이리스트에 선택한 트랙들을 삭제
export const removeTracksFromPlaylist = async (playlistId, trackIds) => {
  try {
    await axiosWithToken.delete(`/api/playlists/${playlistId}/tracks`, {
      data: trackIds,
    });
  } catch (error) {
    console.error('Failed to remove tracks from playlist:', error);
    throw error;
  }
};
