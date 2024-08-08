import {
  Alert,
  Box,
  Button,
  Grid,
  Pagination,
  Typography,
} from '@mui/material';
import PlaylistListItemMini from '../../../components/common/ListItem/PlaylistListItemMini';
import { useEffect, useState } from 'react';
import FormModal from '../../../components/common/Modal/FormModal';
import {
  createEmptyPlaylist,
  getUserPlaylists,
} from '../../../api/playlist/playlistApi';

// Pagination
const itemsPerPage = 10;

const MyPlaylist = () => {
  const [open, setOpen] = useState(false);
  const [playlistTitle, setPlaylistTitle] = useState('');
  const [error, setError] = useState(null);
  const [playlists, setPlaylists] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const data = await getUserPlaylists(page - 1, itemsPerPage);
        setPlaylists(data.content);
        setTotalPages(data.totalPages);
      } catch (error) {
        setError('플레이리스트를 가져오는 데 실패했습니다. 다시 시도해주세요.');
      }
    };

    fetchPlaylists();
  }, [page]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setPlaylistTitle(''); // 모달 닫을 때 폼 필드 초기화
    setError(null);
  };

  const handlePrimaryClick = async () => {
    if (!playlistTitle.trim()) {
      return;
    } // 제목이 비어있으면 처리하지 않음

    try {
      await createEmptyPlaylist(playlistTitle);
      handleClose();
      setPage(1); // 생성 후 첫페이지로 이동
      const data = await getUserPlaylists(0, itemsPerPage); // 첫 페이지의 플레이리스트를 가져옵니다.
      setPlaylists(data.content); // 업데이트된 플레이리스트 설정
      setTotalPages(data.totalPages); // 업데이트된 총 페이지 수 설정
    } catch (e) {
      setError('재생목록 생성에 실패했습니다. 다시 시도해 주세요.');
    }
  };

  const handleSecondaryClick = () => {
    handleClose();
  };

  const handleTitleChange = e => {
    setPlaylistTitle(e.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="subtitleMypage">My Playlists</Typography>
        <Box>
          <Button variant="contained" onClick={handleOpen}>
            새 재생목록
          </Button>
          <FormModal
            open={open}
            onClose={handleClose}
            title="New Playlist"
            description={`새 재생목록의 제목을 정해주세요!\n재생목록 생성 후, 검색창을 통해 음악을 추가할 수 있습니다.`}
            formFields={[
              {
                label: 'Title of playlist',
                type: 'text',
                value: playlistTitle,
                onChange: handleTitleChange,
              },
            ]}
            primaryButtonText="저장"
            secondaryButtonText="취소"
            onPrimaryClick={handlePrimaryClick}
            onSecondaryClick={handleSecondaryClick}
            isPrimaryButtonDisabled={!playlistTitle.trim()}
          />
          {error && (
            <Alert
              severity="error"
              onClose={() => setError(null)}
              sx={{ mt: 2 }}
            >
              {error}
            </Alert>
          )}
        </Box>
      </Box>
      <Box sx={{ width: '100%', my: 2 }}>
        {playlists.length === 0 ? (
          <Typography variant="body1" sx={{ textAlign: 'center', my: 15 }}>
            아직 플레이리스트가 없습니다.
          </Typography>
        ) : (
          <>
            <Grid container>
              {playlists.map(playlist => (
                <Grid item xs={6} key={playlist.id}>
                  <PlaylistListItemMini playlist={playlist} />
                </Grid>
              ))}
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Pagination
                count={Math.ceil(playlists.length / itemsPerPage)}
                page={page}
                onChange={handlePageChange}
                // color="primary"
              />
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};
export default MyPlaylist;
