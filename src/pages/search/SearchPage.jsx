// // import React, { useState, useEffect, useCallback } from 'react';
// // import { Tabs, Tab, Box, Typography, CircularProgress } from '@mui/material';
// // import { useLocation } from 'react-router-dom';
// // import BaseContainer from '../../components/layout/BaseContainer';
// // import SearchTracks from './tabs/SearchTracks';
// // import SearchPosts from './tabs/SearchPosts';
// // import axios from 'axios';

// // const SearchPage = () => {
// //   const location = useLocation();
// //   const [searchQuery, setSearchQuery] = useState('');
// //   const [searchType, setSearchType] = useState('track');
// //   const [trackResults, setTrackResults] = useState(null);
// //   const [postResults, setPostResults] = useState(null);
// //   const [isLoading, setIsLoading] = useState(false);
// //   const [currentPage, setCurrentPage] = useState(0);

// //   const fetchSearchResults = useCallback(async () => {
// //     if (!searchQuery) return;

// //     setIsLoading(true);
// //     try {
// //       if (searchType === 'track') {
// //         const response = await axios.get(
// //           `http://localhost:8080/api/tracks/search`,
// //           {
// //             params: { query: searchQuery, page: currentPage, size: 20 },
// //           },
// //         );
// //         setTrackResults(response.data);
// //       } else {
// //         const response = await axios.get(
// //           `http://localhost:8080/api/posts/search`,
// //           {
// //             params: { query: searchQuery, page: currentPage, size: 10 },
// //           },
// //         );
// //         setPostResults(response.data);
// //       }
// //     } catch (error) {
// //       console.error('Search error:', error);
// //       if (searchType === 'track') {
// //         setTrackResults(null);
// //       } else {
// //         setPostResults(null);
// //       }
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   }, [searchQuery, searchType, currentPage]);

// //   useEffect(() => {
// //     const params = new URLSearchParams(location.search);
// //     const query = params.get('q');
// //     if (query) {
// //       setSearchQuery(query);
// //     }
// //   }, [location.search]);

// //   useEffect(() => {
// //     fetchSearchResults();
// //   }, [fetchSearchResults]);

// //   const handleTabChange = (event, newValue) => {
// //     setSearchType(newValue);
// //     setCurrentPage(0);
// //   };

// //   return (
// //     <BaseContainer>
// //       <Typography variant="h5" sx={{ mt: 2, mb: 3 }}>
// //         "
// //         <Box component="span" sx={{ fontWeight: 'bold' }}>
// //           {searchQuery}
// //         </Box>
// //         "에 대한 검색 결과입니다.
// //       </Typography>
// //       <Tabs
// //         value={searchType}
// //         onChange={handleTabChange}
// //         variant="fullWidth"
// //         sx={{
// //           width: '100%',
// //         }}
// //       >
// //         <Tab label="Tracks" value="track" />
// //         <Tab label="Posts" value="post" />
// //       </Tabs>
// //       {isLoading ? (
// //         <CircularProgress />
// //       ) : (
// //         <Box mt={3} sx={{ width: '100%' }}>
// //           {searchType === 'track' && (
// //             <SearchTracks
// //               results={trackResults}
// //               onPageChange={setCurrentPage}
// //             />
// //           )}
// //           {searchType === 'post' && (
// //             <SearchPosts results={postResults} onPageChange={setCurrentPage} />
// //           )}
// //         </Box>
// //       )}
// //     </BaseContainer>
// //   );
// // };

// // export default SearchPage;

// import React, { useRef, useEffect, useState } from 'react';
// import { List, ListItem, Box, Typography, CircularProgress } from '@mui/material';
// import TrackListItem from '../../../components/common/ListItem/TrackListItem';

// const SearchTracks = ({ results, onLoadMore }) => {
//   // 로딩 상태를 관리하는 state
//   const [isLoading, setIsLoading] = useState(false);
//   // 마지막 페이지 여부를 관리하는 state
//   const [isLastPage, setIsLastPage] = useState(false);
//   // 마지막 아이템에 대한 ref
//   const lastItemRef = useRef(null);

//   useEffect(() => {
//     // results가 존재하고, 마지막 페이지가 아닌 경우에만 Intersection Observer를 생성
//     if (results && results.content && results.content.length > 0 && !isLastPage) {
//       const observer = new IntersectionObserver(
//         async entries => {
//           // 마지막 아이템이 화면에 보이면
//           if (entries[0].isIntersecting) {
//             // 로딩 상태를 true로 설정
//             setIsLoading(true);
//             // onLoadMore 함수를 호출하여 다음 페이지 데이터를 로드
//             await onLoadMore();
//             // 로딩 상태를 false로 설정
//             setIsLoading(false);
//           }
//         },
//         { threshold: 1 }
//       );

