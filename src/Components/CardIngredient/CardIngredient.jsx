import React, { useContext, useEffect } from 'react';
import propTypes from 'prop-types';
import MyContext from '../../context/MyContext';

export default function CardIngredient({ strIngredient, idIngredient: index }) {
  const { fetchPhotoIngredient } = useContext(MyContext);
  useEffect(() => {
    fetchPhotoIngredient(strIngredient);

  }, []);

  return (
    <div data-testid={ `${index}-ingredient-card` }>
      <img
        src={  }
        alt=""
        data-testid={ `${index}-card-img` }
      />
      <h2 data-testid={ `${index}-card-name` }>{strIngredient}</h2>
    </div>
  );
}

CardIngredient.propTypes = {
  strIngredient: propTypes.string,
  idIngredient: propTypes.string,
}.isRequired;
