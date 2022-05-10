import React, { useContext } from 'react';
import propTypes from 'prop-types';
import MyContext from '../../context/MyContext';
import styles from './Search.module.css';

function Search({ title }) {
  const {
    handleRadio, handleInputSearch, inputSearch, selectApi, urlFoods,
    urlDrinks, showSearch, setShowSearch, getCategories,
    setSearched,
  } = useContext(MyContext);

  const tagConvert = { Foods: 'meals', Drinks: 'drinks' };

  return (
    <form className={ styles.search_bar }>
      <input
        className={ styles.search_input }
        data-testid="search-input"
        type="text"
        placeholder="Search"
        value={ inputSearch }
        onChange={ handleInputSearch }
      />
      <div className={ styles.checkbox_container }>
        <label htmlFor="ingredient">
          <input
            className={ styles.items }
            type="radio"
            value="ingredient"
            name="search"
            data-testid="ingredient-search-radio"
            id="ingredient"
            onChange={ handleRadio }
          />
          Ingredients
        </label>
        <label htmlFor="name">
          <input
            className={ styles.items }
            type="radio"
            data-testid="name-search-radio"
            value="name"
            name="search"
            id="name"
            onChange={ handleRadio }
          />
          Name
        </label>
        <label htmlFor="firstLetter">
          <span
            className={ styles.items }
          >
            <input
              type="radio"
              data-testid="first-letter-search-radio"
              name="search"
              value="first-letter"
              id="firstLetter"
              onChange={ handleRadio }
            />
            First Letter
          </span>

        </label>
      </div>

      <button
        type="button"
        data-testid="exec-search-btn"
        className={ styles.search_button }
        onClick={ () => {
          if (title === 'Foods') {
            selectApi(urlFoods, 'meals');
          }
          if (title === 'Drinks') {
            selectApi(urlDrinks, 'drinks');
          }
          getCategories(tagConvert[title]);
          setShowSearch(!showSearch);
          setSearched(true);
        } }
      >
        Search

      </button>
    </form>
  );
}

Search.propTypes = {
  title: propTypes.string,
}.isRequired;

export default Search;
