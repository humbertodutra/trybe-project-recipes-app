import React, { useContext } from 'react';
import MyContext from '../context/MyContext';

function Search() {
  const { handleRadio, handleInputSearch, inputSearch } = useContext(MyContext);
  return (
    <form>
      <input
        data-testid="search-input"
        type="text"
        placeholder="search"
        value={ inputSearch }
        onChange={ handleInputSearch }
      />
      <label htmlFor="ingredient">
        <input
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
        <input
          type="radio"
          data-testid="first-letter-search-radio"
          name="search"
          value="first-letter"
          id="firstLetter"
          onChange={ handleRadio }
        />
        First Letter
      </label>
      <button type="button" data-testid="exec-search-btn">Search</button>
    </form>
  );
}

export default Search;
