import { Box, Button, Card, Grid, Typography } from '@mui/material';
import BaseContainer from '../../components/layout/BaseContainer';
import UserProfile from '../../components/common/UserProfile';
import TrackListItem from '../../components/common/TrackListItem';
import PostListItem from '../../components/common/PostListItem';
import PostListItemMini from '../../components/common/PostListItemMini';
import { useState } from 'react';
import SimpleModal from '../../components/common/modal/SimpleModal';
import FormModal from '../../components/common/modal/FormModal';
import DropdownModal from '../../components/common/modal/DropdownModal';

function TestPage() {
  // 모달 테스트
  const [simpleModalOpen, setSimpleModalOpen] = useState(false);
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [dropdownModalOpen, setDropdownModalOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');

  const handleOpenSimpleModal = () => setSimpleModalOpen(true);
  const handleCloseSimpleModal = () => setSimpleModalOpen(false);

  const handleOpenFormModal = () => setFormModalOpen(true);
  const handleCloseFormModal = () => setFormModalOpen(false);

  const handleOpenDropdownModal = () => setDropdownModalOpen(true);
  const handleCloseDropdownModal = () => setDropdownModalOpen(false);

  const handleChange = (e, fieldName) => {
    setFormFields(fields =>
      fields.map(field =>
        field.label.toLowerCase() === fieldName
          ? { ...field, value: e.target.value }
          : field,
      ),
    );
  };

  const handleDropdownChange = event => {
    setSelectedValue(event.target.value);
  };

  const handlePrimaryClick = () => {
    // Primary button action
  };
  const handleSecondaryClick = () => {
    // Secondary button action
  };

  const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
  ];

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
        <Button
          onClick={handleOpenSimpleModal}
          variant="contained"
          sx={{ mr: 1 }}
        >
          Open Simple Modal
        </Button>
        <SimpleModal
          open={simpleModalOpen}
          onClose={handleCloseSimpleModal}
          title="Simple Modal Title"
          description="This is a simple modal description."
          primaryButtonText="Confirm"
          secondaryButtonText="Cancel"
          onPrimaryClick={handleCloseSimpleModal}
          onSecondaryClick={handleCloseSimpleModal}
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
          formFields={formFields}
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
          options={options}
          selectedValue={selectedValue}
          onChange={handleChange}
          primaryButtonText="Confirm"
          secondaryButtonText="Cancel"
          onPrimaryClick={handleCloseDropdownModal}
          onSecondaryClick={handleCloseDropdownModal}
        ></DropdownModal>
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
