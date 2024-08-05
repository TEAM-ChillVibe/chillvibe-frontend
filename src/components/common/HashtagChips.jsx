import { Box, Chip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const HashtagChips = ({ fetchHashtags }) => {
  const [hashtags, setHashtags] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadHashtags = async () => {
      const data = await fetchHashtags();
      setHashtags(data);
    };

    loadHashtags();
  }, [fetchHashtags]);

  const handleChipClick = tagId => {
    navigate(`/all-tags/${tagId}`);
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
          label={`#${hashtag.name}`}
          size="small"
          onClick={() => handleChipClick(hashtag.id)}
        />
      ))}
    </Box>
  );
};

export default HashtagChips;
