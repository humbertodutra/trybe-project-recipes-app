import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Pages/Login/Login';
import Foods from './Pages/Foods/Foods';
import Drinks from './Pages/Drinks/Drinks';
import Explore from './Pages/Explore/Explore';
import Profile from './Pages/Profile/Profile';
import FavoriteRecipes from './Pages/Favorite_Recipes/FavoriteRecipes';
import DoneRecipes from './Pages/Done_Recipes/DoneRecipes';
import ExploreDrinks from './Pages/Explore/ExploreDrinks';
import ExploreDrinksIngredients from './Pages/Explore/ExploreDrinksIngredients';
import ExploreFoods from './Pages/Explore/ExploreFoods';
import ExploreFoodsIngredients from './Pages/Explore/ExploreFoodsIngredients';
import ExploreFoodsNationalities from './Pages/Explore/ExploreFoodsNacionalities';
import FoodsRecipe from './Pages/FoodsRecipe/FoodsRecipe';
import DrinksRecipe from './Pages/DrinksRecipe/DrinksRecipe';

function App() {
  return (
    <Switch>
      <Route
        exact
        path="/"
        component={ Login }
      />
      <Route
        exact
        path="/foods"
        component={ Foods }
      />
      <Route
        exact
        path="/drinks"
        component={ Drinks }
      />
      <Route
        exact
        path="/foods/:idRecipe"
        render={ (props) => <FoodsRecipe { ...props } /> }
      />
      <Route
        exact
        path="/drinks/:idRecipe"
        render={ (props) => <DrinksRecipe { ...props } /> }
      />
      {/* <Route
        exact
        path="/foods/:id-da-receita/in-progress"
        component={ FoodProgress }
      /> */}
      {/* <Route
        exact
        path="/drinks/:id-da-receita/in-progress"
        component={ DrinkProgress }
      /> */}
      <Route
        exact
        path="/explore"
        component={ Explore }
      />
      <Route
        exact
        path="/explore/foods"
        component={ ExploreFoods }
      />
      <Route
        exact
        path="/explore/drinks"
        component={ ExploreDrinks }
      />
      <Route
        exact
        path="/explore/foods/ingredients"
        component={ ExploreFoodsIngredients }
      />
      <Route
        exact
        path="/explore/drinks/ingredients"
        component={ ExploreDrinksIngredients }
      />
      <Route
        exact
        path="/explore/foods/nationalities"
        component={ ExploreFoodsNationalities }
      />
      <Route
        exact
        path="/profile"
        component={ Profile }
      />
      <Route
        exact
        path="/done-recipes"
        component={ DoneRecipes }
      />
      <Route
        exact
        path="/favorite-recipes"
        component={ FavoriteRecipes }
      />
    </Switch>
  );
}

export default App;
