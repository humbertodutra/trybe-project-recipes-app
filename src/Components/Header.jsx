import React, { useContext, useState } from 'react';
import propTypes from 'prop-types';
import MyContext from '../context/MyContext';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import Search from './Search';

function Header({ title, history }) {
  const { search } = useContext(MyContext);
  const [inputVisible, setInputVisible] = useState(false);

  const handleInputVisible = () => {
    setInputVisible(!inputVisible);
  };

  return (
    <header>
      <button
        type="button"
        data-testid="profile-top-btn"
        src={ profileIcon }
        onClick={ () => {
          console.log(history);
          history.push('/profile');
        } }
      >
        <img src={ profileIcon } alt="profileIcon" />
      </button>
      <h1 data-testid="page-title">{ title }</h1>
      {search && (
        <button
          type="button"
          data-testid="search-top-btn"
          src={ searchIcon }
          onClick={ handleInputVisible }
        >
          <img src={ searchIcon } alt="searchIcon" />
        </button>
      )}
      { inputVisible && <Search /> }
    </header>
  );
}

Header.propTypes = {
  title: propTypes.string,
}.isRequired;

export default Header;
