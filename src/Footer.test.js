import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Login from './Pages/Login/Login';
import Foods from './Pages/Foods/Foods';
import ExploreFoodsIngredients from './Pages/Explore/ExploreFoodsIngredients';
import Explore from './Pages/Explore/Explore';
import ExploreFoods from './Pages/Explore/ExploreFoods';
import ExploreDrinks from './Pages/Explore/ExploreDrinks';
import ExploreFoodsNationalities from './Pages/Explore/ExploreFoodsNacionalities';
import Profile from './Pages/Profile/Profile';
import DoneRecipes from './Pages/Done_Recipes/DoneRecipes';
import FavoriteRecipes from './Pages/Favorite_Recipes/FavoriteRecipes';
import Drinks from './Pages/Drinks/Drinks';
import Footer from './Components/Footer/Footer';
import ExploreDrinksIngredients from './Pages/Explore/ExploreDrinksIngredients';

describe('Componente Footer', () => {
  it('contém três links, cada um contendo a imagem correta', () => {
    renderWithRouter(<Footer />);
    const links = screen.getAllByRole('link');
    const numberOfLinks = 3;
    expect(links.length).toBe(numberOfLinks);
    const drinkIcon = screen.queryByTestId('drinks-bottom-btn');
    const exploreIcon = screen.queryByTestId('explore-bottom-btn');
    const foodIcon = screen.queryByTestId('food-bottom-btn');

    expect(drinkIcon).toHaveAttribute('src', 'drinkIcon.svg');
    expect(exploreIcon).toHaveAttribute('src', 'exploreIcon.svg');
    expect(foodIcon).toHaveAttribute('src', 'mealIcon.svg');

    expect(links[0]).toContainElement(drinkIcon);
    expect(links[1]).toContainElement(exploreIcon);
    expect(links[2]).toContainElement(foodIcon);
  });

  it('não existe na tela de login', () => {
    renderWithRouter(<Login />);
    const footerComponent = screen.queryByTestId('footer');
    expect(footerComponent).not.toBeInTheDocument();
  });

  it('existe na tela de comidas', () => {
    renderWithRouter(<Foods />);
    const footerComponent = screen.queryByTestId('footer');
    expect(footerComponent).toBeInTheDocument();
  });

  it('existe na tela de bebidas', () => {
    renderWithRouter(<Drinks />);
    const footerComponent = screen.queryByTestId('footer');
    expect(footerComponent).toBeInTheDocument();
  });

  // Falta os seguintes:
  // - Não tem footer na tela de detalhes de uma receita de comida
  // - Não tem footer na tela de detalhes de uma receita de bebida
  // - Não tem footer na tela de receita em progresso de comida
  // - Não tem footer na tela de receita em progresso de bebida

  it('existe na tela de explorar', () => {
    renderWithRouter(<Explore />);
    const footerComponent = screen.queryByTestId('footer');
    expect(footerComponent).toBeInTheDocument();
  });

  it('existe na tela de explorar comidas', () => {
    renderWithRouter(<ExploreFoods />);
    const footerComponent = screen.queryByTestId('footer');
    expect(footerComponent).toBeInTheDocument();
  });

  it('existe na tela de explorar bebidas', () => {
    renderWithRouter(<ExploreDrinks />);
    const footerComponent = screen.queryByTestId('footer');
    expect(footerComponent).toBeInTheDocument();
  });

  it('existe na tela de explorar comidas por ingrediente', () => {
    renderWithRouter(<ExploreFoodsIngredients />);
    const footerComponent = screen.queryByTestId('footer');
    expect(footerComponent).toBeInTheDocument();
  });

  it('existe na tela de explorar bebidas por ingrediente', () => {
    renderWithRouter(<ExploreDrinksIngredients />);
    const footerComponent = screen.queryByTestId('footer');
    expect(footerComponent).toBeInTheDocument();
  });

  it('existe na tela de explorar bebidas por nacionalidade', () => {
    renderWithRouter(<ExploreFoodsNationalities />);
    const footerComponent = screen.queryByTestId('footer');
    expect(footerComponent).toBeInTheDocument();
  });

  it('existe na tela de perfil', () => {
    renderWithRouter(<Profile />);
    const footerComponent = screen.queryByTestId('footer');
    expect(footerComponent).toBeInTheDocument();
  });

  it('não existe na tela de receitas feitas', () => {
    renderWithRouter(<DoneRecipes />);
    const footerComponent = screen.queryByTestId('footer');
    expect(footerComponent).not.toBeInTheDocument();
  });

  it('não existe na tela de receitas favoritas', () => {
    renderWithRouter(<FavoriteRecipes />);
    const footerComponent = screen.queryByTestId('footer');
    expect(footerComponent).not.toBeInTheDocument();
  });

  it('redireciona para a tela de comidas quando se clica no ícone de comidas', () => {
    const { history } = renderWithRouter(<Drinks />);
    const foodIcon = screen.queryByTestId('food-bottom-btn');
    userEvent.click(foodIcon);
    const { pathname } = history.location;
    expect(pathname).toBe('/foods');
  });

  it('redireciona para a tela de bebidas quando se clica no ícone de bebidas', () => {
    const { history } = renderWithRouter(<Foods />);
    const drinkIcon = screen.queryByTestId('drinks-bottom-btn');
    userEvent.click(drinkIcon);
    const { pathname } = history.location;
    expect(pathname).toBe('/drinks');
  });
});
