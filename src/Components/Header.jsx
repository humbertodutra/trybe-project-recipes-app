import React, { useContext } from 'react';
import propTypes from 'prop-types';
import MyContext from '../context/MyContext';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({ title, history }) {
  const { search } = useContext(MyContext);

  return (
    <header>
      <button 
        type="button"
        data-testid="profile-top-btn"
        src={ profileIcon }
        onClick={() =>{
          history.push('/profile');
        }}
      >
        <img src={ profileIcon } alt="profileIcon" />
      </button>
      <h1 data-testid="page-title">{ title }</h1>
      {search && (
        <button
        type="button"
        data-testid="search-top-btn"
        src={ searchIcon }>
          <img src={ searchIcon } alt="searchIcon" />
        </button>
      )}
    </header>
  );
}

Header.propTypes = {
  title: propTypes.string,
}.isRequired;

export default Header;
