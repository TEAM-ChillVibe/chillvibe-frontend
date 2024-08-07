import { Box, Chip } from '@mui/material';
import { useEffect, useState } from 'react';
import useHashtagStore from '../../store/useHashtagStore';

const HashtagChips = ({ fetchHashtags, onChipClick }) => {
  const [hashtags, setHashtags] = useState([]);

  const { selectedHashtag, setSelectedHashtag } = useHashtagStore(state => ({
    selectedHashtag: state.selectedHashtag,
    setSelectedHashtag: state.setSelectedHashtag,
  }));

  useEffect(() => {
    const loadHashtags = async () => {
      const data = await fetchHashtags();
      setHashtags(data);
    };

    loadHashtags();
  }, [fetchHashtags]);

  const handleChipClick = tagId => {
    setSelectedHashtag(tagId); // 상태 업데이트
    if (onChipClick) {
      onChipClick(tagId); // 상위 컴포넌트에서 페이지 이동 로직 처리
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
            backgroundColor:
              selectedHashtag === hashtag.id ? 'primary.main' : '#999',
            color: selectedHashtag === hashtag.id ? 'white' : 'text.primary',
            '&:hover': {
              backgroundColor:
                selectedHashtag === hashtag.id
                  ? 'primary.dark'
                  : 'action.hover',
            },
          }}
        />
      ))}
    </Box>
  );
};

export default HashtagChips;
