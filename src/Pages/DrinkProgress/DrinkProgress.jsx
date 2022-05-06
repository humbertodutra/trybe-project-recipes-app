import React, { useContext, useState, useEffect } from 'react';
import propTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import MyContext from '../../context/MyContext';
import styles from './DrinkProgress.module.css';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';

const copy = require('clipboard-copy');

function DrinkProgress({ match }) {
  const { params: { idRecipe } } = match;
  const {
    getApiDetails, details, arrayIngredients,
    favorite, setFavorite,
  } = useContext(MyContext);

  const [showCopyMessage, setShowCopyMessage] = useState(false);

  const initState = () => {
    const recipesInStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));

    if (recipesInStorage === null) {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        meals: {}, cocktails: {},
      }));
    }

    if (arrayIngredients.filterIngredients) {
      const allIngredients = arrayIngredients.filterIngredients.map((elem, i) => (
        arrayIngredients.filterMens[i]
          ? `${elem[1]} ${arrayIngredients.filterMens[i][1]}` : `${elem[1]}`
      ));

      const numberAllIng = allIngredients.length;
      const recipesId = recipesInStorage.cocktails;
      const isThere = Object.keys(recipesId).includes(idRecipe);
      if (isThere) {
        const aux = allIngredients.map((elem) => (
          recipesInStorage.cocktails[idRecipe].includes(elem)
        ));
        return aux;
      }
      return new Array(numberAllIng).fill(false);
    }
  };

  const [checked, setChecked] = useState([]);

  useEffect(() => {
    const requestDetails = async () => {
      await getApiDetails(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idRecipe}`, 'drinks');
    };
    requestDetails();
  }, []);

  useEffect(() => {
    const aux = initState();
    setChecked(aux);
  }, [arrayIngredients]);

  const validIngredients = () => arrayIngredients.filterIngredients.map((elem, i) => (
    arrayIngredients.filterMens[i] ? `${elem[1]} ${arrayIngredients.filterMens[i][1]}` : (
      `${elem[1]}`
    )
  ));

  const handleChange = (index) => {
    console.log(arrayIngredients);
    const allIngredients = validIngredients();
    // const allIngredients = arrayIngredients.filterIngredients.map((elem, i) => (
    //   `${elem[1]} ${arrayIngredients.filterMens[i][1]}`
    // ));
    console.log(allIngredients);
    const newChecked = [...checked];
    newChecked[index] = !checked[index];
    setChecked(newChecked);
    const newIngredients = allIngredients.filter((_elem, i) => newChecked[i]);

    const recipesInStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const { meals, cocktails } = recipesInStorage;
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      ...meals,
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
      .includes(details.drinks[0].idDrink);
  };

  const favoriteRecipe = () => {
    const newFavoriteDrinkRecipes = [
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

  return (
    <div>
      {details.drinks && arrayIngredients.filterIngredients && (
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
              copy(`http://localhost:3000/drinks/${details.drinks[0].idDrink}`);
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

          <p data-testid="recipe-category">{details.drinks[0].strAlcoholic}</p>

          <ul className={ styles.container_drinks }>
            {arrayIngredients.filterIngredients.map((elem, i) => (
              <label
                htmlFor={ `${i}-ingredient-step` }
                key={ elem }
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

            ))}
          </ul>

          <p data-testid="instructions">{details.drinks[0].strInstructions}</p>

          <button
            type="button"
            data-testid="finish-recipe-btn"
            onClick={ (e) => {
              e.preventDefault();
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
