import React, { useContext } from 'react';
import propTypes from 'prop-types';
import MyContext from '../../context/MyContext';
import { fetchDrinksRecipes } from '../../service/getIngredients';

export default function CardDrinkIngredient({ strIngredient, idIngredient, history }) {
  const { setRecipesByIng } = useContext(MyContext);
  return (
    <div>
      <button
        type="button"
        data-testid={ `${idIngredient}-ingredient-card` }
        onClick={ async () => {
          const result = await fetchDrinksRecipes(strIngredient);
          setRecipesByIng(result);
          history.push('/drinks');
        } }
      >
        <img
          src={ `https://www.thecocktaildb.com/images/ingredients/${strIngredient}-Small.png` }
          alt=""
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
