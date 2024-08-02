import { Box } from '@mui/material';

import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import useMusicPlayerStore from '../../../store/useMusicPlayerStore';
import { Pause, PlayArrow, PlaylistAdd } from '@mui/icons-material';
import { useState } from 'react';
import DropdownModal from '../modal/DropdownModal';

function TrackListItem({ music }) {
  const { title, artist, albumCover, duration, audioSrc } = music;

  const { isPlaying, currentTrack, playTrack, togglePlay } =
    useMusicPlayerStore();

  const isCurrentTrack = currentTrack && currentTrack.audioSrc === audioSrc;

  const handlePlayPause = () => {
    if (isCurrentTrack) {
      togglePlay();
    } else {
      playTrack(music);
    }
  };

  // 플레이리스트에 트랙 추가 모달 상태관리
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const options = [
    { label: 'my playlist 1', value: '1' },
    { label: 'my playlist 2', value: '2' },
    { label: 'my playlist 3', value: '3' },
  ];

  const [selectedValue, setSelectedValue] = useState('');

  const handleChange = event => {
    setSelectedValue(event.target.value);
  };

  // 저장 버튼
  const handlePrimaryClick = () => {
    closeModal();
  };

  // 취소 버튼
  const handleSecondaryClick = () => {
    closeModal();
  };

  // Description
  const modalDescription = `"${title} - ${artist}"\n를 추가할 플레이리스트를 선택해주세요.`;

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', p: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
        <IconButton aria-label="play/pause" onClick={handlePlayPause}>
          {isCurrentTrack && isPlaying ? (
            <Pause sx={{ fontSize: 30 }} />
          ) : (
            <PlayArrow sx={{ fontSize: 30 }} />
          )}
        </IconButton>
        <Avatar
          alt={title}
          src={albumCover}
          sx={{ width: 56, height: 56, mr: 2, borderRadius: 1 }}
        />
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant="subtitle1" noWrap>
            {title}
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
          description={modalDescription}
          options={options}
          selectedValue={selectedValue}
          onChange={handleChange}
          primaryButtonText="저장"
          onPrimaryClick={handlePrimaryClick}
          secondaryButtonText="취소"
          onSecondaryClick={handleSecondaryClick}
        />
      </Box>
    </Box>
  );
}

export default TrackListItem;
