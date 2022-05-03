import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from './App';
import {
  dataDrinks,
  dataCategoriesDrinks,
  dataRecipesByCocoa,
  dataRecipesByShake,
  dataRecipesByOther,
  dataRecipesByCocktail,
  dataRecipesByOrdinary,
} from './dataForMainRecepiesDrinks/dataDrinks';

const testRecipeCards = async (expectedData) => {
  const recipeCardRegex = /-recipe-card$/;
  const recipeCards = await screen.findAllByTestId(recipeCardRegex);
  expect(recipeCards.length).toBe(dataDrinks.drinks.length);
  for (let index = 0; index < expectedData.drinks.length; index += 1) {
    const link = screen.getByTestId(`${index}-recipe-card`);
    const image = screen.getByTestId(`${index}-card-img`);
    const name = screen.getByTestId(`${index}-card-name`);
    expect(link).toBeInTheDocument();
    expect(image).toBeInTheDocument();
    expect(image.src).toContain(`${expectedData.drinks[index].strDrinkThumb}`);
    expect(image.alt).toContain(`${expectedData.drinks[index].strDrink}`);
    expect(name).toBeInTheDocument();
  }
};

const testCategoryCards = async (expectedCategories) => {
  const cardCategoryRegex = /category-filter$/;
  const cardsCategory = await screen.findAllByTestId(cardCategoryRegex);
  const expectedCatWithAll = {
    drinks: [{ strCategory: 'All' }, ...expectedCategories.drinks],
  };
  expect(cardsCategory.length).toBe(expectedCatWithAll.drinks.length);
  for (let index = 0; index < expectedCatWithAll.length; index += 1) {
    const categoryCard = screen.getByTestId(
      `${dataCategoriesDrinks.drinks[0].strCategory}-category-filter`,
    );
    expect(categoryCard).toBeInTheDocument();
    expect(categoryCard).toHaveTextContent(expectedCatWithAll.drinks[index].strCategory);
    expect(categoryCard.type).toBe('button');
  }
};

const testFirstRecepiesOfACategory = async (recepiesOfACategory, name) => {
  const { history } = renderWithRouter(<App />);
  history.push('/Drinks');
  jest.spyOn(global, 'fetch');
  global.fetch.mockResolvedValue({
    json: jest.fn()
      .mockResolvedValueOnce(dataDrinks)
      .mockResolvedValueOnce(dataCategoriesDrinks)
      .mockResolvedValueOnce(recepiesOfACategory),
  });
  const button = await screen.findByTestId(`${name}-category-filter`);
  expect(button).toBeInTheDocument();
  userEvent.click(button);
  testRecipeCards(recepiesOfACategory);
};

const testAllRecepies = async (recepiesOfACategory, name) => {
  const { history } = renderWithRouter(<App />);
  history.push('/Drinks');
  jest.spyOn(global, 'fetch');
  global.fetch.mockResolvedValue({
    json: jest.fn()
      .mockResolvedValue(dataDrinks)
      .mockResolvedValueOnce(dataDrinks)
      .mockResolvedValueOnce(dataCategoriesDrinks)
      .mockResolvedValueOnce(recepiesOfACategory),
  });
  const beefCategory = await screen.findByTestId(`${name}-category-filter`);
  userEvent.click(beefCategory);
  await testRecipeCards(recepiesOfACategory);
  userEvent.click(beefCategory);
  await testRecipeCards(dataDrinks);
};

describe('Tela principal de receitas de comidas', () => {
  afterEach(() => jest.clearAllMocks());
  it('faz requisição às APIs para mostrar as 12 receitas e 5 categorias', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/Drinks');
    const urlRecipes = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    const urlCategory = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn()
        .mockResolvedValueOnce(dataDrinks)
        .mockResolvedValueOnce(dataCategoriesDrinks),
    });
    await testRecipeCards(dataDrinks);
    await testCategoryCards(dataCategoriesDrinks);
    expect(global.fetch).toBeCalledTimes(2);
    expect(global.fetch).toHaveBeenNthCalledWith(1, urlRecipes);
    expect(global.fetch).toHaveBeenNthCalledWith(2, urlCategory);
  });

  it('mostra as 12 primeiras receitas de "Cocktail" ao selecionar'
    + ' esta categoria', async () => {
    await testFirstRecepiesOfACategory(dataRecipesByCocktail, 'Cocktail');
  });

  it('mostra as 12 primeiras receitas de "Cocoa" ao'
    + 'selecionar esta categoria', async () => {
    await testFirstRecepiesOfACategory(dataRecipesByCocoa, 'Cocoa');
  });

  it('mostra as 12 primeiras receitas de "Ordinary" ao selecionar'
  + ' esta categoria', async () => {
    await testFirstRecepiesOfACategory(dataRecipesByOrdinary, 'Ordinary Drink');
  });

  it('mostra as 12 primeiras receitas de "Other/Unknown" ao '
    + 'selecionar esta categoria', async () => {
    await testFirstRecepiesOfACategory(dataRecipesByOther, 'Other/Unknown');
  });

  it('mostra as 12 primeiras receitas de "Shake" '
  + 'ao selecionar esta categoria', async () => {
    await testFirstRecepiesOfACategory(dataRecipesByShake, 'Shake');
  });

  it('mostra receitas sem filtro ao clicar em "Cocktail" duas vezes', async () => {
    await testAllRecepies(dataRecipesByCocktail, 'Cocktail');
  });

  it('mostra receitas sem filtro ao clicar em "Cocoa" duas vezes', async () => {
    await testAllRecepies(dataRecipesByCocoa, 'Cocoa');
  });

  it('mostra receitas sem filtro ao clicar em "Ordinary" duas vezes', async () => {
    await testAllRecepies(dataRecipesByOrdinary, 'Ordinary Drink');
  });

  it('mostra receitas sem filtro ao clicar em "Other" duas vezes', async () => {
    await testAllRecepies(dataRecipesByOther, 'Other/Unknown');
  });

  it('mostra receitas sem filtro ao clicar em "Shake" duas vezes', async () => {
    await testAllRecepies(dataRecipesByShake, 'Shake');
  });
});
