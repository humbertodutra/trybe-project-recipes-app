import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from './App';

const searchTestId = 'search-top-btn';
const inputSearch = 'search-input';

describe('Tela do Header', () => {
  it('Verifica se existe dois botoes e um titulo', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/Foods');
    const search = screen.getByTestId(searchTestId);
    const user = screen.getByTestId('profile-top-btn');
    const title = screen.getByTestId('page-title');
    expect(user).toBeInTheDocument();
    expect(search).toBeInTheDocument();
    expect(title).toBeInTheDocument();
  });
  it('Verifica se ao clicar no botao de usuario redireciona para a rota /profile', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/Foods');
    const user = screen.getByTestId('profile-top-btn');
    userEvent.click(user);
    const { pathname } = history.location;
    expect(pathname).toBe('/profile');
  });

  it(`Verifica se ao clicar
   no botao de pesquisa é renderizado um form de inputs e um botao`, () => {
    const { history } = renderWithRouter(<App />);
    history.push('/Foods');
    const search = screen.getByTestId(searchTestId);
    userEvent.click(search);
    const inputText = screen.getByTestId(inputSearch);
    const inputIngredients = screen.getByTestId('ingredient-search-radio');
    const inputName = screen.getByTestId('name-search-radio');
    const inputFirstLetter = screen.getByTestId('first-letter-search-radio');
    const buttonSearch = screen.getByTestId('exec-search-btn');
    expect(inputText).toBeInTheDocument();
    expect(inputIngredients).toBeInTheDocument();
    expect(inputName).toBeInTheDocument();
    expect(inputFirstLetter).toBeInTheDocument();
    expect(buttonSearch).toBeInTheDocument();
  });

  it('Verifica se ao clicar no botao de pesquisa e feita uma requisicao', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/Foods');
    const search = screen.getByTestId(searchTestId);
    userEvent.click(search);
    const inputText = screen.getByTestId(inputSearch);
    const inputIngredients = screen.getByTestId('ingredient-search-radio');
    const buttonSearch = screen.getByTestId('exec-search-btn');
    userEvent.type(inputText, 'chicken');
    userEvent.click(inputIngredients);
    userEvent.click(buttonSearch);
    const data = {
      meals: [
        {
          strMeal: 'Brown Stew Chicken',
          strMealThumb: 'https://www.themealdb.com/images/media/meals/sypxpx1515365095.jpg',
          idMeal: '52940',
        },
        {
          strMeal: 'Chicken & mushroom Hotpot',
          strMealThumb: 'https://www.themealdb.com/images/media/meals/uuuspp1511297945.jpg',
          idMeal: '52846',
        },
        {
          strMeal: 'Chicken Alfredo Primavera',
          strMealThumb: 'https://www.themealdb.com/images/media/meals/syqypv1486981727.jpg',
          idMeal: '52796',
        },
        {
          strMeal: 'Chicken Basquaise',
          strMealThumb: 'https://www.themealdb.com/images/media/meals/wruvqv1511880994.jpg',
          idMeal: '52934',
        },
        {
          strMeal: 'Chicken Congee',
          strMealThumb: 'https://www.themealdb.com/images/media/meals/1529446352.jpg',
          idMeal: '52956',
        },
        {
          strMeal: 'Chicken Handi',
          strMealThumb: 'https://www.themealdb.com/images/media/meals/wyxwsp1486979827.jpg',
          idMeal: '52795',
        },
        {
          strMeal: 'Kentucky Fried Chicken',
          strMealThumb: 'https://www.themealdb.com/images/media/meals/xqusqy1487348868.jpg',
          idMeal: '52813',
        },
        {
          strMeal: 'Kung Pao Chicken',
          strMealThumb: 'https://www.themealdb.com/images/media/meals/1525872624.jpg',
          idMeal: '52945',
        },
        {
          strMeal: 'Pad See Ew',
          strMealThumb: 'https://www.themealdb.com/images/media/meals/uuuspp1468263334.jpg',
          idMeal: '52774',
        },
        {
          strMeal: 'Piri-piri chicken and slaw',
          strMealThumb: 'https://www.themealdb.com/images/media/meals/hglsbl1614346998.jpg',
          idMeal: '53039',
        },
        {
          strMeal: 'Thai Green Curry',
          strMealThumb: 'https://www.themealdb.com/images/media/meals/sstssx1487349585.jpg',
          idMeal: '52814',
        },
      ],
    };

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(data),
    });
    const brownChicken = await screen.findByTestId('0-card-name');
    expect(brownChicken).toBeInTheDocument();
  });

  it('Verifica se ao clicar no botão com a lupa o form desaparece', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/Foods');
    const search = screen.getByTestId(searchTestId);
    userEvent.click(search);
    const inputText = screen.getByTestId(inputSearch);
    expect(inputText).toBeInTheDocument();
    userEvent.click(search);
    expect(inputText).not.toBeInTheDocument();
  });
});
