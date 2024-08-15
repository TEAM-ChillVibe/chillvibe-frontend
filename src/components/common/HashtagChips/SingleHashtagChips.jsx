import { Box, Chip, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

const SingleHashtagChips = ({
  fetchHashtags,
  onChipClick,
  selectedHashtag,
  noHashtagsMessage = '해시태그가 없습니다.',
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
      {hashtags.length === 0 ? (
        <Typography variant="body2" color="text.secondary">
          {noHashtagsMessage}
        </Typography>
      ) : (
        hashtags.map(hashtag => (
          <Chip
            key={hashtag.id}
            label={`#${hashtag.name}`}
            size="small"
            onClick={() => onChipClick(hashtag)}
            color={selectedHashtag === hashtag.id ? 'primary' : 'default'}
            sx={{
              opacity: selectedHashtag === hashtag.id ? 1 : 0.9,
              transition: 'opacity 0.3s ease',
            }}
          />
        ))
      )}
    </Box>
  );
};

export default SingleHashtagChips;
