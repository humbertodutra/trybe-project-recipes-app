import React, { useContext } from 'react';
import propTypes from 'prop-types';
import MyContext from '../../context/MyContext';
import { fetchDrinksRecipes } from '../../service/getIngredients';
import styles from './card-drink-ingredient.module.css';

export default function CardDrinkIngredient({ strIngredient, idIngredient, history }) {
  const { setRecipesByIng } = useContext(MyContext);
  return (
    <div>
      <button
        className={ styles.card_btn }
        type="button"
        data-testid={ `${idIngredient}-ingredient-card` }
        onClick={ async () => {
          const result = await fetchDrinksRecipes(strIngredient);
          setRecipesByIng(result);
          history.push('/drinks');
        } }
      >
        <img
          className={ styles.ingredient_img }
          src={ `https://www.thecocktaildb.com/images/ingredients/${strIngredient}-Small.png` }
          alt={ `${strIngredient}` }
          data-testid={ `${idIngredient}-card-img` }
        />
        <h2 data-testid={ `${idIngredient}-card-name` }>{strIngredient}</h2>
      </button>
    </div>
  );
}

CardDrinkIngredient.propTypes = {
  strIngredient: propTypes.string,
  idIngredient: propTypes.string,
}.isRequired;
