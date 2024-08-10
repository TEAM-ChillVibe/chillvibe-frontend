import { Box, Button, Card, Grid, Typography } from '@mui/material';
import BaseContainer from '../../components/layout/BaseContainer';
import UserProfile from '../../components/common/UserProfile';
import TrackListItem from '../../components/common/ListItem/TrackListItem';
import PostListItem from '../../components/common/ListItem/PostListItem';
import PostListItemMini from '../../components/common/ListItem/PostListItemMini';
import { useState } from 'react';
import SimpleModal from '../../components/common/Modal/SimpleModal';
import FormModal from '../../components/common/Modal/FormModal';
import DropdownModal from '../../components/common/Modal/DropdownModal';
import PlaylistListItemMini from '../../components/common/ListItem/PlaylistListItemMini';
import HashtagChips from '../../components/common/HashtagChips';
import { fetchAllHashtags } from '../../api/hashtag/hashtagApi';

function TestPage() {
  // HANDLE FUNCTIONS ================================================
  // Modal - Simple
  const [simpleModalOpen, setSimpleModalOpen] = useState(false);

  const handleOpenSimpleModal = () => setSimpleModalOpen(true);
  const handleCloseSimpleModal = () => setSimpleModalOpen(false);

  // Modal - Form
  const [formModalOpen, setFormModalOpen] = useState(false);

  const handleOpenFormModal = () => setFormModalOpen(true);
  const handleCloseFormModal = () => setFormModalOpen(false);

  const handleFormChange = (e, fieldName) => {
    // 상태 업데이트
    setFormFields(fields =>
      fields.map(field =>
        field.label.toLowerCase() === fieldName
          ? { ...field, value: e.target.value }
          : field,
      ),
    );
  };

  const [formFields, setFormFields] = useState([
    {
      label: 'Email', // 필드 이름
      type: 'email', // 입력 유형
      value: '', // 초기값
      onChange: e => handleFormChange(e, 'email'), // 입력 값이 변경될 때 호출
    },
    {
      label: 'Password',
      type: 'password',
      value: '',
      onChange: e => handleFormChange(e, 'password'),
    },
  ]);

  // Modal - Dropdown
  const [dropdownModalOpen, setDropdownModalOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');

  const handleOpenDropdownModal = () => setDropdownModalOpen(true);
  const handleCloseDropdownModal = () => setDropdownModalOpen(false);

  const handleDropdownChange = event => {
    // 현재 선택된 값 설정
    setSelectedValue(event.target.value);
  };

  const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
  ];

  // Temp data =======================================================

  // User Profile
  const user = {
    id: 1,
    nickname: 'Julie Han',
    introduction: 'testing userprofile now',
    hashtags: ['tag1', 'tag2', 'tag3'],
  };

  // Track List
  const musicList = [
    {
      id: 1,
      title: 'Dynamite',
      artist: 'BTS',
      albumCover:
        'https://i.scdn.co/image/ab67616d0000b273668914e625d75e5fe3f1da51',
      duration: '3:19',
      audioSrc:
        'https://p.scdn.co/mp3-preview/98e266fea9df84fa3e5ca84934c513211e89489b?cid=cfe923b2d660439caf2b557b21f31221',
    },
    {
      id: 2,
      title: 'Butter',
      artist: 'BTS',
      albumCover:
        'https://i.scdn.co/image/ab67616d0000b273240447f2da1433d8f4303596',
      duration: '2:44',
      audioSrc:
        'https://p.scdn.co/mp3-preview/4d63fe1638aa41592706f835bd076443b09d8afa?cid=cfe923b2d660439caf2b557b21f31221',
    },
    {
      id: 3,
      title: 'Permission to Dance',
      artist: 'BTS',
      albumCover:
        'https://i.scdn.co/image/ab67616d0000b273a7e481899b7e0396f93d10b8',
      duration: '3:07',
      audioSrc: null,
    },
  ];

  // Post List
  const postList = [
    {
      id: 1,
      title: '여름밤 드라이브 플레이리스트',
      createdAt: '2024-07-25T14:30:00Z',
      trackCount: 15,
      hashtags: ['팝', '여름', '드라이브'],
      user: {
        id: 2,
        name: 'Alice',
        avatar: 'https://example.com/alice.jpg',
      },
      likes: 3256,
    },
    {
      id: 2,
      title: '집중력 향상을 위한 클래식 음악',
      createdAt: '2024-07-20T09:15:00Z',
      trackCount: 8,
      hashtags: ['클래식', '집중', '공부'],
      user: {
        id: 3,
        name: 'Bob',
        avatar: 'https://example.com/bob.jpg',
      },
      likes: 180,
    },
  ];

  // Playlist List
  const playlists = [
    {
      id: 1,
      title: 'Summer Hits 2024',
      trackCount: 4,
      thumbnailUrls: [
        'https://via.placeholder.com/150?text=Playlist+Image+1',
        'https://via.placeholder.com/150?text=Playlist+Image+2',
        'https://via.placeholder.com/150?text=Playlist+Image+3',
        'https://via.placeholder.com/150?text=Playlist+Image+4',
      ],
    },
    {
      id: 2,
      title: 'Chill Vibes',
      trackCount: 3,
      thumbnailUrls: [
        'https://via.placeholder.com/150?text=Playlist+Image+5',
        'https://via.placeholder.com/150?text=Playlist+Image+6',
        'https://via.placeholder.com/150?text=Playlist+Image+7',
      ],
    },
    {
      id: 3,
      title: 'Workout Beats',
      trackCount: 2,
      thumbnailUrls: [
        'https://via.placeholder.com/150?text=Playlist+Image+8',
        'https://via.placeholder.com/150?text=Playlist+Image+9',
      ],
    },
    {
      id: 4,
      title: 'Workout Beats',
      trackCount: 1,
      thumbnailUrls: ['https://via.placeholder.com/150?text=Playlist+Image+10'],
    },
    {
      id: 5,
      title: 'Workout Beats',
      trackCount: 0,
      thumbnailUrls: [],
    },
  ];

  return (
    <BaseContainer>
      {/* get all Hashtags */}
      <HashtagChips fetchHashtags={fetchAllHashtags} />

      {/* 사용자 프로필 */}
      <Typography
        variant="title"
        sx={{ textAlign: 'left', alignSelf: 'flex-start', ml: 2 }}
      >
        사용자 프로필
      </Typography>
      <Card sx={{ width: '100%' }}>
        <UserProfile user={user} />
      </Card>

      <UserProfile user={user} />

      <Typography variant="title">Modals</Typography>
      <Box sx={{ width: '100%' }}>
        {/* 모달(Simple) */}
        <Button
          onClick={handleOpenSimpleModal} // 버튼 클릭 시 동작하는 함수
          variant="contained" // 버튼 스타일
          sx={{ mr: 1 }} // 오른쪽 여백
        >
          Open Simple Modal
        </Button>
        <SimpleModal
          open={simpleModalOpen}
          onClose={handleCloseSimpleModal}
          title="Simple Modal Title"
          description="This is a simple modal description."
          primaryButtonText="Confirm" // 확인 버튼 텍스트 설정
          secondaryButtonText="Cancel" // 취소 버튼 텍스트 설정
          onPrimaryClick={handleCloseSimpleModal} // 확인 클릭 시 동작 함수
          onSecondaryClick={handleCloseSimpleModal} // 취소 클릭 시 동작 함수
        />
        {/* 모달(form) */}
        <Button
          onClick={handleOpenFormModal}
          variant="contained"
          sx={{ mr: 1 }}
        >
          Open Form Modal
        </Button>
        <FormModal
          open={formModalOpen}
          onClose={handleCloseFormModal}
          title="Form Modal Title"
          description="Please fill in the details below..."
          formFields={formFields} // 사용자가 입력해야 하는 필드 리스트
          primaryButtonText="Submit"
          secondaryButtonText="Cancel"
          onPrimaryClick={handleCloseFormModal}
          onSecondaryClick={handleCloseFormModal}
        />
        {/* 모달(dropdown) */}
        <Button
          onClick={handleOpenDropdownModal}
          variant="contained"
          sx={{ mr: 1 }}
        >
          Open Dropdown Modal
        </Button>
        <DropdownModal
          open={dropdownModalOpen}
          onClose={handleCloseDropdownModal}
          title="Select an Option"
          description="Please choose one of the following options:"
          options={options} // 드롭다운 선택 값 리스트
          selectedValue={selectedValue} // 선택된 값
          onChange={handleDropdownChange} // 선택 값이 변경되는 경우
          primaryButtonText="Confirm"
          secondaryButtonText="Cancel"
          onPrimaryClick={handleCloseDropdownModal}
          onSecondaryClick={handleCloseDropdownModal}
        ></DropdownModal>
      </Box>

      {/* 트랙 리스트 */}
      <Typography variant="title">Tracklist</Typography>
      <Box sx={{ width: '100%' }}>
        {/* list 배열 처리, 컴포넌트의 props로 데이터 전달 */}
        {musicList.map(music => (
          <TrackListItem key={music.id} music={music} />
        ))}
      </Box>

      {/* 게시글 리스트 */}
      <Typography variant="title">Posts</Typography>
      <Box sx={{ width: '100%' }}>
        {/* list 배열 처리, 컴포넌트의 props로 데이터 전달 */}
        {postList.map(post => (
          <PostListItem key={post.id} post={post} />
        ))}
      </Box>

      {/* 게시글 리스트 mini (메인페이지용) */}
      <Typography variant="title">Posts for mainpage</Typography>
      <Grid container spacing={2}>
        {postList.map(post => (
          <Grid item xs={6} key={post.id}>
            {/* 각 아이템이 50% 차지 */}
            <PostListItemMini post={post} />
          </Grid>
        ))}
      </Grid>

      {/* 플레이리스트 리스트 mini */}
      <Typography variant="title">Playlists</Typography>
      <Grid container spacing={2}>
        {playlists.map(playlist => (
          <Grid item xs={6} key={playlist.id}>
            <PlaylistListItemMini playlist={playlist} />
          </Grid>
        ))}
      </Grid>

      {/* empty box for scroll test */}
      <Box
        sx={{
          height: '1000px',
          border: 1,
        }}
      >
        empty box for scroll test
      </Box>
    </BaseContainer>
  );
}

export default TestPage;
