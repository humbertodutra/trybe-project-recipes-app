import React from 'react';
import { screen } from '@testing-library/react';
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
});
