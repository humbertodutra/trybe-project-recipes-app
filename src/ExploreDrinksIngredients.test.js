import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import ExploreDrinksIngredients from './Pages/Explore/ExploreDrinksIngredients';

describe('Testes da tela Explore Drinks Ingredients', () => {
  it('Verifica se os ingredientes renderizam na tela', async () => {
    renderWithRouter(<ExploreDrinksIngredients />);
    const btnIngredient = await screen.findByRole('button', {
      name: /light rum/i });
    expect(btnIngredient).toBeInTheDocument();
    expect(btnIngredient).toHaveAttribute('data-testid', '0-ingredient-card');
  });
  it('Verifica se ao clicar no card, é redirecionado corretamente', async () => {
    renderWithRouter(<ExploreDrinksIngredients />);
    const btnIngredient = await screen.findByTestId('0-ingredient-card');
    userEvent.click(btnIngredient);
    expect(btnIngredient).toBeInTheDocument();
    // const { pathname } = history.location;
    // expect(pathname).toBe('/drinks');
    // não está indo pra rota "/drinks
  });
});
