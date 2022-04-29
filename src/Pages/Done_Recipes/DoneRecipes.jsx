import React, { useContext, useEffect } from 'react';
import CardRecipe from '../../Components/DoneRecipes/CardRecipe';
import Header from '../../Components/Header';
import MyContext from '../../context/MyContext';

export default function DoneRecipes(props) {
  const { searchOff } = useContext(MyContext);
  useEffect(() => {
    searchOff();
  }, [searchOff]);

  return (
    <div>
      <Header { ...props } title="Done Recipes" />
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
