import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import CardRecipes from '../../Components/CardRecipes/CardRecipes';
import Header from '../../Components/Header/Header';
import MyContext from '../../context/MyContext';
import Footer from '../../Components/Footer/Footer';
import CardCategories from '../../Components/CardCategories/CardCategories';
import styles from './Foods.module.css';

export default function Foods(props) {
  const { recipes, categories, getAllRecipes, showSearch,
    getCategories, searched, recipesByIng } = useContext(MyContext);
  const lengthFood = 12;
  const lengthCategories = 5;

  useEffect(() => {
    getAllRecipes('meals');
    getCategories('meals');
  }, []);

  const [selectedCategory, setSelectedCategory] = useState('All');

  return (
    <main>
      <Header { ...props } title="Foods" />

      <div className={ styles.categories_container }>
        {(categories.meals && !showSearch) && (
          <CardCategories
            categoryName="All"
            title="Foods"
            selectedCategory={ selectedCategory }
            setSelectedCategory={ setSelectedCategory }
          />
        )}

        {categories.meals && categories.meals.map((elem, index) => (
          (index < lengthCategories && !showSearch) && (
            <CardCategories
              categoryName={ elem.strCategory }
              key={ elem.strCategory }
              title="Foods"
              selectedCategory={ selectedCategory }
              setSelectedCategory={ setSelectedCategory }
            />
          )
        ))}
      </div>

      <div className={ styles.recipes_container }>

        {recipesByIng.length === 0 ? (
          <>
            {recipes.meals && recipes.meals.map((elem, index) => (
              index < lengthFood && (
                <CardRecipes
                  prevPath="foods"
                  index={ index }
                  strMealOrDrink={ elem.strMeal }
                  strMealOrDrinkThumb={ elem.strMealThumb }
                  key={ elem.idMeal }
                  id={ elem.idMeal }
                />
              )))}
            {recipes.meals
      && (recipes.meals.length === 1 && searched)
        && <Redirect to={ `/foods/${recipes.meals[0].idMeal}` } />}
          </>
        ) : (
          <>
            { recipesByIng.map((e, index) => (
              index < lengthFood && (
                <CardRecipes
                  prevPath="foods"
                  index={ index }
                  strMealOrDrink={ e.strMeal }
                  strMealOrDrinkThumb={ e.strMealThumb }
                  key={ e.idMeal }
                  id={ e.idMeal }
                />
              )))}
          </>
        )}
      </div>
      <Footer />
    </main>
  );
}
