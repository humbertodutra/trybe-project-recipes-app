import React, { useContext, useEffect } from 'react';
import uniqid from 'uniqid';
import CardRecipe from '../../Components/CardRecipe/CardRecipe';
import Header from '../../Components/Header/Header';
import styles from './done-recipes.module.css';
import MyContext from '../../context/MyContext';

export default function DoneRecipes(props) {
  const { doneRecipes, setdoneRecipes } = useContext(MyContext);

  const doneRecipesToMap = (recipe) => setdoneRecipes(recipe);
  useEffect(() => {
    const doneRecipesLocalStorage = JSON.parse(localStorage.getItem('doneRecipes'));
    if (doneRecipesLocalStorage && doneRecipesLocalStorage.length !== 0) {
      doneRecipesToMap(doneRecipesLocalStorage);
    }
  }, []);
  const filterRecipes = (recipeType) => {
    const doneRecipesLocalStorage = JSON.parse(localStorage.getItem('doneRecipes'));
    if (recipeType === 'food') {
      const foodsFiltered = doneRecipesLocalStorage.filter(({ type }) => type === 'food');
      setdoneRecipes(foodsFiltered);
    } else {
      const drinksFiltered = doneRecipesLocalStorage.filter(
        ({ type }) => type === 'drink',
      );
      setdoneRecipes(drinksFiltered);
    }
  };

  return (
    <>
      <Header { ...props } title="Done Recipes" dontShowSearchIcon />
      <form className={ styles.form }>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          className={ styles.button }
          onClick={ () => {
            const doneRecipesLocalStorage = JSON
              .parse(localStorage.getItem('doneRecipes'));
            setdoneRecipes(doneRecipesLocalStorage);
          } }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          className={ styles.button }
          onClick={ () => filterRecipes('food') }
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          className={ styles.button }
          onClick={ () => filterRecipes('drink') }
        >
          Drinks
        </button>
      </form>
      <main className={ styles.mainContent }>
        {
          doneRecipes
        && doneRecipes.map((
          { id,
            image, name, doneDate, tags, type, alcoholicOrNot, nationality, category },
          index,
        ) => (
          <CardRecipe
            { ...props }
            key={ uniqid() }
            index={ index }
            image={ image }
            name={ name }
            doneDate={ doneDate }
            tagName={ tags }
            type={ type }
            alcoholicOrNot={ alcoholicOrNot }
            nationality={ nationality }
            category={ category }
            id={ id }
          />
        ))
        }
      </main>
    </>
  );
}
