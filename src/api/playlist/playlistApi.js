import { axiosWithToken } from '../../axios';

// 빈 플레이리스트 생성
export const createEmptyPlaylist = async title => {
  try {
    // POST 요청을 보내 새 플레이리스트를 생성한다.
    // 서버는 생성된 플레이리스트의 ID를 반환한다.
    const response = await axiosWithToken.post('/api/playlists', { title });
    return response.data; // 서버에서 반환한 플레이리스트 ID
  } catch (error) {
    console.error('Failed to create empty playlist:', error);
    throw error;
  }
};

// 본인의 플레이리스트 조회
export const getUserPlaylistsForSelection = async () => {
  try {
    // 사용자의 플레이리스트 목록을 가져온다.
    // 이는 플레이리스트 선택 UI 등에서 사용될 수 있다. (트랙 추가시)
    const response = await axiosWithToken.get('/api/playlists/selection');
    return response.data; // 서버에서 반환한 플레이리스트 목록
  } catch (error) {
    console.error('Failed to get user playlists for selection:', error);
    throw error;
  }
};

// 플레이리스트 제목 수정
export const updatePlaylistTitle = async (newTitle, playlistId) => {
  try {
    // 서버에 전송할 데이터 객체
    const playlistCreateRequestDto = { title: newTitle };

    // PUT 요청으로 제목을 업데이트
    const response = await axiosWithToken.put(
      '/api/playlists/edit/title',
      playlistCreateRequestDto,
      {
        params: { playlistId },
      },
    );

    return response;
  } catch (error) {
    throw error;
  }
};

// 플레이리스트 수정(상세) 페이지 조회
export const getPlaylistForEditing = async playlistId => {
  try {
    // 특정 플레이리스트의 상세 정보를 가져온다.
    // 플레이리스트 편집 페이지에서 사용.
    const response = await axiosWithToken.get('/api/playlists/edit', {
      params: { playlistId },
    });
    return response.data; // 서버에서 반환한 플레이리스트 상세 정보
  } catch (error) {
    console.error('Failed to get playlist for editing:', error);
    throw error;
  }
};

// 마이 페이지 - 플레이리스트들 조회 (10개 단위 페이지네이션)
export const getUserPlaylists = async (page = 0, size = 10) => {
  try {
    // 사용자의 플레이리스트 목록을 페이지네이션하여 가져온다.
    // 기본값으로 한 페이지당 10개의 항목을 가져온다.
    // 마이페이지의 플레이리스트 조회나, 게시글 생성시 플레이리스트 조회에서 사용 가능하다.
    const response = await axiosWithToken.get('/api/playlists/my', {
      params: { page, size },
    });
    return response.data; // 서버에서 반환한 페이지네이션된 플레이리스트 목록
  } catch (error) {
    console.error('Failed to get user playlists:', error);
    throw error;
  }
};

// 플레이리스트 제거
export const deletePlaylist = async playlistId => {
  try {
    // 특정 플레이리스트를 삭제한다.
    // 주의: 서버 측 구현과 일치하도록 URL을 수정해야 할 수 있다.
    await axiosWithToken.delete('/api/playlists', {
      params: { playlistId },
    });
    // 서버가 204 No Content를 반환하므로 별도의 반환값이 없다.
  } catch (error) {
    console.error('Failed to delete playlist:', error);
    throw error;
  }
};

// 플레이리스트에 트랙 추가
export const addTrackToPlaylist = async (playlistId, track) => {
  try {
    // 플레이리스트에 새로운 트랙을 추가한다.
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
    return response.data; // 서버에서 반환한 추가된 트랙의 정보
  } catch (error) {
    console.error('Failed to add track to playlist:', error);
    throw error;
  }
};

// 플레이리스트에 선택한 트랙들을 삭제
export const removeTracksFromPlaylist = async (playlistId, trackIds) => {
  try {
    // 플레이리스트에서 여러 트랙을 한 번에 삭제한다.
    // DELETE 요청의 본문에 삭제할 트랙 ID 목록을 포함시킨다.
    await axiosWithToken.delete(`/api/playlists/${playlistId}/tracks`, {
      data: trackIds,
    });
    // 서버가 204 No Content를 반환하므로 별도의 반환값이 없다.
  } catch (error) {
    console.error('Failed to remove tracks from playlist:', error);
    throw error;
  }
};

// postId를 통해 플레이리스트 가져오기
export const getPlaylistByPostId = async postId => {
  try {
    // 특정 게시물 ID에 연관된 플레이리스트 조회
    const response = await axiosWithToken.get(`/api/playlists/post/${postId}`);
    return response.data; // 플레이리스트 정보 반환
  } catch (error) {
    console.error('Failed to get playlist by post ID:', error);
    throw error;
  }
};
