import { Box, Chip } from '@mui/material';
import { useEffect, useState } from 'react';

const SingleHashtagChips = ({
  fetchHashtags,
  onChipClick,
  selectedHashtag,
}) => {
  const [hashtags, setHashtags] = useState([]);

  useEffect(() => {
    const loadHashtags = async () => {
      const data = await fetchHashtags();
      setHashtags(data);
    };

    loadHashtags();
  }, [fetchHashtags]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 1,
      }}
    >
      {hashtags.map(hashtag => (
        <Chip
          key={hashtag.id}
          label={`#${hashtag.name}`}
          size="small"
          onClick={() => onChipClick(hashtag)}
          color={selectedHashtag === hashtag.id ? 'primary' : 'default'}
        />
      ))}
    </Box>
  );
};

export default SingleHashtagChips;
