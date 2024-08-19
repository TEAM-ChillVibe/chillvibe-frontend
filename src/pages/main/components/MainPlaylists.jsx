// import React, { useEffect, useState } from 'react';
// import { Typography, Grid, Box, IconButton } from '@mui/material';
// import PostListItemMini from '../../../components/common/ListItem/PostListItemMini';
// import { motion, AnimatePresence } from 'framer-motion';
// import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
// import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

// const PageIndicator = ({ currentPage, totalPages, onPageChange }) => {
//   return (
//     <Box
//       sx={{
//         display: 'flex',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         mt: 2,
//         width: '100%',
//       }}
//     >
//       <IconButton
//         onClick={() => onPageChange(-1)}
//         disabled={currentPage === 0}
//         size="small"
//         color="primary"
//       >
//         <ArrowBackIosNewIcon />
//       </IconButton>
//       {/*{[...Array(Math.min(totalPages, 3))].map((_, index) => (*/}
//       {/*  <Box*/}
//       {/*    key={index}*/}
//       {/*    sx={{*/}
//       {/*      width: 8,*/}
//       {/*      height: 8,*/}
//       {/*      borderRadius: '50%',*/}
//       {/*      mx: 0.5,*/}
//       {/*      bgcolor: index === currentPage ? 'primary.main' : 'grey.300',*/}
//       {/*      transition: 'all 0.s ease',*/}
//       {/*    }}*/}
//       {/*  />*/}
//       {/*))}*/}
//       <IconButton
//         onClick={() => onPageChange(1)}
//         disabled={currentPage === totalPages - 1}
//         size="small"
//         color="primary"
//       >
//         <ArrowForwardIosIcon />
//       </IconButton>
//     </Box>
//   );
// };

// const MainPlaylists = ({
//   playlists,
//   loading,
//   page,
//   totalPages,
//   onPageChange,
// }) => {
//   const [activePages, setActivePages] = useState([]);
//   const [direction, setDirection] = useState(1);

//   useEffect(() => {
//     const pages = [...Array(Math.min(totalPages, 3))].map((_, i) => i);
//     setActivePages(pages);
//   }, [totalPages]);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       if (!loading && activePages.length > 1) {
//         handlePageChange(1);
//       }
//     }, 10000); // 10초마다 페이지 변경

//     return () => clearInterval(timer);
//   }, [loading, activePages, page]);

//   const handlePageChange = dir => {
//     onPageChange(prevPage => {
//       const currentIndex = activePages.indexOf(prevPage);
//       const nextIndex =
//         (currentIndex + dir + activePages.length) % activePages.length;
//       setDirection(dir);
//       return activePages[nextIndex];
//     });
//   };

//   const slideVariants = {
//     enter: direction => ({
//       x: direction > 0 ? '100%' : '-100%',
//       opacity: 0,
//     }),
//     center: {
//       x: 0,
//       opacity: 1,
//     },
//     exit: direction => ({
//       x: direction < 0 ? '100%' : '-100%',
//       opacity: 0,
//     }),
//   };

//   return (
//     <Box sx={{ width: '100%', height: 'auto', overflow: 'hidden', px: 2 }}>
//       <PageIndicator
//         currentPage={activePages.indexOf(page)}
//         totalPages={activePages.length}
//         onPageChange={handlePageChange}
//       />
//       <Box sx={{ position: 'relative', minHeight: '400px' }}>
//         <AnimatePresence initial={false} custom={direction}>
//           <motion.div
//             key={page}
//             custom={direction}
//             variants={slideVariants}
//             initial="enter"
//             animate="center"
//             exit="exit"
//             transition={{
//               x: { type: 'spring', stiffness: 300, damping: 30 },
//               opacity: { duration: 0.2 },
//             }}
//             style={{
//               position: 'absolute',
//               width: '100%',
//             }}
//           >
//             <Grid container>
//               {playlists.length > 0 ? (
//                 playlists.map(playlist => (
//                   <Grid item sm={6} key={playlist.id}>
//                     <Box sx={{ px: 2, py: 1 }}>
//                       <PostListItemMini
//                         post={playlist}
//                         hashtags={playlist.hashtags}
//                       />
//                     </Box>
//                   </Grid>
//                 ))
//               ) : (
//                 <Grid
//                   item
//                   xs={12}
//                   container
//                   justifyContent="center"
//                   alignItems="center"
//                   sx={{ minHeight: '200px' }} // Adjust as needed
//                 >
//                   <Typography>게시글이 없습니다.</Typography>
//                 </Grid>
//               )}
//             </Grid>
//           </motion.div>
//         </AnimatePresence>
//       </Box>
//     </Box>
//   );
// };

// export default MainPlaylists;
import React, { useEffect, useState } from 'react';
import { Typography, Grid, Box, IconButton } from '@mui/material';
import PostListItemMini from '../../../components/common/ListItem/PostListItemMini';
import { motion, AnimatePresence } from 'framer-motion';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const PageIndicator = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mt: 2,
        width: '100%',
      }}
    >
      <IconButton
        onClick={() => onPageChange(-1)}
        disabled={currentPage === 0}
        size="small"
        color="primary"
      >
        <ArrowBackIosNewIcon />
      </IconButton>
      <IconButton
        onClick={() => onPageChange(1)}
        disabled={currentPage === totalPages - 1}
        size="small"
        color="primary"
      >
        <ArrowForwardIosIcon />
      </IconButton>
    </Box>
  );
};

const MainPlaylists = ({
  playlists,
  loading,
  page,
  totalPages,
  onPageChange,
  loadPosts, // 추가: 페이지 변경 시 호출할 로딩 함수
}) => {
  const [activePages, setActivePages] = useState([]);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const pages = [...Array(Math.min(totalPages, 3))].map((_, i) => i);
    setActivePages(pages);
  }, [totalPages]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!loading && activePages.length > 1) {
        handlePageChange(1);
      }
    }, 10000); // 10초마다 페이지 변경

    return () => clearInterval(timer);
  }, [loading, activePages, page]);

  const handlePageChange = async dir => {
    setDirection(dir);
    const currentIndex = activePages.indexOf(page);
    const nextIndex =
      (currentIndex + dir + activePages.length) % activePages.length;
    const newPage = activePages[nextIndex];
    await loadPosts(newPage);
    onPageChange(newPage);
  };

  const slideVariants = {
    enter: direction => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: direction => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
    }),
  };

  return (
    <Box sx={{ width: '100%', height: 'auto', overflow: 'hidden', px: 2 }}>
      <PageIndicator
        currentPage={activePages.indexOf(page)}
        totalPages={activePages.length}
        onPageChange={handlePageChange}
      />
      <Box sx={{ position: 'relative', minHeight: '450px' }}>
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={page}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            style={{
              position: 'absolute',
              width: '100%',
            }}
          >
            <Grid container>
              {playlists.length > 0 ? (
                playlists.map(playlist => (
                  <Grid item sm={6} key={playlist.id}>
                    <Box sx={{ px: 2, py: 1 }}>
                      <PostListItemMini
                        post={playlist}
                        hashtags={playlist.hashtags}
                      />
                    </Box>
                  </Grid>
                ))
              ) : (
                <Grid
                  item
                  xs={12}
                  container
                  justifyContent="center"
                  alignItems="center"
                  sx={{ minHeight: '200px' }} // Adjust as needed
                >
                  <Typography>게시글이 없습니다.</Typography>
                </Grid>
              )}
            </Grid>
          </motion.div>
        </AnimatePresence>
      </Box>
    </Box>
  );
};

export default MainPlaylists;
