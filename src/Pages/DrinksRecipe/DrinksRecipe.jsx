import React, { useContext, useEffect, useState } from 'react';
import propTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import MyContext from '../../context/MyContext';
import CardRecommend from '../../Components/CardRecommend/CardRecommend';
import styles from './DrinksRecipe.module.css';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';

const copy = require('clipboard-copy');

function FoodsRecipe({ match }) {
  const { params: { idRecipe } } = match;
  const {
    getApiDetails, details, arrayIngredients, getApiRecomend,
    recommend, setStartedRecepies, favorite, setFavorite,
  } = useContext(MyContext);

  const [showCopyMessage, setShowCopyMessage] = useState(false);

  useEffect(() => {
    const requestDetails = async () => {
      await getApiDetails(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idRecipe}`, 'drinks');
    };
    requestDetails();
    getApiRecomend('https://www.themealdb.com/api/json/v1/1/search.php?s=', 'meals');
  }, [getApiDetails, idRecipe, getApiRecomend]);

  const findStartedRecipeInStorage = () => {
    const recepiesInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (recepiesInProgress !== null) {
      return JSON.parse(localStorage.getItem('inProgressRecipes'));
    }
    return { meals: {}, cocktails: {} };
  };

  const alreadyStarted = () => {
    const { cocktails } = findStartedRecipeInStorage();
    return Object.keys(cocktails).includes(details.drinks[0].idDrink);
  };

  const startRecipe = () => {
    const { filterIngredients } = arrayIngredients;
    const { meals, cocktails } = findStartedRecipeInStorage();
    const newStartedDrinkRecipes = {
      meals,
      cocktails: {
        ...cocktails,
        [details.drinks[0].idDrink]: filterIngredients.map((element) => element[1]),
      },
    };

    localStorage.setItem('inProgressRecipes', JSON.stringify(newStartedDrinkRecipes));
    setStartedRecepies(newStartedDrinkRecipes);
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
      .includes(details.drinks[0].idDrink);
  };

  const favoriteRecipe = () => {
    const newFavoriteFoodRecipes = [
      ...favorite,
      {
        id: details.drinks[0].idDrink,
        type: 'drink',
        nationality: '',
        category: details.drinks[0].strCategory,
        alcoholicOrNot: details.drinks[0].strAlcoholic,
        name: details.drinks[0].strDrink,
        image: details.drinks[0].strDrinkThumb,
      },
    ];
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteFoodRecipes));
    setFavorite(newFavoriteFoodRecipes);
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

  return (
    <div>
      {details.drinks && arrayIngredients.filterIngredients && recommend.length > 0
      && (
        <div className={ styles.container }>
          <img
            src={ details.drinks[0].strDrinkThumb }
            alt={ details.drinks[0].strDrink }
            data-testid="recipe-photo"
          />

          <h1 data-testid="recipe-title">{details.drinks[0].strDrink}</h1>

          <button
            type="button"
            data-testid="share-btn"
            onClick={ () => {
              copy(`http://localhost:3000${history.location.pathname}`);
              setShowCopyMessage(true);
            } }
          >
            {showCopyMessage ? 'Link copied!' : 'Share'}
          </button>

          <div
            role="button"
            onKeyPress={ () => { } }
            tabIndex="0"
            onClick={ () => {
              if (alreadyFavorite()) {
                unfavoriteRecipe();
              } else {
                favoriteRecipe();
              }
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

          <p data-testid="recipe-category">{details.drinks[0].strAlcoholic}</p>

          <ul>
            {arrayIngredients.filterIngredients.map((elem, i) => (
              <li
                key={ elem }
                data-testid={ `${i}-ingredient-name-and-measure` }
              >
                {elem[1]}
                {arrayIngredients.filterMens[i][1]}
              </li>
            ))}
          </ul>

          <p data-testid="instructions">{details.drinks[0].strInstructions}</p>

          <h3>Recommendation Recipes</h3>

          <ul className={ styles.container_carrousel }>
            {recommend.map((elem, index) => (
              <li key={ elem.idMeal } data-testid={ `${index}-recomendation-card` }>
                <CardRecommend
                  index={ index }
                  strMealOrDrink={ elem.strMeal }
                  strMealOrDrinkThumb={ elem.strMealThumb }
                  id={ elem.idMeal }
                  prevPath="foods"
                />
              </li>
            ))}
          </ul>
          <button
            type="button"
            data-testid="start-recipe-btn"
            className={ styles.button_start }
            onClick={ () => {
              startRecipe();
              history.push(`${details.drinks[0].idDrink}/in-progress`);
            } }
          >
            {
              alreadyStarted() ? (
                'Continue Recipe') : ('Start Recipe')
            }
          </button>
        </div>)}
    </div>
  );
}

FoodsRecipe.propTypes = {
  match: propTypes.shape({
    params: propTypes.shape({
      idRecipe: propTypes.number,
    }),
  }),
}.isRequired;

export default FoodsRecipe;
