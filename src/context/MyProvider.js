import React, { useCallback, useState } from 'react';
import propTypes from 'prop-types';
import MyContext from './MyContext';

function MyProvider({ children }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [inputSearch, setinputSearch] = useState('');
  const [radio, setRadio] = useState('');
  const [urlFoods, setUrlFoods] = useState({ ingredient: 'https://www.themealdb.com/api/json/v1/1/filter.php?i=', name: 'https://www.themealdb.com/api/json/v1/1/search.php?s=', firstLetter: 'https://www.themealdb.com/api/json/v1/1/search.php?f=' });
  const [urlDrinks, setUrlDrinks] = useState({ ingredient: 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=', name: 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=', firstLetter: 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=' });
  const [recipes, setRecipes] = useState({ meals: [], drinks: [] });
  const [originalRecipes, setOriginalRecipes] = useState({ meals: [], drinks: [] });
  const [showSearch, setShowSearch] = useState(false);
  const [searched, setSearched] = useState(false);
  const [categories, setCategories] = useState([]);
  const [details, setDetails] = useState({});
  const [arrayIngredients, setArrayIngredients] = useState({});
  const [recommend, setRecommend] = useState({});

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

  const getAllRecipes = async (type) => {
    const url = (type === 'meals' ? (
      'https://www.themealdb.com/api/json/v1/1/search.php?s='
    ) : (
      'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
    ));
    const request = await fetch(url);
    const data = await request.json();
    setOriginalRecipes(data);
    setRecipes(data);
    return data;
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

  const getApiDetails = useCallback(async (url, type) => {
    const request = await fetch(url);
    const data = await request.json();
    setDetails(data);
    const array = Object.entries(data[type][0]);
    const filterIngredients = array.filter(
      (elem) => elem[0].includes('strIngredient')
      && elem[1] !== '',
    );
    console.log(filterIngredients);
    const filterMens = array
      .filter((elem) => elem[0].includes('strMeasure') && elem[1] !== '');
    setArrayIngredients({ filterIngredients, filterMens });
  }, []);

  const getCategories = async (type) => {
    const url = (type === 'meals' ? (
      'https://www.themealdb.com/api/json/v1/1/list.php?c=list'
    ) : (
      'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list'
    ));
    const request = await fetch(url);
    const data = await request.json();
    setCategories(data);
    return data;
  };

  const getRecipesByCategory = async (categoryName, type) => {
    const rootUrl = (type === 'meals' ? (
      'https://www.themealdb.com/api/json/v1/1/filter.php?c='
    ) : (
      'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c='
    ));
    const endpoint = `${rootUrl}${categoryName}`;
    const request = await fetch(endpoint);
    const data = await request.json();
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
    return getApiFood(url, type);
  };

  const getApiRecomend = useCallback(async (url, type) => {
    const result = await fetch(url);
    const data = await result.json();
    const sixLength = 6;
    const six = data[type].filter((_elem, i) => i < sixLength);
    console.log(six);
    setRecommend(six);
    return data;
  }, []);

  const context = {
    email,
    password,
    handleInputEmail,
    handleInputPassword,
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
    showSearch,
    setShowSearch,
    categories,
    setCategories,
    getCategories,
    setRecipes,
    getRecipesByCategory,
    getAllRecipes,
    searched,
    setSearched,
    exploreRandom,
    getApiDetails,
    details,
    arrayIngredients,
    getApiRecomend,
    recommend,
    originalRecipes,
    setOriginalRecipes,
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
