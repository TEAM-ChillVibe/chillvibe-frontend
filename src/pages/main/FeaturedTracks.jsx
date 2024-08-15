// import { Box, Pagination, Typography } from '@mui/material';
// import TrackListItem from '../../components/common/ListItem/TrackListItem';
// import { useEffect, useState } from 'react';
// import { getFeaturedPlaylist } from '../../api/track/trackApi';
//
// const FeaturedTracks = () => {
//   const [playlist, setPlaylist] = useState(null);
//   const [page, setPage] = useState(1); // 현재 페이지 상태
//   const [totalPages, setTotalPages] = useState(1); // 총 페이지 수
//   const [loading, setLoading] = useState(true); // 로딩 상태
//
//   useEffect(() => {
//     const fetchPlaylist = async () => {
//       try {
//         setLoading(true); // 데이터 요청 전 로딩 상태 설정
//         const data = await getFeaturedPlaylist('ko_KR', page - 1, 5); // API 호출
//
//         console.log('data: ', data);
//
//         if (data && data.tracks) {
//           setPlaylist({
//             name: data.name,
//             imageUrl: data.imageUrl,
//             tracks: data.tracks.map(track => ({
//               id: track.id,
//               name: track.name,
//               artist: track.artist,
//               thumbnailUrl: track.thumbnailUrl,
//               previewUrl: track.previewUrl,
//               duration: track.duration,
//             })), // 트랙 목록
//           });
//           setTotalPages(data.totalPages);
//         } else {
//           console.error('Invalid data structure:', data);
//         }
//       } catch (error) {
//         console.error('Error fetching featured playlist:', error);
//       } finally {
//         setLoading(false);
//       }
//     };
//
//     fetchPlaylist();
//   }, [page]);
//
//   const handlePageChange = (event, newPage) => {
//     setPage(newPage);
//   };
//
//   return (
//     <Box
//       sx={{
//         width: '100%',
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//       }}
//     >
//       <Box
//         sx={{
//           flex: '0 0 35%',
//           height: 'auto',
//           aspectRatio: '1 / 1',
//           backgroundSize: 'cover',
//           // backgroundImage: `url(${playlist.imageUrl})`,
//           backgroundPosition: 'center',
//           borderRadius: '8px',
//           boxShadow: 3,
//           position: 'relative',
//         }}
//       ></Box>
//
//       <Box sx={{ flexGrow: 1, width: '100%', mt: 2 }}>
//         <Box sx={{ mb: 2 }}>
//           {playlist.tracks.map(track => (
//             <TrackListItem
//               key={track.id}
//               music={{
//                 name: track.name,
//                 artist: track.artist,
//                 thumbnailUrl: track.thumbnailUrl,
//                 duration: track.duration,
//                 previewUrl: track.previewUrl,
//               }}
//             />
//           ))}
//         </Box>
//         <Pagination
//           count={totalPages}
//           page={page}
//           onChange={handlePageChange}
//           sx={{ display: 'flex', justifyContent: 'center' }}
//         />
//       </Box>
//     </Box>
//   );
// };
//
// export default FeaturedTracks;
