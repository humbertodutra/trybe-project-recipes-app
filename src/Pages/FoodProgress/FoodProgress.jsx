import React from 'react';
import propTypes from 'prop-types';

function FoodProgress({ match }) {
  const { params: { idRecipe } } = match;
  return (
    <div>
      Receita ID
      {' '}
      {`${idRecipe}`}
      {' '}
      em Progresso
    </div>
  );
}

FoodProgress.propTypes = {
  match: propTypes.shape({
    params: propTypes.shape({
      idRecipe: propTypes.number,
    }),
  }),
}.isRequired;

export default FoodProgress;
