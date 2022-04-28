import React, { useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import CardRecipes from '../../Components/CardRecipes';
import Header from '../../Components/Header';
import MyContext from '../../context/MyContext';
import Footer from '../../Components/Footer/Footer';

export default function Drinks(props) {
  const lengthDrinks = 12;
  const { searchOn, recipes } = useContext(MyContext);

  useEffect(() => {
    searchOn();
  }, [searchOn]);

  return (
    <div>
      <Header { ...props } title="Drinks" />
      {recipes.drinks && recipes.drinks.map((elem, index) => (
        index < lengthDrinks && (
          <CardRecipes
            index={ index }
            strMeal={ elem.strDrink }
            strMealThumb={ elem.strDrinkThumb }
            key={ elem.idDrink }
          />
        )))}
      {recipes.drinks
      && recipes.drinks.length === 1 && <Redirect
        to={ `/drinks/${
          recipes.drinks[0].idDrink
        }` }
      />}
      <Footer />
    </div>
  );
}
