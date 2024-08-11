import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  getPlaylistForEditing,
  deletePlaylist,
  removeTracksFromPlaylist,
} from '../../../api/playlist/playlistApi';
import BaseContainer from '../../../components/layout/BaseContainer';
import SimpleModal from '../../../components/common/Modal/SimpleModal';
import { formatDate } from '../../../utils/reusableFn';
import {
  Box,
  Typography,
  Card,
  CardMedia,
  List,
  ListItem,
  Button,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import TrackListEditItem from '../../../components/common/ListItem/TrackListEditItem';
import SnackbarAlert from '../../../components/common/Alert/SnackbarAlert';

const PlaylistDetail = () => {
  const { playlistId } = useParams();
  const navigate = useNavigate();
  const [playlistData, setPlaylistData] = useState(null);
  const [selectedTracks, setSelectedTracks] = useState([]);
  const [tracksToDelete, setTracksToDelete] = useState([]);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  useEffect(() => {
    const fetchPlaylistData = async () => {
      try {
        const data = await getPlaylistForEditing(playlistId);
        setPlaylistData(data);
      } catch (error) {
        console.error('Failed to fetch playlist data:', error);
      }
    };
    fetchPlaylistData();
  }, [playlistId]);

  const handleTrackSelect = track => {
    setSelectedTracks(prev =>
      prev.includes(track.id)
        ? prev.filter(id => id !== track.id)
        : [...prev, track.id],
    );
  };

  const handleDeleteSelected = () => {
    setTracksToDelete(prev => [...prev, ...selectedTracks]);
    setPlaylistData(prev => ({
      ...prev,
      tracks: prev.tracks.filter(track => !selectedTracks.includes(track.id)),
      trackCount: prev.trackCount - selectedTracks.length,
    }));
    setSelectedTracks([]);
  };

  const handleSaveClick = () => {
    setIsSaveModalOpen(true);
  };

  const handleCancelSave = () => {
    setIsSaveModalOpen(false);
  };

  const handleConfirmSave = async () => {
    try {
      if (tracksToDelete.length > 0) {
        await removeTracksFromPlaylist(playlistId, tracksToDelete);
        setTracksToDelete([]);
        setSnackbar({
          open: true,
          message: '플레이리스트 저장에 성공했습니다.',
          severity: 'success',
        });
      }
      setTimeout(() => {
        navigate('/my-page');
      }, 2000); // 저장하고 마이페이지로
    } catch (error) {
      setSnackbar({
        open: true,
        message: '플레이리스트 저장에 실패했습니다. 다시 시도해주세요.',
        severity: 'error',
      });
    }
    setIsSaveModalOpen(false);
  };

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
  };

  const handleConfirmDelete = async () => {
    try {
      await deletePlaylist(playlistId);
      navigate('/my-page');
    } catch (error) {
      setSnackbar({
        open: true,
        message: '플레이리스트 삭제에 실패했습니다. 다시 시도해주세요.',
        severity: 'error',
      });
    }
    setIsDeleteModalOpen(false);
  };

  if (!playlistData) {
    return <div>Loading...</div>;
  }

  return (
    <BaseContainer>
      <Typography variant="title">Edit Playlist</Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          mb: 2,
          width: '100%',
        }}
      >
        <Button
          variant="contained"
          color="error"
          startIcon={<DeleteIcon />}
          onClick={handleDeleteClick}
        >
          플레이리스트 삭제
        </Button>
      </Box>
      <Card sx={{ display: 'flex', color: 'white', width: '100%' }}>
        <CardMedia
          component="img"
          sx={{ width: 151 }}
          image={playlistData.thumbnailUrl}
          alt={playlistData.title}
        />
        <Box
          sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            p: 2,
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="title" component="div">
            {playlistData.title}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            트랙 {playlistData.trackCount}개
          </Typography>
          <Typography variant="subtitle" color="text.secondary">
            {formatDate(playlistData.modifiedAt)} 수정
          </Typography>
        </Box>
      </Card>
      <Box sx={{ width: '100%' }}>
        <List>
          {playlistData.tracks.map(track => (
            <ListItem key={track.id} disablePadding>
              <TrackListEditItem
                music={{
                  id: track.id,
                  name: track.name,
                  artist: track.artist,
                  thumbnailUrl: track.thumbnailUrl,
                  duration: track.duration,
                  previewUrl: track.previewUrl,
                  trackId: track.trackId,
                }}
                onSelect={() => handleTrackSelect(track)}
                isChecked={selectedTracks.includes(track.id)}
              />
            </ListItem>
          ))}
        </List>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          mb: 2,
          width: '100%',
        }}
      >
        <Button
          variant="contained"
          color="error"
          startIcon={<DeleteIcon />}
          onClick={handleDeleteSelected}
          disabled={selectedTracks.length === 0}
        >
          선택삭제
        </Button>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSaveClick}
          disabled={tracksToDelete.length === 0}
        >
          저장
        </Button>
      </Box>

      {/* 저장 컴포넌트 추가 */}
      <SimpleModal
        open={isSaveModalOpen}
        onClose={handleCancelSave}
        title="변경사항 저장"
        description={`${tracksToDelete.length}개의 트랙을 \n플레이리스트에서 삭제하고 \n변경사항을 저장하시겠습니까?\n\n이 작업은 되돌릴 수 없습니다.`}
        primaryButtonText="저장"
        secondaryButtonText="취소"
        onPrimaryClick={handleConfirmSave}
        onSecondaryClick={handleCancelSave}
      />

      {/* 삭제 확인 모달 */}
      <SimpleModal
        open={isDeleteModalOpen}
        onClose={handleCancelDelete}
        title="플레이리스트 삭제"
        description={
          '플레이리스트를 삭제하시겠습니까? \n\n 이 작업은 되돌릴 수 없습니다.'
        }
        primaryButtonText="삭제"
        secondaryButtonText="취소"
        onPrimaryClick={handleConfirmDelete}
        onSecondaryClick={handleCancelDelete}
      />

      {/* 플레이리스트 저장 확인 스낵바 */}
      <SnackbarAlert
        open={snackbar.open}
        onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
        message={snackbar.message}
        severity={snackbar.severity}
      />
    </BaseContainer>
  );
};

export default PlaylistDetail;
