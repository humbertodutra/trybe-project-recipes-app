import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from './App';
import ExploreFoods from './Pages/Explore/ExploreFoods';
import meals from './mocks/meals.json';

const EXPLORE_FOODS = '/explore/foods';

describe('Testes da tela Explore Foods', () => {
  it(`Verifica se os botões "By Ingredient",
    "By Nationality" e "Explore Drinks" são exibidos`, () => {
    renderWithRouter(<ExploreFoods />);
    const btnIngredient = screen.getByTestId('explore-by-ingredient');
    const btnNationality = screen.getByTestId('explore-by-nationality');
    const btnSurprise = screen.getByTestId('explore-surprise');

    expect(btnIngredient).toBeInTheDocument();
    expect(btnNationality).toBeInTheDocument();
    expect(btnSurprise).toBeInTheDocument();

    expect(btnIngredient).toHaveTextContent('By Ingredient');
    expect(btnNationality).toHaveTextContent('By Nationality');
    expect(btnSurprise).toHaveTextContent('Surprise me!');
  });

  it(`Redirecione a pessoa usuária ao clicar em "By Ingredient", para a tela de 
  explorar por ingredientes`, () => {
    const { history } = renderWithRouter(<App />);
    history.push(EXPLORE_FOODS);
    const btnIngredient = screen.getByTestId('explore-by-ingredient');
    userEvent.click(btnIngredient);
    const { pathname } = history.location;
    expect(pathname).toBe('/explore/foods/ingredients');
  });

  it(`Redirecione a pessoa usuária ao clicar em "By Nationality", a rota deve mudar para
  tela de explorar por nacionalidades`, () => {
    const { history } = renderWithRouter(<App />);
    history.push(EXPLORE_FOODS);
    const btnNationality = screen.getByTestId('explore-by-nationality');
    userEvent.click(btnNationality);
    const { pathname } = history.location;
    expect(pathname).toBe('/explore/foods/nationalities');
  });

  it(`Ao clicar em "Surprise me!", a rota deve mudar para a tela de detalhes de uma
  receita, que deve ser escolhida de forma aleatória através da API`, () => {
    const surprise = jest.spyOn(global, 'fetch')
      .mockResolvedValue({ json: jest.fn().mockResolvedValue(meals) });
    const { history } = renderWithRouter(<App />);
    history.push(EXPLORE_FOODS);
    const btnSurprise = screen.getByTestId('explore-surprise');
    userEvent.click(btnSurprise);
    expect(surprise).toHaveBeenCalled();
  });
});
