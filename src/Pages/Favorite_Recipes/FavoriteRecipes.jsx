import React from 'react';
import Header from '../../Components/Header';

export default function FavoriteRecipes(props) {
  return (
    <div>
      <Header { ...props } title="Favorite Recipes" dontShowSearchIcon />
    </div>
  );
}
