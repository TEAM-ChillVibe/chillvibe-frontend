// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import {
//   getPlaylistForEditing,
//   deletePlaylist,
//   removeTracksFromPlaylist,
// } from '../../../api/playlist/playlistApi';
// import BaseContainer from '../../../components/layout/BaseContainer';
// import {
//   Box,
//   Typography,
//   Card,
//   CardMedia,
//   List,
//   ListItem,
//   Button,
// } from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete';
// import TrackListEditItem from '../../../components/common/ListItem/TrackListEditItem';

// const PlaylistDetail = () => {
//   // URL 파라미터에서 플레이리스트 ID를 추출
//   const { playlistId } = useParams();
//   // 플레이리스트 데이터를 저장하는 상태
//   const [playlistData, setPlaylistData] = useState(null);
//   // 현재 선택된 트랙들의 ID를 저장하는 상태
//   const [selectedTracks, setSelectedTracks] = useState([]);
//   // 삭제 대기 중인 트랙들의 ID를 저장하는 상태
//   const [tracksToDelete, setTracksToDelete] = useState([]);

//   // 컴포넌트가 마운트되거나 playlistId가 변경될 때 플레이리스트 데이터를 불러온다.
//   useEffect(() => {
//     const fetchPlaylistData = async () => {
//       try {
//         const data = await getPlaylistForEditing(playlistId);
//         setPlaylistData(data);
//       } catch (error) {
//         console.error('Failed to fetch playlist data:', error);
//       }
//     };
//     fetchPlaylistData();
//   }, [playlistId]);

//   // 트랙 선택/선택 해제 처리 함수
//   // 트랙 선택/선택 해제 처리 함수
//   const handleTrackSelect = track => {
//     setSelectedTracks(
//       prev =>
//         prev.includes(track.id)
//           ? prev.filter(id => id !== track.id) // 이미 선택된 경우 제거
//           : [...prev, track.id], // 선택되지 않은 경우 추가
//     );
//   };

//   // 선택된 트랙들을 화면에서 삭제하는 함수
//   const handleDeleteSelected = () => {
//     // 선택된 트랙을 삭제 대기 목록에 추가
//     setTracksToDelete(prev => [...prev, ...selectedTracks]);

//     // 화면에서 선택된 트랙 제거
//     setPlaylistData(prev => ({
//       ...prev,
//       tracks: prev.tracks.filter(track => !selectedTracks.includes(track.id)),
//       trackCount: prev.trackCount - selectedTracks.length,
//     }));

//     // 선택된 트랙 목록 초기화
//     setSelectedTracks([]);
//   };

//   // 변경사항을 서버에 저장하는 함수
//   const handleSave = async () => {
//     try {
//       // 삭제할 트랙이 있는 경우에만 서버에 요청
//       if (tracksToDelete.length > 0) {
//         await removeTracksFromPlaylist(playlistId, tracksToDelete);
//         setTracksToDelete([]); // 삭제 대기 목록 초기화
//       }
//       console.log('Changes saved successfully');
//       // TODO: 사용자에게 저장 성공 메시지 표시
//     } catch (error) {
//       console.error('Failed to save changes:', error);
//       // TODO: 사용자에게 저장 실패 메시지 표시
//     }
//   };

