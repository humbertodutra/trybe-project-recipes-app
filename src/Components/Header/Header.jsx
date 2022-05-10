import React, { useContext } from 'react';
import propTypes from 'prop-types';
import MyContext from '../../context/MyContext';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';
import Search from '../Search/Search';
import styles from './Header.module.css';

function Header({ title, history, dontShowSearchIcon }) {
  const { showSearch, setShowSearch, setSearched } = useContext(MyContext);

  return (
    <div className={ styles.teste }>
      <header className={ styles.container_profile }>
        <button
          type="button"
          data-testid="profile-top-btn"
          className={ styles.button_icon }
          src={ profileIcon }
          onClick={ () => {
            history.push('/profile');
          } }
        >
          <img src={ profileIcon } alt="profileIcon" />
        </button>

        <h1 data-testid="page-title">{title}</h1>
        {
          !dontShowSearchIcon ? (
            <button
              type="button"
              data-testid="search-top-btn"
              className={ styles.button_icon }
              src={ searchIcon }
              onClick={ () => {
                setSearched(false);
                setShowSearch(!showSearch);
              } }
            >
              <img src={ searchIcon } alt="searchIcon" />
            </button>
          ) : (
            <div />
          )
        }
      </header>
      { showSearch && <Search title={ title } /> }
    </div>
  );
}

Header.propTypes = {
  title: propTypes.string,
}.isRequired;

export default Header;
