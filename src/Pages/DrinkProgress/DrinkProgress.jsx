import React, { useContext, useState, useEffect } from 'react';
import propTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import MyContext from '../../context/MyContext';
import styles from './DrinkProgress.module.css';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import initState from '../../helpers/functions';

const copy = require('clipboard-copy');

function DrinkProgress({ match }) {
  const { params: { idRecipe } } = match;
  const {
    getApiDetails, details, arrayIngredients,
    favorite, setFavorite, doneRecipes,
  } = useContext(MyContext);

  const [showCopyMessage, setShowCopyMessage] = useState(false);

  const [checked, setChecked] = useState([]);

  useEffect(() => {
    const requestDetails = async () => {
      await getApiDetails(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idRecipe}`, 'drinks');
    };
    requestDetails();
  }, []);

  useEffect(() => {
    const aux = initState(arrayIngredients, idRecipe, 'cocktails');
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
      meals,
      cocktails: {
        ...cocktails,
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
    const newFavoriteDrinkRecipes = [
      ...favorite,
      {
        id: idRecipe,
        type: 'drink',
        nationality: '',
        category: details.drinks[0].strCategory,
        alcoholicOrNot: details.drinks[0].strAlcoholic,
        name: details.drinks[0].strDrink,
        image: details.drinks[0].strDrinkThumb,
      },
    ];
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteDrinkRecipes));
    setFavorite(newFavoriteDrinkRecipes);
  };

  const unfavoriteRecipe = () => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const newFavorites = favoriteRecipes.filter((element) => (
      element.id !== details.drinks[0].idDrink
    ));
    setFavorite(newFavorites);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
  };

  const history = useHistory();

  const tagsCustomize = (stringTag) => {
    if (stringTag.includes(',')) {
      return stringTag.split(',');
    } if (stringTag.includes(' ')) {
      return stringTag.split(' ');
    }
    return [];
  };

  const saveRecipe = () => {
    const { drinks } = details;
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    const recipeToLocalStorage = {
      id: drinks[0].idDrink,
      type: 'drink',
      nationality: '',
      category: drinks[0].strCategory,
      alcoholicOrNot: drinks[0].strAlcoholic,
      name: drinks[0].strDrink,
      image: drinks[0].strDrinkThumb,
      doneDate: today.toLocaleDateString(),
      tags: () => tagsCustomize(drinks[0].strTags),
    };
    console.log(recipeToLocalStorage);
    const arrRecipes = [...doneRecipes, recipeToLocalStorage];
    localStorage.setItem('doneRecipes', JSON.stringify(arrRecipes));
  };
  return (
    <div>
      {details.drinks && arrayIngredients.filterIngredients
      && checked && checked.length > 0 && (
        <div className={ styles.container }>
          <img
            src={ details.drinks[0].strDrinkThumb }
            alt={ details.drinks[0].strDrink }
            data-testid="recipe-photo"
            className={ styles.images }
          />

          <div className={ styles.title_container }>

            <h1
              className={ styles.title }
              data-testid="recipe-title"
            >
              {details.drinks[0].strDrink}
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
                copy(`http://localhost:3000/drinks/${details.drinks[0].idDrink}`);
                setShowCopyMessage(true);
              } }
            >
              {showCopyMessage ? 'Link copied!' : 'Share'}
            </button>
          </div>

          <h2 data-testid="recipe-category">{details.drinks[0].strAlcoholic}</h2>

          <ul className={ styles.container_drinks }>
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

          <h3 data-testid="instructions">{details.drinks[0].strInstructions}</h3>

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

DrinkProgress.propTypes = {
  match: propTypes.shape({
    params: propTypes.shape({
      idRecipe: propTypes.number,
    }),
  }),
}.isRequired;

export default DrinkProgress;
