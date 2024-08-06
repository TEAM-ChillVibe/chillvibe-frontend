// import React from 'react';
// import {
//   List,
//   ListItem,
//   Box,
//   Pagination,
//   PaginationItem,
//   Typography,
// } from '@mui/material';
// import FirstPageIcon from '@mui/icons-material/FirstPage';
// import LastPageIcon from '@mui/icons-material/LastPage';
// import NavigateNextIcon from '@mui/icons-material/NavigateNext';
// import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
// import TrackListItem from '../../../components/common/ListItem/TrackListItem';

// const SearchTracks = ({ results, onPageChange }) => {
//   if (!results || !results.content || results.content.length === 0)
//     return <Typography>트랙 검색 결과가 없습니다.</Typography>;

//   const handlePageChange = (event, value) => {
//     onPageChange(value - 1);
//   };
//   return (
//     <Box sx={{ width: '100%' }}>
//       <Typography variant="h6" sx={{ mb: 2 }}>
//         트랙 검색 결과
//       </Typography>
//       <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
//         {results.content.map(track => (
//           <ListItem key={track.id} disablePadding sx={{ mb: 1 }}>
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
//       <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
//         <Pagination
//           count={results.page.totalPages}
//           page={results.page.number + 1}
//           onChange={handlePageChange}
//           siblingCount={4}
//           boundaryCount={0}
//           showFirstButton
//           showLastButton
//           shape="rounded"
//           renderItem={item => (
//             <PaginationItem
//               components={{
//                 first: FirstPageIcon,
//                 last: LastPageIcon,
//                 next: NavigateNextIcon,
//                 previous: NavigateBeforeIcon,
//               }}
//               {...item}
//             />
//           )}
//         />
//       </Box>
//     </Box>
//   );
// };

// export default SearchTracks;
import React, { useRef, useEffect, useState } from 'react';
import {
  List,
  ListItem,
  Box,
  Typography,
  CircularProgress,
} from '@mui/material';
import TrackListItem from '../../../components/common/ListItem/TrackListItem';

const SearchTracks = ({ results, onLoadMore }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLastPage, setIsLastPage] = useState(false);
  const lastItemRef = useRef(null);

  useEffect(() => {
    if (
      results &&
      results.content &&
      results.content.length > 0 &&
      !isLastPage
    ) {
      const observer = new IntersectionObserver(
        async entries => {
          if (entries[0].isIntersecting) {
            setIsLoading(true);
            await onLoadMore();
            setIsLoading(false);
          }
        },
        { threshold: 1 },
      );

      if (lastItemRef.current) {
        observer.observe(lastItemRef.current);
      }

      return () => {
        if (lastItemRef.current) {
          observer.unobserve(lastItemRef.current);
        }
      };
    }
  }, [results, onLoadMore, isLastPage]);

  useEffect(() => {
    if (
      results &&
      results.page &&
      results.page.totalPages !== undefined &&
      results.page.number !== undefined
    ) {
      setIsLastPage(results.page.number + 1 >= results.page.totalPages);
    }
  }, [results]);

  if (!results || !results.content || results.content.length === 0)
    return <Typography>트랙 검색 결과가 없습니다.</Typography>;

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        트랙 검색 결과
      </Typography>
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {results.content.map((track, index) => (
          <ListItem
            key={track.id}
            disablePadding
            sx={{ mb: 1 }}
            ref={index === results.content.length - 1 ? lastItemRef : null}
          >
            <TrackListItem
              music={{
                title: track.name,
                artist: track.artistName,
                albumCover: track.albumImageUrl,
                duration: track.duration,
                audioSrc: track.previewUrl,
              }}
            />
          </ListItem>
        ))}
      </List>
      {isLoading && !isLastPage && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
};

export default SearchTracks;
