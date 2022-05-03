import React from 'react';

export default function CardIngredient() {
  return (
    <div data-testid={ `${index}-ingredient-card` }>
      <img src="" alt="" data-testid={ `${index}-card-img` } />
      <h2 data-testid={ `${index}-card-name` }>nome do ingrediente</h2>
    </div>
  );
}
