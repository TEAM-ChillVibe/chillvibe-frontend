import { Box } from '@mui/material';

import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import useMusicPlayerStore from '../../../store/useMusicPlayerStore';
import { Pause, PlayArrow, PlaylistAdd } from '@mui/icons-material';
import React, { useState } from 'react';
import DropdownModal from '../Modal/DropdownModal';
import {
  addTrackToPlaylist,
  getUserPlaylistsForSelection,
} from '../../../api/playlist/playlistApi';
import SnackbarAlert from '../Alert/SnackbarAlert';
import { useNavigate } from 'react-router-dom';
import useUserStore from '../../../store/useUserStore';
import ListModal from '../Modal/ListModal';

function TrackListItem({ music }) {
  const navigate = useNavigate();
  // 뮤직플레이어 설정
  const { name, artist, thumbnailUrl, duration, previewUrl } = music;
  const { isPlaying, currentTrack, playTrack, togglePlay } =
    useMusicPlayerStore();
  const { isAuthenticated } = useUserStore();
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

  // 트랙 추가중인지 상태관리
  const [isAddingTrack, setIsAddingTrack] = useState(false);

  const fetchPlaylists = async () => {
    try {
      const data = await getUserPlaylistsForSelection();
      setPlaylists(data);
    } catch (error) {
      navigate('/500');
    }
  };
  // 모달 핸들러
  const openModal = () => {
    if (!isAuthenticated) {
      setSnackbar({
        open: true,
        message: '로그인이 필요한 서비스입니다.',
        severity: 'warning',
      });
    } else {
      fetchPlaylists();
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedValue('');
    setIsAddingTrack(false);
  };
  // const handleChange = event => {
  //   setSelectedValue(event.target.value);
  // };

  const handleSelect = value => {
    setSelectedValue(value);
  };
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  // 추가 버튼
  const handlePrimaryClick = async () => {
    console.log('Selected Value:', selectedValue);
    console.log('Music Object:', music);

    if (selectedValue && !isAddingTrack) {
      setIsAddingTrack(true);
      try {
        await addTrackToPlaylist(selectedValue, music);
        setSnackbar({
          open: true,
          message: '플레이리스트에 트랙이 추가되었습니다!',
          severity: 'success',
        });
      } catch (error) {
        setSnackbar({
          open: true,
          message: '트랙이 추가에 실패했습니다. 다시 시도해 주세요.',
          severity: 'error',
        });
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
      <Box sx={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
        <IconButton
          aria-label="play/pause"
          color="primary"
          onClick={handlePlayPause}
        >
          {isCurrentTrack && isPlaying ? (
            <Pause sx={{ fontSize: 30 }} />
          ) : (
            <PlayArrow sx={{ fontSize: 30 }} />
          )}
        </IconButton>
        <Avatar
          alt={name}
          src={thumbnailUrl}
          sx={{ width: 56, height: 56, ml: 1, borderRadius: 1 }}
        />
      </Box>
      <Box sx={{ flexGrow: 1, mx: 2, overflow: 'hidden' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
          <Typography
            variant="trackTitle"
            noWrap
            sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}
          >
            {name}
          </Typography>
          <Typography variant="trackArtist" noWrap>
            {artist}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
        <Typography variant="body2" sx={{ mr: 2 }}>
          {duration}
        </Typography>
        <IconButton
          aria-label="add to playlist"
          color="primary"
          onClick={openModal}
        >
          <PlaylistAdd />
        </IconButton>
        <ListModal
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
              <Typography variant="modalPoint">{modalTrack}</Typography>
              <Typography variant="body2">{modalDescription}</Typography>
            </Box>
          }
          options={playlists.map(playlist => ({
            label: playlist.title,
            value: playlist.id,
          }))}
          selectedValue={selectedValue}
          onSelect={handleSelect}
          primaryButtonText="추가"
          onPrimaryClick={handlePrimaryClick}
          secondaryButtonText="취소"
          onSecondaryClick={handleSecondaryClick}
          primaryButtonDisabled={isAddingTrack || !selectedValue}
        />
      </Box>

      <SnackbarAlert
        open={snackbar.open}
        onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
        message={snackbar.message}
        severity={snackbar.severity}
      />
    </Box>
  );
}

export default TrackListItem;