//   // 플레이리스트 데이터 로딩 중 표시
//   if (!playlistData) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <BaseContainer>
//       <Typography variant="title">Edit Playlist</Typography>
//       <Box
//         sx={{
//           display: 'flex',
//           justifyContent: 'flex-end',
//           mb: 2,
//           width: '100%',
//         }}
//       >
//         <Button
//           variant="contained"
//           color="error"
//           startIcon={<DeleteIcon />}
//           onClick={handleDeleteSelected}
//         >
//           플레이리스트 삭제
//         </Button>
//       </Box>
//       <Card sx={{ display: 'flex', color: 'white', width: '100%' }}>
//         <CardMedia
//           component="img"
//           sx={{ width: 151 }}
//           image={playlistData.thumbnailUrls[0]}
//           alt={playlistData.playlistName}
//         />
//         <Box
//           sx={{
//             flexGrow: 1,
//             display: 'flex',
//             flexDirection: 'column',
//             p: 2,
//             justifyContent: 'space-between',
//           }}
//         >
//           <Typography variant="title" component="div" sx={{ color: 'black' }}>
//             {playlistData.playlistName}
//           </Typography>
//           <Typography variant="subtitle1" color="text.secondary">
//             트랙 {playlistData.trackCount}개
//           </Typography>
//           <Typography variant="body2">
//             Created: {playlistData.createdAt || 'N/A'}
//           </Typography>
//           <Typography variant="body2">
//             Modified: {playlistData.modifiedAt || 'N/A'}
//           </Typography>
//         </Box>
//       </Card>
//       <Box
//         sx={{
//           width: '100%',
//         }}
//       >
//         <List>
//           {playlistData.tracks.map(track => (
//             <ListItem key={track.id} disablePadding>
//               <TrackListEditItem
//                 music={{
//                   id: track.id,
//                   title: track.name,
//                   artist: track.artist,
//                   albumCover: track.thumbnailUrl,
//                   duration: track.duration,
//                   audioSrc: track.previewUrl,
//                   trackId: track.trackId,
//                 }}
//                 onSelect={() => handleTrackSelect(track)}
//                 isChecked={selectedTracks.includes(track.id)}
//               />
//             </ListItem>
//           ))}
//         </List>
//       </Box>
//       <Box
//         sx={{
//           display: 'flex',
//           justifyContent: 'flex-end',
//           mb: 2,
//           width: '100%', // 전체 너비를 차지하도록 설정
//         }}
//       >
//         <Button
//           variant="contained"
//           color="error"
//           startIcon={<DeleteIcon />}
//           onClick={handleDeleteSelected}
//           disabled={selectedTracks.length === 0} // 선택한 트랙이 없으면 비활성화
//         >
//           선택삭제
//         </Button>
//       </Box>
//       <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
//         <Button
//           variant="contained"
//           color="primary"
//           onClick={handleSave}
//           disabled={tracksToDelete.length === 0} // 삭제할 트랙이 없으면 비활성화
//         >
//           저장
//         </Button>
//       </Box>
//     </BaseContainer>
//   );
// };

// export default PlaylistDetail;
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  getPlaylistForEditing,
  deletePlaylist,
  removeTracksFromPlaylist,
} from '../../../api/playlist/playlistApi';
import BaseContainer from '../../../components/layout/BaseContainer';
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
  const [playlistData, setPlaylistData] = useState(null);
  const [selectedTracks, setSelectedTracks] = useState([]);
  const [tracksToDelete, setTracksToDelete] = useState([]);

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

  const handleSave = async () => {
    try {
      if (tracksToDelete.length > 0) {
        await removeTracksFromPlaylist(playlistId, tracksToDelete);
        setTracksToDelete([]);
      }
      console.log('Changes saved successfully');
      // TODO: 사용자에게 저장 성공 메시지 표시
    } catch (error) {
      console.error('Failed to save changes:', error);
      // TODO: 사용자에게 저장 실패 메시지 표시
    }
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
          onClick={() => deletePlaylist(playlistId)}
        >
          플레이리스트 삭제
        </Button>
      </Box>
      <Card sx={{ display: 'flex', color: 'white', width: '100%' }}>
        <CardMedia
          component="img"
          sx={{ width: 151 }}
          image={playlistData.thumbnailUrls[0]}
          alt={playlistData.playlistName}
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
            {playlistData.playlistName}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            트랙 {playlistData.trackCount}개
          </Typography>
          <Typography variant="body2">
            Created: {playlistData.createdAt || 'N/A'}
          </Typography>
          <Typography variant="body2">
            Modified: {playlistData.modifiedAt || 'N/A'}
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
                  title: track.name,
                  artist: track.artist,
                  albumCover: track.thumbnailUrl,
                  duration: track.duration,
                  audioSrc: track.previewUrl,
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
          onClick={handleSave}
          disabled={tracksToDelete.length === 0}
        >
          저장
        </Button>
      </Box>
    </BaseContainer>
  );
};

export default PlaylistDetail;
