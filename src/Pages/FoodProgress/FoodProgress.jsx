import React, { useContext, useState, useEffect } from 'react';
import propTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import MyContext from '../../context/MyContext';
import styles from './FoodProgress.module.css';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import initState from '../../helpers/functions';

const copy = require('clipboard-copy');

function FoodProgress({ match }) {
  const { params: { idRecipe } } = match;
  const {
    getApiDetails, details, arrayIngredients,
    favorite, setFavorite, doneRecipes,
  } = useContext(MyContext);

  const [showCopyMessage, setShowCopyMessage] = useState(false);

  const [checked, setChecked] = useState([]);

  useEffect(() => {
    const requestDetails = async () => {
      await getApiDetails(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idRecipe}`, 'meals');
    };
    requestDetails();
  }, []);

  useEffect(() => {
    const aux = initState(arrayIngredients, idRecipe, 'meals');
    setChecked(aux);
  }, [arrayIngredients]);

  const handleChange = (index) => {
    const allIngredients = arrayIngredients.filterIngredients.map((elem, i) => (
      arrayIngredients.filterMens[i]
        ? `${elem[1]} ${arrayIngredients.filterMens[i][1]}` : (
          `${elem[1]}`
        )
    ));
    const newChecked = [...checked];
    newChecked[index] = !checked[index];
    setChecked(newChecked);
    const newIngredients = allIngredients.filter((_elem, i) => newChecked[i]);
    const recipesInStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const { meals, cocktails } = recipesInStorage;
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      cocktails,
      meals: {
        ...meals,
        [idRecipe]: newIngredients,
      },
    }));
  };

  const findFavoriteRecipeInStorage = () => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favoriteRecipes !== null) {
      return JSON.parse(localStorage.getItem('favoriteRecipes'));
    }
    return [];
  };

  const alreadyFavorite = () => {
    const favoriteRecipes = findFavoriteRecipeInStorage();
    return favoriteRecipes.map(({ id }) => id)
      .includes(idRecipe);
  };

  const favoriteRecipe = () => {
    const newFavoriteFoodRecipes = [
      ...favorite,
      {
        id: idRecipe,
        type: 'food',
        nationality: details.meals[0].strArea,
        category: details.meals[0].strCategory,
        alcoholicOrNot: '',
        name: details.meals[0].strMeal,
        image: details.meals[0].strMealThumb,
      },
    ];
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteFoodRecipes));
    setFavorite(newFavoriteFoodRecipes);
  };

  const unfavoriteRecipe = () => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const newFavorites = favoriteRecipes.filter((element) => (
      element.id !== details.meals[0].idMeal
    ));
    setFavorite(newFavorites);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
  };

  const saveRecipe = () => {
    const { meals } = details;
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    const recipeToLocalStorage = {
      id: meals[0].idMeal,
      type: 'food',
      nationality: meals[0].strArea,
      category: meals[0].strCategory,
      alcoholicOrNot: '',
      name: meals[0].strMeal,
      image: meals[0].strMealThumb,
      doneDate: today.toLocaleDateString(),
      tags: meals[0].strTags.split(' '),
    };
    console.log(recipeToLocalStorage);
    const arrRecipes = [...doneRecipes, recipeToLocalStorage];
    localStorage.setItem('doneRecipes', JSON.stringify(arrRecipes));
  };

  const history = useHistory();

  return (
    <div>
      {(details.meals && arrayIngredients.filterIngredients
      && checked && checked.length > 0) && (
        <div className={ styles.container }>
          <img
            src={ details.meals[0].strMealThumb }
            alt={ details.meals[0].strMeal }
            data-testid="recipe-photo"
            className={ styles.images }
          />

          <div className={ styles.title_container }>

            <h1
              className={ styles.title }
              data-testid="recipe-title"
            >
              {details.meals[0].strMeal}
            </h1>

            <div
              role="button"
              onKeyPress={ () => { } }
              tabIndex="0"
              onClick={ () => {
                if (alreadyFavorite()) {
                  return unfavoriteRecipe();
                }
                return favoriteRecipe();
              } }
            >
              {alreadyFavorite() ? (
                <img
                  data-testid="favorite-btn"
                  alt="Black heart"
                  src={ blackHeartIcon }
                />
              ) : (
                <img
                  data-testid="favorite-btn"
                  alt="White heart"
                  src={ whiteHeartIcon }
                />
              )}
            </div>

            <button
              type="button"
              data-testid="share-btn"
              className={ styles.button_share }
              onClick={ () => {
                copy(`http://localhost:3000/foods/${details.meals[0].idMeal}`);
                setShowCopyMessage(true);
              } }
            >
              {showCopyMessage ? 'Link copied!' : 'Share'}
            </button>

          </div>

          <h2 data-testid="recipe-category">{details.meals[0].strCategory}</h2>

          <ul className={ styles.container_foods }>
            {arrayIngredients.filterIngredients.map((elem, i) => (
              <li
                key={ elem }
              >
                <label
                  htmlFor={ `${i}-ingredient-step` }
                  data-testid={ `${i}-ingredient-step` }
                >
                  <input
                    type="checkbox"
                    id={ `${i}-ingredient-step` }
                    checked={ checked[i] }
                    onChange={ () => {
                      handleChange(i);
                    } }
                  />
                  <span>
                    {elem[1]}
                    {' '}
                    {arrayIngredients.filterMens[i] && arrayIngredients.filterMens[i][1]}
                  </span>
                </label>
              </li>

            ))}
          </ul>

          <h3 data-testid="instructions">{details.meals[0].strInstructions}</h3>

          <button
            type="button"
            data-testid="finish-recipe-btn"
            className={ styles.button_finish }
            onClick={ (e) => {
              e.preventDefault();
              saveRecipe();
              history.push('/done-recipes');
            } }
            disabled={ checked.some((elem) => !elem) }
          >
            Finish Recipe
          </button>
        </div>
      )}
    </div>
  );
}

FoodProgress.propTypes = {
  match: propTypes.shape({
    params: propTypes.shape({
      idRecipe: propTypes.number,
    }),
  }),
}.isRequired;

export default FoodProgress;
