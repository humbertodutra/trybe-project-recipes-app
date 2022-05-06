import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import ExploreFoodsIngredients from './Pages/Explore/ExploreFoodsIngredients';

describe('Testes da tela Explore Foods Ingredients', () => {
  it('Verifica se os ingredientes renderizam na tela', async () => {
    renderWithRouter(<ExploreFoodsIngredients />);
    const button = await screen.findByRole('button', { name: /chicken/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('data-testid', '0-ingredient-card');
  });
});
