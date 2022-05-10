import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import CardRecipes from '../../Components/CardRecipes/CardRecipes';
import Header from '../../Components/Header/Header';
import MyContext from '../../context/MyContext';
import Footer from '../../Components/Footer/Footer';
import CardCategories from '../../Components/CardCategories/CardCategories';
import styles from './Drinks.module.css';

export default function Drinks(props) {
  const { recipes, categories, getAllRecipes, showSearch,
    getCategories, searched, recipesByIng } = useContext(MyContext);
  const lengthDrink = 12;
  const lengthCategories = 5;

  useEffect(() => {
    getAllRecipes('drinks');
    getCategories('drinks');
  }, []);

  const [selectedCategory, setSelectedCategory] = useState('All');

  return (
    <main>
      <Header { ...props } title="Drinks" />

      <div className={ styles.categories_container }>
        {(categories.drinks && !showSearch) && (
          <CardCategories
            categoryName="All"
            title="Drinks"
            selectedCategory={ selectedCategory }
            setSelectedCategory={ setSelectedCategory }
          />
        )}

        {categories.drinks && categories.drinks.map((elem, index) => (
          (index < lengthCategories && !showSearch) && (
            <CardCategories
              categoryName={ elem.strCategory }
              key={ elem.strCategory }
              title="Drinks"
              selectedCategory={ selectedCategory }
              setSelectedCategory={ setSelectedCategory }
            />
          )
        ))}
      </div>

      <div className={ styles.recipes_container }>

        {recipesByIng.length === 0 ? (
          <>
            {recipes.drinks && recipes.drinks.map((elem, index) => (
              index < lengthDrink && (
                <CardRecipes
                  prevPath="drinks"
                  index={ index }
                  strMealOrDrink={ elem.strDrink }
                  strMealOrDrinkThumb={ elem.strDrinkThumb }
                  key={ elem.idDrink }
                  id={ elem.idDrink }
                />
              )))}
            {recipes.drinks
      && (recipes.drinks.length === 1 && searched)
        && <Redirect to={ `/drinks/${recipes.drinks[0].idDrink}` } />}
          </>
        ) : (
          <>
            { recipesByIng.map((e, index) => (
              index < lengthDrink && (
                <CardRecipes
                  prevPath="drinks"
                  index={ index }
                  strMealOrDrink={ e.strDrink }
                  strMealOrDrinkThumb={ e.strDrinkThumb }
                  key={ e.idDrink }
                  id={ e.idDrink }
                />
              )))}
          </>
        )}
      </div>
      <Footer />
    </main>
  );
}
