import { Box, Button, Grid, Pagination, Typography } from '@mui/material';
import PlaylistListItemMini from '../../../components/common/ListItem/PlaylistListItemMini';
import { useState } from 'react';
import FormModal from '../../../components/common/Modal/FormModal';

const MyPlaylist = () => {
  // modal state
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handlePrimaryClick = () => {
    handleClose();
  };

  const handleSecondaryClick = () => {
    handleClose();
  };

  // Playlist List
  // const playlists = [];
  const playlists = [
    { id: 1, title: 'Summer Hits 2024', trackCount: 15 },
    { id: 2, title: 'Chill Vibes', trackCount: 30 },
    { id: 3, title: 'Workout Beats', trackCount: 20 },
    { id: 4, title: 'Top 40 Hits', trackCount: 40 },
    { id: 5, title: 'Indie Essentials', trackCount: 25 },
    { id: 6, title: 'Classic Rock Anthems', trackCount: 18 },
    { id: 7, title: 'Electronic Grooves', trackCount: 22 },
    { id: 8, title: 'Jazz Favorites', trackCount: 12 },
    { id: 9, title: 'Pop Classics', trackCount: 28 },
    { id: 10, title: 'Hip-Hop Legends', trackCount: 35 },
    { id: 11, title: 'Relaxing Instrumentals', trackCount: 14 },
    { id: 12, title: 'Country Hits', trackCount: 27 },
  ];

  // Pagination
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  // Calculate the indices of the items to display
  // const startIndex = (page - 1) * itemsPerPage;
  // const endIndex = startIndex + itemsPerPage;
  // const currentPlaylists = playlists.slice(startIndex, endIndex);

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
                value: '',
                onChange: () => {},
              },
            ]}
            primaryButtonText="저장"
            secondaryButtonText="취소"
            onPrimaryClick={handlePrimaryClick}
            onSecondaryClick={handleSecondaryClick}
          />
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
