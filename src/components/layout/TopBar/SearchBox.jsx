import React, { useState } from 'react';
import { InputBase, styled } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  width: 'auto',
  borderRadius: 4,
  backgroundColor: 'rgba(255, 255, 255, 0.2)',
  marginLeft: theme.spacing(1),
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 1),
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  paddingLeft: 10,
  // 실제 입력 필드
  '& .MuiInputBase-input': {
    paddingRight: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '12ch', // 기본 문자 너비 12개
    '&:focus': {
      width: '20ch', // 포커스 문자 너비 20개
    },
    '&::placeholder': {
      fontSize: '0.875rem',
    },
  },
}));

const SearchBox = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleKeyPress = event => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Search>
      <StyledInputBase
        placeholder="Search..."
        inputProps={{ 'aria-label': 'search' }}
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <SearchIconWrapper onClick={handleSearch}>
        <SearchIcon />
      </SearchIconWrapper>
    </Search>
  );
};

export default SearchBox;
