import React, { useContext, useEffect, useState } from 'react';
import CardDrinkIngredient
from '../../Components/CardDrinkIngredient/CardDrinkIngredient';
import Footer from '../../Components/Footer/Footer';
import Header from '../../Components/Header/Header';
import MyContext from '../../context/MyContext';
import styles from './explore-by-ingredients.module.css';

export default function ExploreDrinksIngredients(props) {
  const { fetchDrinksIngredients } = useContext(MyContext);
  const [arrIngredients, setArrIgredients] = useState([]);

  const DOZE = 12;

  useEffect(() => {
    const addIngredients = async () => {
      const returnIngredients = await fetchDrinksIngredients();
      setArrIgredients(returnIngredients.slice(0, DOZE));
    };
    addIngredients();
  }, []);

  return (
    <div>
      <Header { ...props } title="Explore Ingredients" dontShowSearchIcon />
      <div className={ styles.card_ingredients }>
        {arrIngredients.length !== 0 && arrIngredients.map(
          ({ strIngredient1 }, index) => (
            <CardDrinkIngredient
              { ...props }
              key={ index }
              strIngredient={ strIngredient1 }
              idIngredient={ index }
            />
          ),
        )}
      </div>
      <Footer />
    </div>
  );
}
