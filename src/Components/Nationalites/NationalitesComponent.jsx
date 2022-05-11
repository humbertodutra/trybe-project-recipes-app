import React, { useContext, useEffect, useState } from 'react';
import MyContext from '../../context/MyContext';
import CardRecipes from '../CardRecipes/CardRecipes';
import styles from './nationalities-component.module.css';

export default function NationalitesComponent() {
  const { getAllRecipes, recipes, setRecipes,
  } = useContext(MyContext);

  const [nationalities, setNationalities] = useState([]);

  useEffect(() => {
    getAllRecipes('meals');
    async function fetchNationalities() {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
      const { meals } = await response.json();
      setNationalities(meals);
    }
    fetchNationalities();
  }, []);

  async function fetchFilterByNationalities(area) {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
    const data = await response.json();
    setRecipes({ ...recipes, meals: data.meals });
  }

  function targetedNationality(a) {
    if (a.target.value !== 'All') {
      fetchFilterByNationalities(a.target.value);
    } else {
      getAllRecipes('meals');
    }
  }

  const onze = 12;

  return (
    <main>
      <div>
        <select
          className={ styles.select }
          data-testid="explore-by-nationality-dropdown"
          name="nationalities"
          id="nationalities"
          onChange={ targetedNationality }
        >
          <option
            key="All"
            data-testid={ `${'All'}-option` }
            value="All"
          >
            All
          </option>
          {nationalities.map((nationality, a) => (
            <option
              key={ a }
              data-testid={ `${nationality.strArea}-option` }
              value={ nationality.strArea }
            >
              {nationality.strArea}
            </option>
          ))}

        </select>
        <div className={ styles.card_recipes }>
          {recipes.meals.slice(0, onze).map((elem, index) => (

            <CardRecipes
              prevPath="foods"
              index={ index }
              strMealOrDrink={ elem.strMeal }
              strMealOrDrinkThumb={ elem.strMealThumb }
              key={ elem.idMeal }
              id={ elem.idMeal }
            />
          ))}
        </div>
      </div>
    </main>
  );
}
