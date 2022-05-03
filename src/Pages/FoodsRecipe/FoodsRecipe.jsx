import React, { useContext, useEffect } from 'react';
import propTypes from 'prop-types';
import MyContext from '../../context/MyContext';
import CardRecommend from '../../Components/CardRecommend/CardRecommend';
import styles from './FoodsRecipe.module.css';

function FoodsRecipe({ match }) {
  const { params: { idRecipe } } = match;
  const {
    getApiDetails, details, arrayIngredients, getApiRecomend,
    recommend,
  } = useContext(MyContext);

  useEffect(() => {
    const requestDetails = async () => {
      await getApiDetails(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idRecipe}`, 'meals');
    };
    requestDetails();
    getApiRecomend('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=', 'drinks');
  }, [getApiDetails, idRecipe, getApiRecomend]);

  const youtube = () => {
    if (details.meals) {
      const url = details.meals[0].strYoutube;
      const newUrl = url.split('watch?v=');
      return newUrl[1];
    }
  };

  return (
    <div>
      {details.meals && arrayIngredients.filterIngredients && recommend.length > 0
      && (
        <div className={ styles.container }>
          <img
            src={ details.meals[0].strMealThumb }
            alt={ details.meals[0].strMeal }
            data-testid="recipe-photo"
          />
          <h1 data-testid="recipe-title">{details.meals[0].strMeal}</h1>
          <button type="button" data-testid="share-btn">Share</button>
          <button type="button" data-testid="favorite-btn">Favorite</button>
          <p data-testid="recipe-category">{details.meals[0].strCategory}</p>
          <ul className={ styles.container_foods }>
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
          <p data-testid="instructions">{details.meals[0].strInstructions}</p>

          <iframe
            src={ `https://www.youtube.com/embed/${youtube()}` }
            title={ details.meals.strMeal }
            width="425"
            height="350"
            data-testid="video"
          />
          <h3>Recommendation Recipes</h3>
          <ul className={ styles.container_carrousel }>
            {recommend.map((elem, index) => (
              <li key={ elem.idDrink } data-testid={ `${index}-recomendation-card` }>
                <CardRecommend
                  index={ index }
                  strMealOrDrink={ elem.strDrink }
                  strMealOrDrinkThumb={ elem.strDrinkThumb }
                  id={ elem.idDrink }
                  prevPath="drinks"
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
