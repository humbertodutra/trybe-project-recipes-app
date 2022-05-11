import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import ExploreFoodsIngredients from './Pages/Explore/ExploreFoodsIngredients';

describe('Testes da tela Explore Foods Ingredients', () => {
  it('Verifica se os ingredientes renderizam na tela', async () => {
    renderWithRouter(<ExploreFoodsIngredients />);
    const button = await screen.findByRole('button', { name: /chicken/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('data-testid', '0-ingredient-card');
  });
  it('Verifica se ao clicar no card, é redirecionado corretamente', async () => {
    const { history } = renderWithRouter(<ExploreFoodsIngredients />);
    const button = await screen.findByRole('button', { name: /chicken/i });
    userEvent.click(button);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
    // não está indo pra rota "/foods"
  });
});
