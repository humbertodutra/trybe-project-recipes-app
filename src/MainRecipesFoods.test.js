import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from './App';
import {
  dataFoods,
  dataCategoriesFoods,
  dataRecipesByBeef,
  dataRecipesByBreakfast,
  dataRecipesByChicken,
  dataRecipesByDessert,
  dataRecipesByGoat,
} from './dataForMainRecepiesFoods/dataFoods';

const testRecipeCards = async (expectedData) => {
  const recipeCardRegex = /-recipe-card$/;
  const recipeCards = await screen.findAllByTestId(recipeCardRegex);
  expect(recipeCards.length).toBe(dataFoods.meals.length);
  for (let index = 0; index < expectedData.meals.length; index += 1) {
    const link = screen.getByTestId(`${index}-recipe-card`);
    const image = screen.getByTestId(`${index}-card-img`);
    const name = screen.getByTestId(`${index}-card-name`);
    expect(link).toBeInTheDocument();
    expect(image).toBeInTheDocument();
    expect(image.src).toContain(`${expectedData.meals[index].strMealThumb}`);
    expect(image.alt).toContain(`${expectedData.meals[index].strMeal}`);
    expect(name).toBeInTheDocument();
  }
};

const testCategoryCards = async (expectedCategories) => {
  const cardCategoryRegex = /category-filter$/;
  const cardsCategory = await screen.findAllByTestId(cardCategoryRegex);
  const expectedCategWithAll = {
    meals: [{ strCategory: 'All' }, ...expectedCategories.meals],
  };
  expect(cardsCategory.length).toBe(expectedCategWithAll.meals.length);
  for (let index = 0; index < expectedCategWithAll.length; index += 1) {
    const categoryCard = screen.getByTestId(
      `${dataCategoriesFoods.meals[0].strCategory}-category-filter`,
    );
    expect(categoryCard).toBeInTheDocument();
    expect(categoryCard).toHaveTextContent(expectedCategWithAll.meals[index].strCategory);
    expect(categoryCard.type).toBe('button');
  }
};

const testFirstRecepiesOfACategory = async (recepiesOfACategory, name) => {
  const { history } = renderWithRouter(<App />);
  history.push('/Foods');
  jest.spyOn(global, 'fetch');
  global.fetch.mockResolvedValue({
    json: jest.fn()
      .mockResolvedValueOnce(dataFoods)
      .mockResolvedValueOnce(dataCategoriesFoods)
      .mockResolvedValueOnce(recepiesOfACategory),
  });
  const button = await screen.findByTestId(`${name}-category-filter`);
  expect(button).toBeInTheDocument();
  userEvent.click(button);
  testRecipeCards(recepiesOfACategory);
};

const testAllRecepies = async (recepiesOfACategory, name) => {
  const { history } = renderWithRouter(<App />);
  history.push('/Foods');
  jest.spyOn(global, 'fetch');
  global.fetch.mockResolvedValue({
    json: jest.fn()
      .mockResolvedValue(dataFoods)
      .mockResolvedValueOnce(dataFoods)
      .mockResolvedValueOnce(dataCategoriesFoods)
      .mockResolvedValueOnce(recepiesOfACategory),
  });
  const beefCategory = await screen.findByTestId(`${name}-category-filter`);
  userEvent.click(beefCategory);
  await testRecipeCards(recepiesOfACategory);
  userEvent.click(beefCategory);
  await testRecipeCards(dataFoods);
};

describe('Tela principal de receitas de comidas', () => {
  afterEach(() => jest.clearAllMocks());
  it('faz requisição às APIs para mostrar as 12 receitas e 5 categorias', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/Foods');
    const urlRecipes = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    const urlCategory = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn()
        .mockResolvedValueOnce(dataFoods)
        .mockResolvedValueOnce(dataCategoriesFoods),
    });
    await testRecipeCards(dataFoods);
    await testCategoryCards(dataCategoriesFoods);
    expect(global.fetch).toBeCalledTimes(2);
    expect(global.fetch).toHaveBeenNthCalledWith(1, urlRecipes);
    expect(global.fetch).toHaveBeenNthCalledWith(2, urlCategory);
  });

  it('mostra as 12 primeiras receitas de "Beef" ao selecionar'
    + ' esta categoria', async () => {
    await testFirstRecepiesOfACategory(dataRecipesByBeef, 'Beef');
  });

  it('mostra as 12 primeiras receitas de "Breakfast" ao'
    + 'selecionar esta categoria', async () => {
    await testFirstRecepiesOfACategory(dataRecipesByBreakfast, 'Breakfast');
  });

  it('mostra as 12 primeiras receitas de "Chicken" ao selecionar'
  + ' esta categoria', async () => {
    await testFirstRecepiesOfACategory(dataRecipesByChicken, 'Chicken');
  });

  it('mostra as 12 primeiras receitas de "Dessert" ao '
    + 'selecionar esta categoria', async () => {
    await testFirstRecepiesOfACategory(dataRecipesByDessert, 'Dessert');
  });

  it('mostra as 12 primeiras receitas de "Goat" '
  + 'ao selecionar esta categoria', async () => {
    await testFirstRecepiesOfACategory(dataRecipesByDessert, 'Goat');
  });

  it('mostra receitas sem filtro ao clicar em "Beef" duas vezes', async () => {
    await testAllRecepies(dataRecipesByBeef, 'Beef');
  });

  it('mostra receitas sem filtro ao clicar em "Breakfast" duas vezes', async () => {
    await testAllRecepies(dataRecipesByBreakfast, 'Breakfast');
  });

  it('mostra receitas sem filtro ao clicar em "Chicken" duas vezes', async () => {
    await testAllRecepies(dataRecipesByChicken, 'Chicken');
  });

  it('mostra receitas sem filtro ao clicar em "Dessert" duas vezes', async () => {
    await testAllRecepies(dataRecipesByDessert, 'Dessert');
  });

  it('mostra receitas sem filtro ao clicar em "Goat" duas vezes', async () => {
    await testAllRecepies(dataRecipesByGoat, 'Goat');
  });
});
