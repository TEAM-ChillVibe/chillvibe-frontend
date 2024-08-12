import { Box, Chip } from '@mui/material';
import { useEffect, useState } from 'react';

const HashtagChips = ({
  fetchHashtags,
  onChipClick,
  multiSelectMode = false,
  selectedHashtags: initialSelectedHashtags = [],
}) => {
  const [hashtags, setHashtags] = useState([]);
  const [selectedHashtags, setSelectedHashtags] = useState([]);
  const [selectedHashtag, setSelectedHashtag] = useState(null);

  useEffect(() => {
    if (multiSelectMode) {
      // const storedHashtags = JSON.parse(
      //   localStorage.getItem('selectedHashtags') || '[]',
      // );
      // setSelectedHashtags(storedHashtags);
      setSelectedHashtags(initialSelectedHashtags);
    } else {
      const storedHashtag = localStorage.getItem('selectedHashtag');
      if (storedHashtag) {
        setSelectedHashtag(storedHashtag);
      }
    }
  }, [initialSelectedHashtags, multiSelectMode]);

  useEffect(() => {
    const loadHashtags = async () => {
      const data = await fetchHashtags();
      setHashtags(data);
    };

    loadHashtags();
  }, [fetchHashtags]);

  const handleChipClick = tagId => {
    if (multiSelectMode) {
      const newSelectedHashtags = [...selectedHashtags];
      if (newSelectedHashtags.includes(tagId)) {
        const index = newSelectedHashtags.indexOf(tagId);
        newSelectedHashtags.splice(index, 1);
      } else {
        if (newSelectedHashtags.length < 5) {
          newSelectedHashtags.push(tagId);
        }
      }
      setSelectedHashtags(newSelectedHashtags);
      localStorage.setItem(
        'selectedHashtags',
        JSON.stringify(newSelectedHashtags),
      );
      console.log('Updated selectedHashtags:', newSelectedHashtags); // 확인용 로그

      if (onChipClick) {
        onChipClick(newSelectedHashtags);
      }
    } else {
      localStorage.setItem('selectedHashtag', tagId);
      setSelectedHashtag(tagId);

      if (onChipClick) {
        onChipClick(tagId);
      }
    }
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
          sx={{
            backgroundColor: multiSelectMode
              ? selectedHashtags.includes(hashtag.id)
                ? 'primary.main'
                : '#999'
              : hashtag.id === selectedHashtag
                ? 'primary.main'
                : '#999',
            color: multiSelectMode
              ? selectedHashtags.includes(hashtag.id)
                ? 'text.primary'
                : 'text.dark'
              : hashtag.id === selectedHashtag
                ? 'text.primary'
                : 'text.dark',
            '&:hover': {
              backgroundColor: multiSelectMode
                ? selectedHashtags.includes(hashtag.id)
                  ? 'primary.main'
                  : 'secondary.light'
                : hashtag.id === selectedHashtag
                  ? 'primary.main'
                  : 'secondary.light',
            },
          }}
        />
      ))}
    </Box>
  );
};

export default HashtagChips;
