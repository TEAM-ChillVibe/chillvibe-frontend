import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchPostById, deletePost, reportPost } from '../../api/post/postApi';
import { myInfo } from '../../api/user/userApi';

import {
  Box,
  Typography,
  List,
  ListItem,
  Button,
  Card,
  Menu,
  MenuItem,
} from '@mui/material';
import BaseContainer from '../../components/layout/BaseContainer';
import Comment from '../../pages/comment/Comment';
import TrackListItem from '../../components/common/ListItem/TrackListItem';
import LikeButton from '../../components/common/Button/LikeButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SimpleModal from '../../components/common/Modal/SimpleModal';
import SnackbarAlert from '../../components/common/Alert/SnackbarAlert';
import { formatDate } from '../../utils/reusableFn';
import UserProfile from '../../components/common/UserProfile';
import SingleHashtagChips from '../../components/common/HashtagChips/SingleHashtagChips';
import { fetchHashtagsOfPost } from '../../api/hashtag/hashtagApi';
import usePostStore from '../../store/usePostStore';
import MoreVertIcon from '@mui/icons-material/MoreVert'; // morevert 아이콘 추가
import ReportIcon from '@mui/icons-material/Report';
import IconButton from '@mui/material/IconButton'; // 신고 아이콘 추가

const PostDetail = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reportModalOpen, setReportModalOpen] = useState(false); // 신고 모달 상태 추가
  const [menuAnchorEl, setMenuAnchorEl] = useState(null); // 메뉴 상태 추가
  const [snackbarOpen, setSnackbarOpen] = useState(false); // 성공적으로 신고한 후의 스낵바 상태 추가
  const [alreadyReportedSnackbarOpen, setAlreadyReportedSnackbarOpen] =
    useState(false); // 이미 신고한 게시글 알림 스낵바

  const [userLike, setUserLike] = useState(false);
  const { likedPosts, loadPostById } = usePostStore(state => ({
    likedPosts: state.likedPosts,
    loadPostById: state.loadPostById,
  }));

  // 현재 사용자가 포스트의 작성자인지 여부를 확인하는 상태
  const [isOwner, setIsOwner] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const openMenu = event => setMenuAnchorEl(event.currentTarget); // 메뉴 열기 함수 추가
  const closeMenu = () => setMenuAnchorEl(null); // 메뉴 닫기 함수 추가
  const openReportModal = () => setReportModalOpen(true);
  const closeReportModal = () => setReportModalOpen(false);

  const handleSnackbarClose = () => setSnackbarOpen(false); // 스낵바 닫기
  const closeAlreadyReportedSnackbar = () =>
    setAlreadyReportedSnackbarOpen(false); // 이미 신고한 게시글 모달 닫기

  useEffect(() => {
    const getPost = async () => {
      try {
        const postResponse = await fetchPostById(postId); // 게시글 정보 가져오기
        setUserLike(postResponse.userLike); // ✔️ userLike 상태 설정
        console.log('Fetched userLike:', postResponse.userLike); // 여기서 userLike 값이 올바른지 확인
        console.log('Fetched postResponse:', postResponse);
        setPost(postResponse);

        try {
          const userResponse = await myInfo(); // 사용자 정보 가져오기
          console.log('Fetched userResponse:', userResponse); // ✔️ 로그 추가

          // userResponse에 대한 구조 확인
          const postOwnerId = postResponse?.user?.userId;
          const currentUserId = userResponse?.userId || userResponse?.id; // 두 가지 경우 모두 확인

          // 사용자가 로그인했음을 확인
          setIsLoggedIn(true);

          if (postOwnerId && currentUserId) {
            if (String(postOwnerId) === String(currentUserId)) {
              // 동일한 타입으로 변환 후 비교
              setIsOwner(true); // 사용자가 작성자인 경우
            } else {
              setIsOwner(false); // 사용자가 작성자가 아닌 경우
            }
          }
        } catch {
          // 사용자가 로그인되지 않은 경우 (userResponse 가져오기 실패)
          setIsLoggedIn(false);
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    getPost();
  }, [postId]);

  // 렌더링 전 상태를 확인합니다.
  console.log('userLike after fetching post:', userLike); // 현재 상태 확인

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography>Error loading post: {error.message}</Typography>;
  }

  const handleHashtagClick = hashtag => {
    navigate(`/all-tags?hashtag=${hashtag.id}`);
  };

  const handleDelete = async () => {
    try {
      await deletePost(postId);
      setPost(null);
      navigate('/discover');
    } catch (error) {
      console.error('Error deleting post:', error);
    } finally {
      closeModal();
    }
  };

  // ✔️ 줄바꿈
  const convertLineBreaks = text => {
    return text.split('\n').map((line, index) => (
      <span key={index}>
        {line}
        <br />
      </span>
    ));
  };

  // 신고 기능
  const handleReportConfirm = async () => {
    try {
      await reportPost(postId); // 신고 API 호출
      setReportModalOpen(false); // 신고 완료 후 모달 닫기
      setSnackbarOpen(true);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // 이미 신고한 경우
        setReportModalOpen(false);
        setAlreadyReportedSnackbarOpen(true); // 이미 신고한 경우 모달 열기
      } else {
        console.error('Error reporting post: ', error);
      }
    }
  };

  return (
    <BaseContainer>
      <Box sx={{ mb: 2, width: '100%', p: 2 }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="flex-start"
          sx={{ mb: 2, width: '100%' }}
        >
          <Box display="flex" flexDirection="column" sx={{ gap: 1 }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
              {post.title}
            </Typography>
            <Typography variant="date">
              트랙 {post.playlists.trackCount}개 | {formatDate(post.createdAt)}
            </Typography>
          </Box>
          {isLoggedIn && (
            <Box display="flex" alignItems="center" sx={{ pt: 1 }}>
              <Box display="flex" alignItems="center" sx={{ mr: 3 }}>
                <LikeButton
                  postId={post.id}
                  initialLikeCount={post.likeCount}
                  userLike={likedPosts.includes(post.id)}
                />
              </Box>

              {/*신고 버튼: 게시글 소유자가 아닐 때만 노출*/}
              {!isOwner && (
                <IconButton onClick={openMenu} sx={{ mr: 0 }}>
                  <MoreVertIcon />
                </IconButton>
              )}

              <Menu
                anchorEl={menuAnchorEl}
                open={Boolean(menuAnchorEl)}
                onClose={closeMenu}
                PaperProps={{
                  sx: {
                    borderRadius: 1,
                    marginTop: 1.5,
                    paddingX: 1,
                  },
                }}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                {!isOwner && (
                  <MenuItem
                    onClick={() => {
                      openReportModal(); // 신고 모달 열기
                      closeMenu();
                    }}
                    sx={{
                      fontSize: '0.8rem',
                      justifyContent: 'flex-end',
                      padding: '3px 5px',
                    }}
                  >
                    <ReportIcon fontSize="small" sx={{ marginRight: '4px' }} />
                    신고
                  </MenuItem>
                )}
              </Menu>

              {isOwner && (
                <Box
                  sx={{
                    display: 'flex',
                    gap: 1,
                  }}
                >
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<EditIcon />}
                    onClick={() => navigate(`/edit-post/${postId}`)}
                    sx={{ whiteSpace: 'nowrap' }}
                  >
                    수정
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={openModal}
                    sx={{ whiteSpace: 'nowrap' }}
                  >
                    삭제
                  </Button>
                </Box>
              )}
            </Box>
          )}
        </Box>

        {/* 설명 텍스트 */}
        <Typography variant="body2" sx={{ mt: 2, mb: 3, textAlign: 'left' }}>
          {convertLineBreaks(post.description)}
        </Typography>

        {/* 해시태그 */}
        <SingleHashtagChips
          fetchHashtags={() => fetchHashtagsOfPost(postId)}
          onChipClick={handleHashtagClick}
        />
      </Box>
      {/* 트랙 리스트 */}
      <Typography variant="subtitle1">Tracks</Typography>
      <List sx={{ width: '100%' }}>
        {post.playlists &&
        post.playlists.tracks &&
        post.playlists.tracks.length > 0 ? (
          post.playlists.tracks.map(track => (
            <ListItem key={track.id}>
              <TrackListItem
                music={{
                  name: track.name,
                  artist: track.artist,
                  thumbnailUrl: track.thumbnailUrl,
                  duration: track.duration,
                  previewUrl: track.previewUrl,
                }}
              />
            </ListItem>
          ))
        ) : (
          <Typography variant="body2" sx={{ my: 5, textAlign: 'center' }}>
            플레이리스트에 트랙이 없습니다.
          </Typography>
        )}
      </List>
      {/* 사용자 정보 */}
      <Card sx={{ bgcolor: '#1f1f1f', my: 7, width: '100%' }}>
        <UserProfile user={post.user} />
      </Card>
      {/* 댓글 섹션 */}
      <Typography variant="subtitle1" sx={{ my: 2 }}>
        Comments
      </Typography>
      <Comment postId={postId} user={post.user} />

      {/* 신고 모달 */}
      <SimpleModal
        open={reportModalOpen}
        onClose={closeReportModal}
        title="Report Post"
        description="이 게시글을 신고하시겠습니까?"
        primaryButtonText="신고"
        secondaryButtonText="취소"
        onPrimaryClick={handleReportConfirm} // 신고 확인 함수 연결
        onSecondaryClick={closeReportModal}
        primaryButtonStyle="error"
      />

      {/* 이미 신고한 경우의 스낵바 */}
      <SnackbarAlert
        open={alreadyReportedSnackbarOpen}
        onClose={closeAlreadyReportedSnackbar}
        message="이미 신고한 게시글입니다."
        severity="error"
      />

      {/* 신고 완료 스낵바 */}
      <SnackbarAlert
        open={snackbarOpen}
        onClose={handleSnackbarClose}
        message="성공적으로 신고되었습니다."
        severity="success"
      />

      {/* postId를 prop으로 전달 */}
      {/* 삭제 모달 */}
      {isOwner && ( // isOwner가 true일 때만 모달 관련 코드를 렌더링
        <SimpleModal
          open={isModalOpen}
          onClose={closeModal}
          title="Delete Post"
          description={`게시글을 삭제하시겠습니까?\n삭제된 게시글은 복구할 수 없습니다.`}
          primaryButtonText="삭제"
          secondaryButtonText="취소"
          onPrimaryClick={handleDelete}
          onSecondaryClick={closeModal}
          primaryButtonStyle="error"
        />
      )}
    </BaseContainer>
  );
};

export default PostDetail;
