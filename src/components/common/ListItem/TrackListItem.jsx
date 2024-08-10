import { Alert, Box, Snackbar } from '@mui/material';

import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import useMusicPlayerStore from '../../../store/useMusicPlayerStore';
import { Pause, PlayArrow, PlaylistAdd } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import DropdownModal from '../Modal/DropdownModal';
import {
  addTrackToPlaylist,
  getUserPlaylistsForSelection,
} from '../../../api/playlist/playlistApi';

function TrackListItem({ music }) {
  // 뮤직플레이어 설정
  const { name, artist, thumbnailUrl, duration, previewUrl } = music;
  const { isPlaying, currentTrack, playTrack, togglePlay } =
    useMusicPlayerStore();
  const isCurrentTrack = currentTrack && currentTrack.previewUrl === previewUrl;
  const handlePlayPause = () => {
    if (isCurrentTrack) {
      togglePlay();
    } else {
      playTrack(music);
    }
  };

  // 플레이리스트에 트랙 추가 모달 상태관리
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [playlists, setPlaylists] = useState([]);
  const [selectedValue, setSelectedValue] = useState('');

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const data = await getUserPlaylistsForSelection();
        setPlaylists(data);
      } catch (error) {
        console.error('플레이리스트 로딩 실패');
      }
    };

    fetchPlaylists();
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleChange = event => {
    setSelectedValue(event.target.value);
  };

  // 스낵바
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  // 추가 버튼
  const handlePrimaryClick = async () => {
    console.log('Selected Value:', selectedValue);
    console.log('Music Object:', music);

    if (selectedValue) {
      try {
        await addTrackToPlaylist(selectedValue, music);
        setSnackbarMessage('트랙이 플레이리스트에 추가되었습니다!');
        setSnackbarOpen(true);
      } catch (error) {
        setSnackbarMessage('트랙 추가에 실패했습니다. 다시 시도해 주세요.');
        setSnackbarOpen(true);
      } finally {
        closeModal();
      }
    }
  };

  // 취소 버튼
  const handleSecondaryClick = () => {
    closeModal();
  };

  const modalTrack = `"${name} - ${artist}"`;
  const modalDescription = `를 추가할 플레이리스트를 선택해주세요.`;

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', py: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
        <IconButton aria-label="play/pause" onClick={handlePlayPause}>
          {isCurrentTrack && isPlaying ? (
            <Pause sx={{ fontSize: 30 }} />
          ) : (
            <PlayArrow sx={{ fontSize: 30 }} />
          )}
        </IconButton>
        <Avatar
          alt={name}
          src={thumbnailUrl}
          sx={{ width: 56, height: 56, ml: 1, mr: 2, borderRadius: 1 }}
        />
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant="subtitle1" noWrap>
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary" noWrap>
            {artist}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant="body2" sx={{ mr: 2 }}>
          {duration}
        </Typography>
        <IconButton aria-label="add to playlist" onClick={openModal}>
          <PlaylistAdd />
        </IconButton>
        <DropdownModal
          open={isModalOpen}
          onClose={closeModal}
          title="Select Playlist"
          description={
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                height: 'auto',
                gap: 0.5,
              }}
            >
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                {modalTrack}
              </Typography>
              <Typography variant="body2">{modalDescription}</Typography>
            </Box>
          }
          options={playlists.map(playlist => ({
            label: playlist.title,
            value: playlist.id,
          }))}
          selectedValue={selectedValue}
          onChange={handleChange}
          primaryButtonText="추가"
          onPrimaryClick={handlePrimaryClick}
          secondaryButtonText="취소"
          onSecondaryClick={handleSecondaryClick}
        />
      </Box>

      <Snackbar
        open={snackbarOpen}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarMessage.includes('실패') ? 'error' : 'success'}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default TrackListItem;
