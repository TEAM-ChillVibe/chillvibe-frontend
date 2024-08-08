import { Box, Chip } from '@mui/material';
import { useEffect, useState } from 'react';
import useHashtagStore from '../../store/useHashtagStore';

const HashtagChips = ({
  fetchHashtags,
  onChipClick,
  multiSelectMode = false,
}) => {
  const [hashtags, setHashtags] = useState([]);

  const {
    multiSelectedHashtags,
    singleSelectedHashtag,
    multiToggleHashtag,
    multiSetSelectedHashtags,
    singleSetSelectedHashtag,
  } = useHashtagStore(state => ({
    multiSelectedHashtags: state.multiSelectedHashtags,
    singleSelectedHashtag: state.singleSelectedHashtag,
    multiToggleHashtag: state.multiToggleHashtag,
    multiSetSelectedHashtags: state.multiSetSelectedHashtags,
    singleSetSelectedHashtag: state.singleSetSelectedHashtag,
  }));

  useEffect(() => {
    const loadHashtags = async () => {
      const data = await fetchHashtags();
      setHashtags(data);
    };

    loadHashtags();
  }, [fetchHashtags]);

  const handleChipClick = tagId => {
    if (multiSelectMode) {
      // 다중 선택 모드
      multiToggleHashtag(tagId);
    } else {
      // 단일 선택 모드
      singleSetSelectedHashtag(tagId);
    }

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
            backgroundColor: (
              multiSelectMode
                ? multiSelectedHashtags.includes(hashtag.id)
                : singleSelectedHashtag === hashtag.id
            )
              ? 'primary.main'
              : '#999',
            color: (
              multiSelectMode
                ? multiSelectedHashtags.includes(hashtag.id)
                : singleSelectedHashtag === hashtag.id
            )
              ? 'white'
              : 'text.primary',
            '&:hover': {
              backgroundColor: (
                multiSelectMode
                  ? multiSelectedHashtags.includes(hashtag.id)
                  : singleSelectedHashtag === hashtag.id
              )
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
