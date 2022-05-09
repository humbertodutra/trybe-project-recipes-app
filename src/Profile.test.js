import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Profile from './Pages/Profile/Profile';

const done = 'profile-done-btn';
const favorite = 'profile-favorite-btn';
const profile = 'profile-logout-btn';

describe('Tela de Perfil / Profile', () => {
  it('Verifica se possui todos os botões e com os devidos data testids', () => {
    renderWithRouter(<Profile />);

    const doneRecipes = screen.getByTestId(done);
    const favoriteRecipes = screen.getByTestId(favorite);
    const logout = screen.getByTestId(profile);

    expect(doneRecipes).toBeInTheDocument();
    expect(favoriteRecipes).toBeInTheDocument();
    expect(logout).toBeInTheDocument();
  });

  it('Verifica se o email é renderizado na tela', () => {
    const myEmail = 'test@trybe.com';
    window.localStorage.setItem('user', JSON.stringify({ email: myEmail }));
    renderWithRouter(<Profile />);
    expect(screen.getByTestId('profile-email')).toHaveTextContent(myEmail);
  });

  it(`Verifica se ao clicar no botão "Done Recipes" 
  a rota é redirecionada corretamente`, () => {
    const { history } = renderWithRouter(<Profile />);
    const doneRecipes = screen.getByTestId(done);
    userEvent.click(doneRecipes);
    const { pathname } = history.location;
    expect(pathname).toBe('/done-recipes');
  });

  it(`Verifica se ao clicar no botão "Favorite Recipes" 
  a rota é redirecionada corretamente`, () => {
    const { history } = renderWithRouter(<Profile />);
    const favoriteRecipes = screen.getByTestId(favorite);
    userEvent.click(favoriteRecipes);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorite-recipes');
  });

  it(`Verifica se ao clicar no botão "Logout" 
  a rota é redirecionada corretamente`, () => {
    const { history } = renderWithRouter(<Profile />);
    const logout = screen.getByTestId(profile);
    userEvent.click(logout);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
});
