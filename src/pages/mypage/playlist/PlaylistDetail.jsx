import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  getPlaylistForEditing,
  deletePlaylist,
  removeTracksFromPlaylist,
  updatePlaylistTitle,
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
  TextField,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import TrackListEditItem from '../../../components/common/ListItem/TrackListEditItem';
import SnackbarAlert from '../../../components/common/Alert/SnackbarAlert';
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import IconButton from '@mui/material/IconButton';

const PlaylistDetail = () => {
  const { playlistId } = useParams();
  const navigate = useNavigate();
  const [playlistData, setPlaylistData] = useState(null);
  const [selectedTracks, setSelectedTracks] = useState([]);
  const [tracksToDelete, setTracksToDelete] = useState([]);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false); // 플레이리스트 저장중
  const [isDeleting, setIsDeleting] = useState(false); // 플레이리스트 삭제중
  const [isEditingTitle, setIsEditingTitle] = useState(false); // 제목 수정 모드
  const [newTitle, setNewTitle] = useState('');
  const [newTitleError, setNewTitleError] = useState('');
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
        setNewTitle(data.title);
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
    setIsSaving(true);
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
      }, 1000); // 저장하고 마이페이지로
    } catch (error) {
      setSnackbar({
        open: true,
        message: '플레이리스트 저장에 실패했습니다. 다시 시도해주세요.',
        severity: 'error',
      });
      setIsSaving(false); // 추가
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
    setIsDeleting(true);
    try {
      await deletePlaylist(playlistId);
      setSnackbar({
        open: true,
        message: '플레이리스트가 성공적으로 삭제되었습니다.',
        severity: 'success',
      });
      setTimeout(() => {
        navigate('/my-page');
      }, 1000);
    } catch (error) {
      setSnackbar({
        open: true,
        message: '플레이리스트 삭제에 실패했습니다. 다시 시도해주세요.',
        severity: 'error',
      });
      setIsDeleting(false); // 삭제 실패 시 상태 초기화
    }
    setIsDeleteModalOpen(false);
  };

  const handleTitleChange = e => {
    setNewTitle(e.target.value);
    if (e.target.value.length > 50) {
      setNewTitleError('제목은 50자 이내로 작성해주세요.');
    } else {
      setNewTitleError('');
    }
  };

  const handleTitleSave = async () => {
    if (newTitleError) {
      return;
    }

    try {
      await updatePlaylistTitle(newTitle, playlistId);
      setPlaylistData(prev => ({ ...prev, title: newTitle }));
      setIsEditingTitle(false);
      setSnackbar({
        open: true,
        message: '제목이 성공적으로 변경되었습니다.',
        severity: 'success',
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: '제목 변경에 실패했습니다. 다시 시도해주세요.',
        severity: 'error',
      });
    }
  };

  const handleCancelTitleEdit = () => {
    setNewTitle(playlistData.title); // 원래 제목으로 복원
    setIsEditingTitle(false);
    setNewTitleError(''); // 오류 메시지 초기화
  };

  if (!playlistData) {
    return <div>Loading...</div>;
  }

  return (
    <BaseContainer>
      <Typography variant="title">Edit Playlist</Typography>
      <Card sx={{ display: 'flex', width: '95%', my: 3 }}>
        <CardMedia
          component="img"
          sx={{ width: '170px', m: 2, borderRadius: 1 }}
          image={playlistData.thumbnailUrl}
          alt={playlistData.title}
        />
        <Box
          sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            py: 4.5,
            pl: 1,
            justifyContent: 'space-between',
          }}
        >
          {isEditingTitle ? (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <TextField
                variant="outlined"
                value={newTitle}
                onChange={handleTitleChange}
                error={!!newTitleError}
                helperText={newTitleError}
                inputProps={{ maxLength: 50 }}
                sx={{ mr: 2, mb: 1 }}
                size="small"
              />
              <Button
                variant="outlined"
                onClick={handleCancelTitleEdit}
                size="small"
              >
                취소
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleTitleSave}
                size="small"
                disabled={!!newTitleError}
                sx={{ ml: 1 }}
              >
                저장
              </Button>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="subtitle1">{playlistData.title}</Typography>
              <IconButton
                size="small"
                color="primary"
                onClick={() => setIsEditingTitle(true)}
                sx={{ ml: 1 }}
              >
                <ModeEditIcon />
              </IconButton>
            </Box>
          )}
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            트랙 {playlistData.trackCount}개
          </Typography>
          <Typography variant="date">
            게시 | {formatDate(playlistData.createdAt)}
          </Typography>
          <Typography variant="date">
            수정 | {formatDate(playlistData.modifiedAt)}
          </Typography>
        </Box>
      </Card>
      <Box sx={{ width: '100%' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            mb: 2,
            width: '100%',
            px: 2,
          }}
        >
          <Button
            variant="contained"
            size="small"
            color="error"
            startIcon={<PlaylistRemoveIcon />}
            onClick={handleDeleteClick}
          >
            플레이리스트 삭제
          </Button>
          <Button
            variant="outlined"
            color="error"
            size="small"
            startIcon={<DeleteIcon />}
            onClick={handleDeleteSelected}
            disabled={selectedTracks.length === 0}
          >
            선택 트랙 삭제
          </Button>
        </Box>
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
      <Box sx={{ display: 'flex', mt: 2, gap: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSaveClick}
          disabled={tracksToDelete.length === 0}
        >
          {/* 변경사항 저장 */}
          {isSaving ? '저장 중...' : '변경사항 저장'}
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
        disablePrimaryButton={isSaving} //추가
      />

      {/* 삭제 확인 모달 */}
      <SimpleModal
        open={isDeleteModalOpen}
        onClose={handleCancelDelete}
        description={
          '플레이리스트를 삭제하시겠습니까?\n이 작업은 되돌릴 수 없습니다.'
        }
        primaryButtonText="삭제"
        secondaryButtonText="취소"
        onPrimaryClick={handleConfirmDelete}
        onSecondaryClick={handleCancelDelete}
        primaryButtonStyle="error"
        disablePrimaryButton={isDeleting}
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
