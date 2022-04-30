import React from 'react';
import propTypes from 'prop-types';

function FoodsRecipe({ match }) {
  const { params: { idRecipe } } = match;
  return (
    <div>
      {idRecipe}
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
