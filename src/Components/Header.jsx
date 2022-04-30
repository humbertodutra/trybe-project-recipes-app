import React, { useContext } from 'react';
import propTypes from 'prop-types';
import MyContext from '../context/MyContext';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import Search from './Search';

function Header({ title, history, dontShowSearchIcon }) {
  const { showSearch, setShowSearch, setSearched } = useContext(MyContext);

  return (
    <main>
      <header>
        <button
          type="button"
          data-testid="profile-top-btn"
          src={ profileIcon }
          onClick={ () => {
            history.push('/profile');
          } }
        >
          <img src={ profileIcon } alt="profileIcon" />
        </button>
        <h1 data-testid="page-title">{title}</h1>
        {
          !dontShowSearchIcon && (
            <button
              type="button"
              data-testid="search-top-btn"
              src={ searchIcon }
              onClick={ () => {
                setSearched(false);
                setShowSearch(!showSearch);
              } }
            >
              <img src={ searchIcon } alt="searchIcon" />
            </button>
          )
        }
      </header>
      { showSearch && <Search title={ title } /> }
    </main>
  );
}

Header.propTypes = {
  title: propTypes.string,
}.isRequired;

export default Header;