//       // 마지막 아이템에 대한 ref가 존재하면 해당 아이템을 관찰
//       if (lastItemRef.current) {
//         observer.observe(lastItemRef.current);
//       }

//       // 컴포넌트가 언마운트되면 Intersection Observer를 해제
//       return () => {
//         if (lastItemRef.current) {
//           observer.unobserve(lastItemRef.current);
//         }
//       };
//     }
//   }, [results, onLoadMore, isLastPage]);

//   useEffect(() => {
//     // 현재 페이지가 마지막 페이지인 경우 isLastPage를 true로 설정
//     if (results && results.page && results.page.totalPages === results.page.number + 1) {
//       setIsLastPage(true);
//     }
//   }, [results]);

//   // 검색 결과가 없는 경우 메시지 표시
//   if (!results || !results.content || results.content.length === 0)
//     return <Typography>트랙 검색 결과가 없습니다.</Typography>;

//   return (
//     <Box sx={{ width: '100%' }}>
//       <Typography variant="h6" sx={{ mb: 2 }}>
//         트랙 검색 결과
//       </Typography>
//       <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
//         {/* 검색 결과를 리스트로 표시 */}
//         {results.content.map((track, index) => (
//           <ListItem
//             key={track.id}
//             disablePadding
//             sx={{ mb: 1 }}
//             // 마지막 아이템에 대한 ref 설정
//             ref={index === results.content.length - 1 ? lastItemRef : null}
//           >
//             <TrackListItem
//               music={{
//                 title: track.name,
//                 artist: track.artistName,
//                 albumCover: track.albumImageUrl,
//                 duration: track.duration,
//                 audioSrc: track.previewUrl,
//               }}
//             />
//           </ListItem>
//         ))}
//       </List>
//       {/* 로딩 중인 경우 로딩 인디케이터 표시 */}
//       {isLoading && (
//         <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
//           <CircularProgress />
//         </Box>
//       )}
//     </Box>
//   );
// };

// export default SearchTracks;

import React, { useState, useEffect, useCallback } from 'react';
import { Tabs, Tab, Box, Typography, CircularProgress } from '@mui/material';
import { useLocation } from 'react-router-dom';
import BaseContainer from '../../components/layout/BaseContainer';
import SearchTracks from './tabs/SearchTracks';
import SearchPosts from './tabs/SearchPosts';
import axios from 'axios';

const SearchPage = () => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('track');
  const [trackResults, setTrackResults] = useState({ content: [] });
  const [postResults, setPostResults] = useState({ content: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const fetchSearchResults = useCallback(async () => {
    if (!searchQuery) return;

    setIsLoading(true);
    try {
      if (searchType === 'track') {
        const response = await axios.get(
          `http://localhost:8080/api/tracks/search`,
          {
            params: { query: searchQuery, page: currentPage, size: 20 },
          },
        );
        setTrackResults(prev => ({
          ...response.data,
          content:
            currentPage === 0
              ? response.data.content
              : [...prev.content, ...response.data.content],
        }));
      } else {
        const response = await axios.get(
          `http://localhost:8080/api/posts/search`,
          {
            params: { query: searchQuery, page: currentPage, size: 10 },
          },
        );
        setPostResults(prev => ({
          ...response.data,
          content:
            currentPage === 0
              ? response.data.content
              : [...prev.content, ...response.data.content],
        }));
      }
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery, searchType, currentPage]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('q');
    if (query) {
      setSearchQuery(query);
      setCurrentPage(0);
      window.scrollTo(0, 0);
    }
  }, [location.search]);

  useEffect(() => {
    fetchSearchResults();
  }, [fetchSearchResults]);

  const handleTabChange = (event, newValue) => {
    setSearchType(newValue);
    setCurrentPage(0);
  };

  const handleLoadMore = () => {
    setCurrentPage(prev => prev + 1);
  };

  return (
    <BaseContainer>
      <Typography variant="h5" sx={{ mt: 2, mb: 3 }}>
        "
        <Box component="span" sx={{ fontWeight: 'bold' }}>
          {searchQuery}
        </Box>
        "에 대한 검색 결과입니다.
      </Typography>
      <Tabs
        value={searchType}
        onChange={handleTabChange}
        variant="fullWidth"
        sx={{
          width: '100%',
        }}
      >
        <Tab label="Tracks" value="track" />
        <Tab label="Posts" value="post" />
      </Tabs>
      <Box mt={3} sx={{ width: '100%' }}>
        {searchType === 'track' && (
          <SearchTracks results={trackResults} onLoadMore={handleLoadMore} />
        )}
        {searchType === 'post' && (
          <SearchPosts results={postResults} onLoadMore={handleLoadMore} />
        )}
      </Box>
      {isLoading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <CircularProgress />
        </Box>
      )}
    </BaseContainer>
  );
};

export default SearchPage;
