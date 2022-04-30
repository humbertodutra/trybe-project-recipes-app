import React from 'react';
import CardRecipe from '../../Components/DoneRecipes/CardRecipe';
import Header from '../../Components/Header';

export default function DoneRecipes(props) {
  return (
    <div>
      <Header { ...props } title="Done Recipes" dontShowSearchIcon />
      <form>
        <button
          type="button"
          data-testid="filter-by-all-btn"
        >
          All
        </button>
        <button type="button" data-testid="filter-by-food-btn">Food</button>
        <button type="button" data-testid="filter-by-drink-btn">Drinks</button>
      </form>
      <CardRecipe />
    </div>
  );
}
