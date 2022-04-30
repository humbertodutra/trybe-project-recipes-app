import React from 'react';
import propTypes from 'prop-types';

function DrinksRecipe({ match }) {
  const { params: { idRecipe } } = match;
  return (
    <div>
      {idRecipe}
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
