import React, { useContext, useEffect } from 'react';
import propTypes from 'prop-types';
import MyContext from '../../context/MyContext';
import CardRecommend from '../../Components/CardRecommend/CardRecommend';
import styles from './DrinksRecipes.module.css';

function FoodsRecipe({ match }) {
  const { params: { idRecipe } } = match;
  const {
    getApiDetails, details, arrayIngredients, getApiRecomend, recommend,
  } = useContext(MyContext);

  useEffect(() => {
    const requestDetails = async () => {
      await getApiDetails(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idRecipe}`, 'drinks');
    };
    requestDetails();
    getApiRecomend('https://www.themealdb.com/api/json/v1/1/search.php?s=', 'meals');
  }, [getApiDetails, idRecipe, getApiRecomend]);

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
          <button type="button" data-testid="share-btn">Share</button>
          <button type="button" data-testid="favorite-btn">Favorite</button>
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
          >
            START RECIPES
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
