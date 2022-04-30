import React, { useEffect, useContext } from 'react';
import Header from '../../Components/Header';
import MyContext from '../../context/MyContext';

export default function FavoriteRecipes(props) {
  const { searchOff } = useContext(MyContext);
  useEffect(() => {
    searchOff();
  }, [searchOff]);
  return (
    <div>
      <Header { ...props } title="Favorite Recipes" dontShowSearchIcon />
    </div>
  );
}
