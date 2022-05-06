import React, { useContext } from 'react';
import CardRecipe from '../../Components/DoneRecipes/CardRecipe';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer/Footer';
import styles from './done-recipes.module.css';
import MyContext from '../../context/MyContext';

export default function DoneRecipes(props) {
  const { doneRecipes } = useContext(MyContext);
  // const doneRecipesToMap = (recipe) => setdoneRecipes(recipe);
  // useEffect(() => {
  //   const doneRecipesLocalStorage = JSON.parse(localStorage.getItem('doneRecipes'));
  //   if (doneRecipesLocalStorage && doneRecipesLocalStorage.length !== 0) {
  //     doneRecipesToMap(doneRecipesLocalStorage);
  //   }
  // }, []);
  console.log(doneRecipes);
  return (
    <>
      <Header { ...props } title="Done Recipes" dontShowSearchIcon />
      <form className={ styles.form }>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          className={ styles.button }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          className={ styles.button }
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          className={ styles.button }
        >
          Drinks
        </button>
      </form>
      {
        doneRecipes
        && doneRecipes.map(({ idMeal, strMealThumb, strMeal }, index) => (
          <CardRecipe
            { ...props }
            key={ `${idMeal} ${strMeal}` }
            index={ index }
            image={ strMealThumb }
            nameRecipe={ strMeal }
          />
        ))
      }
      <Footer />
    </>
  );
}
