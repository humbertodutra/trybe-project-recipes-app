import React, { useState, useCallback } from 'react';
import propTypes from 'prop-types';
import MyContext from './MyContext';

function MyProvider({ children }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [inputSearch, setinputSearch] = useState('');
  const [radio, setRadio] = useState('');
  const [search, setSearch] = useState(true);
  const [urlFoods, setUrlFoods] = useState({ ingredient: 'https://www.themealdb.com/api/json/v1/1/filter.php?i=', name: 'https://www.themealdb.com/api/json/v1/1/search.php?s=', firstLetter: 'https://www.themealdb.com/api/json/v1/1/search.php?f=' });
  const [urlDrinks, setUrlDrinks] = useState({ ingredient: 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=', name: 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=', firstLetter: 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=' });
  const [recipes, setRecipes] = useState([]);

  const handleRadio = ({ target }) => {
    setRadio(target.value);
  };

  const handleInputSearch = ({ target }) => {
    setinputSearch(target.value);
  };

  const handleInputEmail = ({ target }) => {
    setEmail(target.value);
  };

  const handleInputPassword = ({ target }) => {
    setPassword(target.value);
  };

  const getApiFood = async (url, type) => {
    const request = await fetch(url);
    const data = await request.json();
    if (data[type] === null) {
      return global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
    setRecipes(data);
    return data;
  };

  const exploreRandom = async (url, type) => {
    const result = await getApiFood(url, type);
    console.log(result);
    return result;
  };

  const selectApi = (objUrl, type) => {
    let url = objUrl;
    switch (radio) {
    case 'ingredient': url = `${objUrl.ingredient}${inputSearch}`;
      break;
    case 'name': url = `${objUrl.name}${inputSearch}`;
      break;
    case 'first-letter':
      if (inputSearch.length === 1) {
        url = `${objUrl.firstLetter}${inputSearch}`;
      } else {
        return global.alert('Your search must have only 1 (one) character');
      }
      break;
    default: {
      console.log('radio not found');
    }
    }
    getApiFood(url, type);
  };

  const searchOn = useCallback(() => {
    setSearch(true);
  }, []);

  const searchOff = useCallback(() => {
    setSearch(false);
  }, []);

  const context = {
    email,
    password,
    handleInputEmail,
    handleInputPassword,
    searchOn,
    search,
    searchOff,
    inputSearch,
    radio,
    handleInputSearch,
    handleRadio,
    selectApi,
    urlFoods,
    setUrlFoods,
    urlDrinks,
    setUrlDrinks,
    recipes,
    exploreRandom,
  };
  return (
    <MyContext.Provider value={ context }>
      {children}
    </MyContext.Provider>
  );
}

MyProvider.propTypes = {
  children: propTypes.objectOf,
}.isRequired;

export default MyProvider;
