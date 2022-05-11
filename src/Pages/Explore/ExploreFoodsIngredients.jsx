import React, { useContext, useEffect, useState } from 'react';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import MyContext from '../../context/MyContext';
import CardIngredient from '../../Components/CardIngredient/CardIngredient';
import styles from './explore-by-ingredients.module.css';

export default function ExploreFoodsIngredients(props) {
  const { fetchIngredients } = useContext(MyContext);
  const [arrIgredients, setArrIgredients] = useState([]);
  const DOZE = 12;
  useEffect(() => {
    const addIngredients = async () => {
      const returnIngredients = await fetchIngredients();
      setArrIgredients(returnIngredients.slice(0, DOZE));
    };
    addIngredients();
  }, []);

  // useEffect(() => {
  //   console.log(arrIgredients);
  // }, [arrIgredients]);

  return (
    <div>
      <Header { ...props } title="Explore Ingredients" dontShowSearchIcon />
      <div className={ styles.card_ingredients }>
        {arrIgredients.length !== 0 && arrIgredients.map(
          ({ strIngredient, idIngredient }, index) => (
            <CardIngredient
              { ...props }
              key={ idIngredient }
              strIngredient={ strIngredient }
              idIngredient={ index }
            />
          ),
        )}
      </div>
      <Footer />
    </div>
  );
}
