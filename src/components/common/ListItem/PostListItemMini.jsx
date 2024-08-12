import { Box, Typography, Chip } from '@mui/material';
import albumSample from '../albumSample.jpeg';
import HashtagChips from '../HashtagChips';
import { useNavigate } from 'react-router-dom';
import { fetchHashtagsOfPost } from '../../../api/hashtag/hashtagApi';

function PostListItemMini({ post, hashtags }) {
  const { id, title, user, thumbnailUrl } = post;
  const navigate = useNavigate();

  const handlePlaylistClick = () => {
    navigate(`/post/${id}`);
  };

  const handlePostHashtagClick = hashtagId => {
    // 선택된 해시태그를 localStorage에 저장
    localStorage.setItem('selectedHashtag', hashtagId);

    // AllTags 페이지로 이동
    navigate('/all-tags');
  };

  // const handlePostHashtagClick = hashtag => {
  //   navigate(`/all-tags`);
  // };

  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        py: 2,
        flexWrap: 'wrap',
      }}
    >
      <Box
        sx={{
          cursor: 'pointer',
          width: 80,
          height: 80,
          mr: 2,
          borderRadius: 1,
          overflow: 'hidden',
          order: 1,
        }}
        onClick={handlePlaylistClick}
      >
        <img
          src={thumbnailUrl || albumSample} // 썸네일 URL이 없으면 기본 이미지 사용
          alt={'Thumbnail'}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          order: 2,

          alignItems: 'flex-start',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant="subtitle1"
          component="div"
          noWrap
          sx={{ cursor: 'pointer' }} // 커서를 포인터로 변경하여 클릭 가능함을 나타냄
          onClick={handlePlaylistClick} // 제목 클릭 시 게시글로 이동
        >
          {title}
        </Typography>
        <Typography variant="body2">{user.nickname}</Typography>
        <SingleHashtagChips
          fetchHashtags={() => fetchHashtagsOfPost(id)}
          onChipClick={handlePostHashtagClick}
        />
      </Box>
    </Box>
  );
}

export default PostListItemMini;
