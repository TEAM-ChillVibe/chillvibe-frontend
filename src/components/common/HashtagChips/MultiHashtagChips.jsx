import { useEffect, useState } from 'react';
import { Box, Chip } from '@mui/material';

const MAX_SELECTION = 5;

const MultiHashtagChips = ({
  fetchHashtags,
  selectedHashtags,
  onSelectionChange,
}) => {
  const [hashtags, setHashtags] = useState([]);

  useEffect(() => {
    const loadHashtags = async () => {
      const data = await fetchHashtags();
      setHashtags(data);
    };
    loadHashtags();
  }, [fetchHashtags]);

  const onChipClick = hashtag => {
    const isSelected = selectedHashtags.includes(hashtag.id);

    if (isSelected) {
      const newSelection = selectedHashtags.filter(id => id !== hashtag.id);
      onSelectionChange(newSelection);
    } else {
      if (selectedHashtags.length < MAX_SELECTION) {
        const newSelection = [...selectedHashtags, hashtag.id];
        onSelectionChange(newSelection);
      }
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 1,
      }}
    >
      {hashtags.map((hashtag, index) => (
        <Chip
          key={hashtag.id}
          label={`#${hashtag.name}`}
          size="small"
          color={selectedHashtags.includes(hashtag.id) ? 'primary' : 'default'}
          onClick={() => onChipClick(hashtag)}
          sx={{
            opacity: selectedHashtags.includes(hashtag.id) ? 1 : 0.5,
          }}
        />
      ))}
    </Box>
  );
};

export default MultiHashtagChips;
