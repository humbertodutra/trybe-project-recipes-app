import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import CardRecipes from '../../Components/CardRecipes/CardRecipes';
import Header from '../../Components/Header';
import MyContext from '../../context/MyContext';
import Footer from '../../Components/Footer/Footer';
import CardCategories from '../../Components/CardCategories/CardCategories';

export default function Drinks(props) {
  const { recipes, categories, getAllRecipes, showSearch,
    getCategories, searched, originalRecipes } = useContext(MyContext);
  const lengthDrink = 12;
  const lengthCategories = 5;

  useEffect(() => {
    getAllRecipes('drinks');
    getCategories('drinks');
  }, []);

  const [selectedCategory, setSelectedCategory] = useState('All');

  const recipesToRender = (selectedCategory === 'All' ? originalRecipes : (
    recipes
  ));

  return (
    <div>
      <Header { ...props } title="Drinks" />
      <CardCategories
        categoryName="All"
        title="Drinks"
        selectedCategory={ selectedCategory }
        setSelectedCategory={ setSelectedCategory }
      />
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
      {recipesToRender.drinks && recipesToRender.drinks.map((elem, index) => (
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
      {recipesToRender.drinks
      && (recipesToRender.drinks.length === 1 && searched) && <Redirect
        to={ `/drinks/${
          recipesToRender.drinks[0].idDrink
        }` }
      />}
      <Footer />
    </div>
  );
}
