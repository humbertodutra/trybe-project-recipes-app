import React, { useContext, useEffect, useState } from 'react';
import propTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import MyContext from '../../context/MyContext';
import CardRecommend from '../../Components/CardRecommend/CardRecommend';
import styles from './DrinksRecipe.module.css';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';

const copy = require('clipboard-copy');

function DrinksRecipe({ match }) {
  const { params: { idRecipe } } = match;
  const {
    getApiDetails, details, arrayIngredients, getApiRecomend,
    recommend, favorite, setFavorite,
  } = useContext(MyContext);

  const [showCopyMessage, setShowCopyMessage] = useState(false);

  const validIngredients = () => arrayIngredients.filterIngredients.map((elem, i) => (
    arrayIngredients.filterMens[i] ? `${elem[1]} ${arrayIngredients.filterMens[i][1]}` : (
      `${elem[1]}`
    )
  ));

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
    return { cocktails: { [details.drinks[0].idDrinks]: [] }, meals: { } };
  };

  const alreadyStarted = () => {
    const aux = findStartedRecipeInStorage();
    return Object.keys(aux.cocktails).includes(details.drinks[0].idDrink);
  };

  const startRecipe = () => {
    const recipesInStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));

    if (recipesInStorage === null) {
      return localStorage.setItem('inProgressRecipes', JSON.stringify({
        meals: {}, cocktails: { [idRecipe]: [] },
      }));
    }

    const { meals, cocktails } = recipesInStorage;
    return localStorage.setItem('inProgressRecipes', JSON.stringify({
      cocktails: {
        ...cocktails,
        [idRecipe]: [],
      },
      meals,
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
                copy(`http://localhost:3000${history.location.pathname}`);
                setShowCopyMessage(true);
              } }
            >
              {showCopyMessage ? 'Link copied!' : 'Share'}
            </button>
          </div>

          <h2 data-testid="recipe-category">{details.drinks[0].strAlcoholic}</h2>

          <ul className={ styles.container_drinks }>
            {validIngredients().map((elem, i) => (
              <li
                key={ elem }
                data-testid={ `${i}-ingredient-name-and-measure` }
              >
                {elem}
              </li>
            ))}
          </ul>

          <h3 data-testid="instructions">{details.drinks[0].strInstructions}</h3>

          <h2>Recommendation Recipes</h2>

          <ul className={ styles.carousel }>
            {recommend.map((elem, index) => (
              <li
                key={ elem.idMeal }
                data-testid={ `${index}-recomendation-card` }
                className={ styles.carousel_cell }
              >
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
              history.push(`/drinks/${details.drinks[0].idDrink}/in-progress`);
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

DrinksRecipe.propTypes = {
  match: propTypes.shape({
    params: propTypes.shape({
      idRecipe: propTypes.number,
    }),
  }),
}.isRequired;

export default DrinksRecipe;
