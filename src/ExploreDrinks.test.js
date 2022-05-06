import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from './App';
import ExploreDrinks from './Pages/Explore/ExploreDrinks';
import drinks from './mocks/drinks.json';

const EXPLORE_DRINKS = '/explore/drinks';

describe('Testes da tela Explore Drinks', () => {
  it('Verifica se os botões "By Ingredient" e "Explore Drinks" são exibidos', () => {
    renderWithRouter(<ExploreDrinks />);
    const btnIngredient = screen.getByTestId('explore-by-ingredient');
    const btnSurprise = screen.getByTestId('explore-surprise');

    expect(btnIngredient).toBeInTheDocument();
    expect(btnSurprise).toBeInTheDocument();

    expect(btnIngredient).toHaveTextContent('By Ingredient');
    expect(btnSurprise).toHaveTextContent('Surprise me!');
  });

  it(`Redirecione a pessoa usuária ao clicar em "By Ingredient", para a tela de 
  explorar por ingredientes`, () => {
    const { history } = renderWithRouter(<App />);
    history.push(EXPLORE_DRINKS);
    const btnIngredient = screen.getByTestId('explore-by-ingredient');
    userEvent.click(btnIngredient);
    const { pathname } = history.location;
    expect(pathname).toBe('/explore/drinks/ingredients');
  });

  it(`Ao clicar em "Surprise me!", a rota deve mudar para a tela de detalhes de uma
   receita, que deve ser escolhida de forma aleatória através da API`, () => {
    const surprise = jest.spyOn(global, 'fetch')
      .mockResolvedValue({ json: jest.fn().mockResolvedValue(drinks) });
    const { history } = renderWithRouter(<App />);
    history.push(EXPLORE_DRINKS);
    const btnSurprise = screen.getByTestId('explore-surprise');
    userEvent.click(btnSurprise);
    expect(surprise).toHaveBeenCalled();
  });
});
