import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  getPlaylistForEditing,
  deletePlaylist,
  removeTracksFromPlaylist,
} from '../../../api/playlist/playlistApi';
import BaseContainer from '../../../components/layout/BaseContainer';
import SimpleModal from '../../../components/common/Modal/SimpleModal';
import { formatDate, formatRelativeTime } from '../../../utils/reusableFn';
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

const PlaylistDetail = () => {
  const { playlistId } = useParams();
  const navigate = useNavigate();
  const [playlistData, setPlaylistData] = useState(null);
  const [selectedTracks, setSelectedTracks] = useState([]);
  const [tracksToDelete, setTracksToDelete] = useState([]);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

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
      }
      console.log('Changes saved successfully');
      window.location.reload();
      // TODO: 사용자에게 저장 성공 메시지 표시
    } catch (error) {
      console.error('Failed to save changes:', error);
      // TODO: 사용자에게 저장 실패 메시지 표시
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
      console.log('Playlist deleted successfully');
      navigate('/my-page');
    } catch (error) {
      console.error('Failed to delete playlist:', error);
      // TODO: 사용자에게 삭제 실패 메시지 표시.
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
          <Typography variant="title" component="div" sx={{ color: 'black' }}>
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
    </BaseContainer>
  );
};

export default PlaylistDetail;
