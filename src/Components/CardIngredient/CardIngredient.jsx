import React, { useContext } from 'react';
import propTypes from 'prop-types';
import MyContext from '../../context/MyContext';
import { fetchRecipesByIngredients } from '../../service/getIngredients';

export default function CardIngredient({ strIngredient, idIngredient, history }) {
  const { setRecipesByIng } = useContext(MyContext);

  return (
    <div>
      <button
        type="button"
        onClick={ async () => {
          const result = await fetchRecipesByIngredients(strIngredient);
          setRecipesByIng(result);
          history.push('/foods');
        } }
        data-testid={ `${idIngredient}-ingredient-card` }
      >
        <img
          src={ `https://www.themealdb.com/images/ingredients/${strIngredient}-Small.png` }
          alt=""
          data-testid={ `${idIngredient}-card-img` }
        />
        <h2 data-testid={ `${idIngredient}-card-name` }>{strIngredient}</h2>
      </button>
    </div>
  );
}

CardIngredient.propTypes = {
  strIngredient: propTypes.string,
  idIngredient: propTypes.string,
}.isRequired;
