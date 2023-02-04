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
import FoodProgress from './Pages/FoodProgress/FoodProgress';
import DrinkProgress from './Pages/DrinkProgress/DrinkProgress';
import DrinksNationalites from './Pages/Drinks-Nationalites/Drinks_Nationalites';

function App() {
  return (
    <Switch>
      <Route
        exact
        path="/"
        component={ Login }
      />
      <Route
        path="/foods"
        component={ Foods }
      />
      <Route
        path="/drinks"
        component={ Drinks }
      />
      <Route
        path="/foods/:idRecipe"
        render={ (props) => <FoodsRecipe { ...props } /> }
      />
      <Route
        path="/drinks/:idRecipe"
        render={ (props) => <DrinksRecipe { ...props } /> }
      />
      <Route
        path="/foods/:idRecipe/in-progress"
        render={ (props) => <FoodProgress { ...props } /> }
      />
      <Route
        path="/drinks/:idRecipe/in-progress"
        component={ DrinkProgress }
      />
      <Route
        path="/explore"
        component={ Explore }
      />
      <Route
        path="/explore/foods"
        component={ ExploreFoods }
      />
      <Route
        path="/explore/drinks"
        component={ ExploreDrinks }
      />
      <Route
        path="/explore/foods/ingredients"
        component={ ExploreFoodsIngredients }
      />
      <Route
        path="/explore/drinks/ingredients"
        component={ ExploreDrinksIngredients }
      />
      <Route
        path="/explore/foods/nationalities"
        component={ ExploreFoodsNationalities }
      />
      <Route
        path="/profile"
        component={ Profile }
      />
      <Route
        path="/done-recipes"
        component={ DoneRecipes }
      />
      <Route
        path="/explore/drinks/nationalities"
        component={ DrinksNationalites }
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
