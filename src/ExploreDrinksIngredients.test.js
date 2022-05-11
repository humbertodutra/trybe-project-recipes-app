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
    const { history } = renderWithRouter(<ExploreDrinksIngredients />);
    const btnIngredient = await screen.findByRole('button', { name: /light rum/i });
    userEvent.click(btnIngredient);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
    // não está indo pra rota "/foods"
  });
});
