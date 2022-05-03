import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from './App';

describe('Testes da tela Explore', () => {
  it('Verifica se os botões "Explore Foods" e "Explore Drinks" são exibidos', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/explore');
    const btnFoods = screen.getByTestId('explore-foods');
    const btnDrinks = screen.getByTestId('explore-drinks');
    expect(btnFoods).toBeInTheDocument();
    expect(btnDrinks).toBeInTheDocument();
    expect(btnFoods).toHaveTextContent('Explore Foods');
    expect(btnDrinks).toHaveTextContent('Explore Drinks');
  });

  it(`Ao clicar no botão "Explore Foods" a rota muda para a página de
  explorar comidas.`, () => {
    const { history } = renderWithRouter(<App />);
    history.push('/explore');
    const btnFoods = screen.getByTestId('explore-foods');
    userEvent.click(btnFoods);
    const { pathname } = history.location;
    expect(pathname).toBe('/explore/foods');
  });

  it(`Ao clicar no botão "Explore Drinks" a rota muda para a página de
  explorar bebidas.`, () => {
    const { history } = renderWithRouter(<App />);
    history.push('/explore');
    const btnDrinks = screen.getByTestId('explore-drinks');
    userEvent.click(btnDrinks);
    const { pathname } = history.location;
    expect(pathname).toBe('/explore/drinks');
  });
});
