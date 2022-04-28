import React, { useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import CardRecipes from '../../Components/CardRecipes';
import Header from '../../Components/Header';
import MyContext from '../../context/MyContext';
import Footer from '../../Components/Footer/Footer';

export default function Foods(props) {
  const { searchOn, recipes } = useContext(MyContext);
  const lengthFood = 12;
  useEffect(() => {
    searchOn();
  }, [searchOn]);

  return (
    <div>
      <Header { ...props } title="Foods" />
      {recipes.meals && recipes.meals.map((elem, index) => (
        index < lengthFood && (
          <CardRecipes
            index={ index }
            strMeal={ elem.strMeal }
            strMealThumb={ elem.strMealThumb }
            key={ elem.idMeal }
          />
        )))}
      {recipes.meals
      && recipes.meals.length === 1 && <Redirect
        to={ `/foods/${
          recipes.meals[0].idMeal
        }` }
      />}
      <Footer />
    </div>
  );
}
