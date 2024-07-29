import { Box, Button, Card, Grid, Typography } from '@mui/material';
import BaseContainer from '../../components/layout/BaseContainer';
import UserProfile from '../../components/common/UserProfile';
import TrackListItem from '../../components/common/TrackListItem';
import PostListItem from '../../components/common/PostListItem';
import PostListItemMini from '../../components/common/PostListItemMini';
import { useState } from 'react';
import SimpleModal from '../../components/common/modal/SimpleModal';
import FormModal from '../../components/common/modal/FormModal';

function TestPage() {
  // 모달 테스트
  const [simpleModalOpen, setSimpleModalOpen] = useState(false);
  const [inputModalOpen, setInputModalOpen] = useState(false);

  const [formFields, setFormFields] = useState([
    {
      label: 'Email',
      type: 'email',
      value: '',
      onChange: e => handleChange(e, 'email'),
    },
    {
      label: 'Password',
      type: 'password',
      value: '',
      onChange: e => handleChange(e, 'password'),
    },
  ]);

  const handleOpenSimpleModal = () => setSimpleModalOpen(true);
  const handleCloseSimpleModal = () => setSimpleModalOpen(false);

  const handleOpenInputModal = () => setInputModalOpen(true);
  const handleCloseInputModal = () => setInputModalOpen(false);

  const handleChange = (e, fieldName) => {
    setFormFields(fields =>
      fields.map(field =>
        field.label.toLowerCase() === fieldName
          ? { ...field, value: e.target.value }
          : field,
      ),
    );
  };

  const handlePrimaryClick = () => {
    // Primary button action

    handleCloseInputModal();
  };
  const handleSecondaryClick = () => {
    // Secondary button action

    handleCloseInputModal();
  };

  //

  const user = {
    nickname: 'Julie Han',
    introduction: 'testing userprofile now',
    hashtags: ['#tag1', '#tag2', '#tag3'],
  };

  const musicList = [
    {
      id: 1,
      title: 'Dynamite',
      artist: 'BTS',
      albumCover: 'https://example.com/dynamite.jpg',
      duration: '3:19',
    },
    {
      id: 2,
      title: 'Butter',
      artist: 'BTS',
      albumCover: 'https://example.com/butter.jpg',
      duration: '2:44',
    },
    {
      id: 3,
      title: 'Permission to Dance',
      artist: 'BTS',
      albumCover: 'https://example.com/ptd.jpg',
      duration: '4:03',
    },
  ];

  const postList = [
    {
      id: 1,
      title: '여름밤 드라이브 플레이리스트',
      date: '2024년 7월 25일',
      trackCount: 15,
      hashtags: ['#팝', '#여름', '#드라이브'],
      user: {
        name: 'Alice',
        avatar: 'https://example.com/alice.jpg',
      },
      likes: 3256,
    },
    {
      id: 2,
      title: '집중력 향상을 위한 클래식 음악',
      date: '2024년 7월 20일',
      trackCount: 8,
      hashtags: ['#클래식', '#집중', '#공부'],
      user: {
        name: 'Bob',
        avatar: 'https://example.com/bob.jpg',
      },
      likes: 180,
    },
  ];

  return (
    <BaseContainer>
      {/*사용자 프로필*/}
      <Typography
        variant="title"
        sx={{ textAlign: 'left', alignSelf: 'flex-start', ml: 2 }}
      >
        사용자 프로필
      </Typography>
      <Card sx={{ width: '100%' }}>
        <UserProfile {...user} />
      </Card>

      <UserProfile {...user} />

      <Box sx={{ width: '100%' }}>
        {/* 모달(Simple) */}
        <Button onClick={handleOpenSimpleModal}>Open Simple Modal</Button>
        <SimpleModal
          open={simpleModalOpen}
          onClose={handleCloseSimpleModal}
          title="Simple Modal Title"
          description="This is a simple modal description."
          primaryButtonText="Confirm"
          secondaryButtonText="Cancel"
          onPrimaryClick={handlePrimaryClick}
          onSecondaryClick={handleCloseSimpleModal}
        />
        {/* 모달(Input) */}
        <Button onClick={handleOpenInputModal}>Open Input Modal</Button>
        <FormModal
          open={inputModalOpen}
          onClose={handleCloseInputModal}
          title="Input Modal Title"
          description="Please fill in the details below..."
          formFields={formFields}
          primaryButtonText="Submit"
          secondaryButtonText="Cancel"
          onPrimaryClick={handleCloseInputModal}
          onSecondaryClick={handleSecondaryClick}
        />
      </Box>

      {/*트랙 리스트*/}
      <Typography variant="title">Tracklist</Typography>
      <Box sx={{ width: '100%' }}>
        {musicList.map(music => (
          <TrackListItem key={music.id} music={music} />
        ))}
      </Box>

      {/*게시글 리스트*/}
      <Typography variant="title">Posts</Typography>
      <Box sx={{ width: '100%' }}>
        {postList.map(post => (
          <PostListItem key={post.id} post={post} />
        ))}
      </Box>

      {/*게시글 리스트 mini (메인페이지용) */}
      <Typography variant="title">Posts for mainpage</Typography>
      <Grid container spacing={2}>
        {' '}
        {postList.map(post => (
          <Grid item xs={6} key={post.id}>
            {' '}
            {/* 각 아이템이 50% 차지 */}
            <PostListItemMini post={post} />
          </Grid>
        ))}
      </Grid>

      {/*empty box*/}
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
