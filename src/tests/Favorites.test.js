import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndRedux from '../helpers/renderWithRouterAndRedux';

jest.setTimeout(20000);
it('Testa se um item favoritado na tela de Detalhes aparece na tela de Favoritos', async () => {
  const { history } = renderWithRouterAndRedux(<App />, { initialEntries: ['/meals/52977'] });

  await waitFor(() => {
    const corba = screen.getByRole(
      'heading',
      { level: 1, name: /Corba/ },
    );
    expect(corba).toBeInTheDocument();

    const favoriteBtn = screen.getByTestId(/favorite-btn/);
    expect(favoriteBtn).toBeInTheDocument();
    userEvent.click(favoriteBtn);
  }, { timeout: 10000 });

  history.push('/favorite-recipes');
  await waitFor(() => {
    const corba = screen.getByRole(
      'heading',
      { level: 2, name: /Corba/ },
    );
    expect(corba).toBeInTheDocument();

    const favoriteBtn = screen.getByTestId(/0-horizontal-favorite-btn/);
    expect(favoriteBtn).toBeInTheDocument();
    userEvent.click(favoriteBtn);
    expect(corba).not.toBeInTheDocument();
  }, { timeout: 10000 });
});

it('Testa os botões de filtro da tela de Favoritos', async () => {
  const { history } = renderWithRouterAndRedux(<App />);

  const newFavoriteRecipes = [
    {
      id: '52771',
      type: 'meal',
      nationality: 'Italian',
      category: 'Vegetarian',
      alcoholicOrNot: '',
      name: 'Spicy Arrabiata Penne',
      image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    },
    {
      id: '178319',
      type: 'drink',
      category: 'Cocktail',
      alcoholicOrNot: 'Alcoholic',
      name: 'Aquamarine',
      image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    }];
  localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
  history.push('/favorite-recipes');

  await waitFor(() => {
    const favoriteRecipes = screen.getAllByRole('heading', { level: 2 });
    expect(favoriteRecipes).toHaveLength(2);

    favoriteRecipes.forEach((recipe, index) => {
      expect(recipe).toHaveTextContent(newFavoriteRecipes[index].name);
    });

    userEvent.click(screen.getByTestId(/filter-by-meal-btn/i));
  }, { timeout: 10000 });

  await waitFor(() => {
    const favoriteRecipes = screen.getByRole('heading', { level: 2 });
    expect(favoriteRecipes).toHaveTextContent('Spicy Arrabiata Penne');

    userEvent.click(screen.getByTestId(/filter-by-drink-btn/i));
  }, { timeout: 10000 });

  await waitFor(() => {
    const favoriteRecipes = screen.getByRole('heading', { level: 2 });
    expect(favoriteRecipes).toHaveTextContent('Aquamarine');

    userEvent.click(screen.getByTestId(/filter-by-all-btn/i));
  }, { timeout: 10000 });

  await waitFor(() => {
    const favoriteRecipes = screen.getAllByRole('heading', { level: 2 });
    expect(favoriteRecipes).toHaveLength(2);

    favoriteRecipes.forEach((recipe, index) => {
      expect(recipe).toHaveTextContent(newFavoriteRecipes[index].name);
    });
  }, { timeout: 10000 });
});
