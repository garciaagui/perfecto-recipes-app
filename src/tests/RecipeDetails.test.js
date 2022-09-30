import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndRedux from '../helpers/renderWithRouterAndRedux';

it('Verifica o conteúdo da tela de detalhes', async () => {
  renderWithRouterAndRedux(<App />, { initialEntries: ['/meals/52977'] });

  await waitFor(() => {
    expect(screen.getByTestId(/recipe-title/i)).toBeInTheDocument();
    expect(screen.getByTestId(/recipe-category/i)).toBeInTheDocument();
    expect(screen.getByTestId(/recipe-photo/i)).toBeInTheDocument();
    expect(screen.getByTestId(/instructions/i)).toBeInTheDocument();
    expect(screen.getByTestId(/share-btn/i)).toBeInTheDocument();
    expect(screen.getByTestId(/favorite-btn/i)).toBeInTheDocument();
    expect(screen.getByTestId(/start-recipe-btn/i)).toBeInTheDocument();
  });
});

it('Verifica a renderização da lista de ingredientes', async () => {
  renderWithRouterAndRedux(<App />, { initialEntries: ['/meals/52977'] });

  const ingredientsList = [
    'Lentils',
    'Onion',
    'Carrots',
    'Tomato Puree',
    'Cumin',
    'Paprika',
    'Mint',
    'Thyme',
    'Black Pepper',
    'Red Pepper Flakes',
    'Vegetable Stock',
    'Water',
    'Sea Salt'];

  const ingredientsQuantity = [
    '1 cup ',
    '1 large',
    '1 large',
    '1 tbs',
    '2 tsp',
    '1 tsp ',
    '1/2 tsp',
    '1/2 tsp',
    '1/4 tsp',
    '1/4 tsp',
    '4 cups ',
    '1 cup ',
    'Pinch'];

  await waitFor(() => {
    const renderedIngredients = screen.getAllByTestId(/-ingredient-name-and-measure/i);
    renderedIngredients.forEach((ingredient, index) => {
      expect(ingredient.innerHTML).toContain(ingredientsList[index]);
      expect(ingredient.innerHTML).toContain(ingredientsQuantity[index]);
    });
  });
  // }, { timeout: 3000 });
});

it('Testa se o botão de Start redireciona para a tela de Recipe in Progress', async () => {
  const { history } = renderWithRouterAndRedux(<App />, { initialEntries: ['/drinks/15997'] });
  await waitFor(() => {
    userEvent.click(screen.getByTestId('start-recipe-btn'));
  });

  const { pathname } = history.location;
  expect(pathname).toBe('/drinks/15997/in-progress');
});
