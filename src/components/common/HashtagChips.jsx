import { Box, Chip } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const HashtagChips = ({ hashtags }) => {
  const navigate = useNavigate();

  const handleChipClick = tagId => {
    navigate(`all-tags/${tagId}`);
  };
  return (
    <Box
      sx={{
        display: 'flex', // 수평 or 수직으로 정렬
        flexWrap: 'wrap', // 너비가 넘치면 다음줄로
        gap: 1,
        mt: 1,
      }}
    >
      {hashtags.map((hashtag, index) => (
        <Chip
          key={hashtag.id}
          label={`#${hashtag}`}
          size="small"
          onClick={() => handleChipClick(hashtag.id)}
        />
      ))}
    </Box>
  );
};

export default HashtagChips;
