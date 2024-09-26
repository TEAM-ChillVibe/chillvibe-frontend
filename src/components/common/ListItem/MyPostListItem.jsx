import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LikeButton from '../Button/LikeButton';
import { fetchHashtagsOfPost } from '../../../api/hashtag/hashtagApi';
import { formatDate } from '../../../utils/reusableFn';
import SingleHashtagChips from '../HashtagChips/SingleHashtagChips';
import SimpleModal from '../../../components/common/Modal/SimpleModal';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import ModeCommentIcon from '@mui/icons-material/ModeComment';

function MyPostListItem({ post }) {
  const {
    id,
    title,
    createdAt,
    trackCount,
    likeCount,
    thumbnailUrl,
    deleted, // 게시글이 삭제되었는지 여부
    commentCount,
  } = post;
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);

  const handleNavigateToPost = () => {
    if (deleted) {
      setModalOpen(true); // 삭제된 게시글이면 모달 열기
    } else {
      navigate(`/post/${id}`); // 삭제되지 않은 게시글이면 상세 페이지로 이동
    }
  };

  const handleHashtagClick = hashtag => {
    navigate(`/all-tags?hashtag=${hashtag.id}`);
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          py: 2,
          flexWrap: 'wrap',
        }}
      >
        <Box
          onClick={handleNavigateToPost}
          sx={{
            width: 120,
            height: 120,
            mr: 2,
            borderRadius: 1,
            overflow: 'hidden',
            order: 1,
            cursor: 'pointer',
          }}
        >
          {/* 이미지 소스 수정 필요 */}
          <img
            src={thumbnailUrl}
            alt={'Track img'}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            py: 2,
            order: 2,
            alignItems: 'flex-start',
            justifyContent: 'space-between',
          }}
        >
          <Typography
            variant="trackTitle"
            onClick={handleNavigateToPost}
            sx={{ cursor: 'pointer' }}
            noWrap
          >
            {title}
          </Typography>
          <Typography variant="trackArtist">트랙 {trackCount}개</Typography>
          <SingleHashtagChips
            fetchHashtags={() => fetchHashtagsOfPost(post.id)}
            onChipClick={handleHashtagClick}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            my: 1,
            order: 3,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              height: '100%',
              py: 2,
            }}
          >
            <Typography variant="date">{formatDate(createdAt)}</Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
              }}
            >
              <LikeButton postId={id} initialLikeCount={likeCount} />
              <Box display="flex" alignItems="center">
                <ModeCommentIcon sx={{ fontSize: 14, mr: 1 }} />
                <Typography variant="body2">{commentCount}</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* 신고로 삭제된 게시글 모달 */}
      <SimpleModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1,
            }}
          >
            <PriorityHighIcon color="error" />
            <Typography variant="h6">신고된 게시글</Typography>
          </Box>
        }
        description="이 게시글은 신고되어 삭제되었습니다."
        primaryButtonText="확인"
        onPrimaryClick={() => setModalOpen(false)}
      />
    </>
  );
}

export default MyPostListItem;
