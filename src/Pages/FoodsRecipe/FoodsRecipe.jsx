import React, { useContext, useEffect, useState } from 'react';
import propTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import MyContext from '../../context/MyContext';
import CardRecommend from '../../Components/CardRecommend/CardRecommend';
import styles from './FoodsRecipe.module.css';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';

const copy = require('clipboard-copy');

function FoodsRecipe({ match }) {
  const { params: { idRecipe } } = match;
  const {
    getApiDetails, details, arrayIngredients, getApiRecomend,
    recommend, favorite, setFavorite,
  } = useContext(MyContext);

  const [showCopyMessage, setShowCopyMessage] = useState(false);

  useEffect(() => {
    const requestDetails = async () => {
      await getApiDetails(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idRecipe}`, 'meals');
    };
    requestDetails();
    getApiRecomend('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=', 'drinks');
  }, [getApiDetails, getApiRecomend, idRecipe]);

  const youtube = () => {
    if (details.meals) {
      const url = details.meals[0].strYoutube;
      const newUrl = url.split('watch?v=');
      return newUrl[1];
    }
  };

  const findStartedRecipeInStorage = () => {
    const recepiesInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (recepiesInProgress !== null) {
      return JSON.parse(localStorage.getItem('inProgressRecipes'));
    }
    return { meals: { [details.meals[0].idMeal]: [] }, cocktails: { } };
  };

  const alreadyStarted = () => {
    const aux = findStartedRecipeInStorage();
    return Object.keys(aux.meals).includes(details.meals[0].idMeal);
  };

  const startRecipe = () => {
    const recipesInStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));

    if (recipesInStorage === null) {
      return localStorage.setItem('inProgressRecipes', JSON.stringify({
        meals: { [idRecipe]: [] }, cocktails: { },
      }));
    }

    const { meals, cocktails } = recipesInStorage;
    return localStorage.setItem('inProgressRecipes', JSON.stringify({
      meals: {
        ...meals,
        [idRecipe]: [],
      },
      cocktails,
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
      .includes(details.meals[0].idMeal);
  };

  const favoriteRecipe = () => {
    const newFavoriteFoodRecipes = [
      ...favorite,
      {
        id: details.meals[0].idMeal,
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

  const history = useHistory();

  return (
    <div>
      {details.meals && arrayIngredients.filterIngredients && recommend.length > 0
       && (
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
               className={ styles.button_share }
               data-testid="share-btn"
               onClick={ () => {
                 copy(`http://localhost:3000${history.location.pathname}`);
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
                 data-testid={ `${i}-ingredient-name-and-measure` }
               >
                 {elem[1]}
                 {' '}
                 {arrayIngredients.filterMens[i] && arrayIngredients.filterMens[i][1]}
               </li>
             ))}
           </ul>

           <h3 data-testid="instructions">{details.meals[0].strInstructions}</h3>

           <iframe
             src={ `https://www.youtube.com/embed/${youtube()}` }
             title={ details.meals.strMeal }
             className={ styles.video }
             width="425"
             height="350"
             data-testid="video"
           />

           <h2>Recommendation Recipes</h2>

           <ul className={ styles.carousel }>
             {recommend.map((elem, index) => (
               <li
                 key={ elem.idDrink }
                 data-testid={ `${index}-recomendation-card` }
                 className={ styles.carousel_cell }
               >
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
             onClick={ () => {
               startRecipe();
               history.push(`/foods/${details.meals[0].idMeal}/in-progress`);
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
