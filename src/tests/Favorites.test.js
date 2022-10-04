import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndRedux from '../helpers/renderWithRouterAndRedux';

it('Testa page favorite', async () => {
  const { history } = renderWithRouterAndRedux(<App />);

  history.push('/meals/52977');
  waitFor(() => {
    const corba = screen.findByRole(
      'heading',
      { level: 1, name: /Corba/ },
    );
    expect(corba).toBeInTheDocument();

    const favoriteBtn = screen.findByTestId(/favorite-btn/);
    expect(favoriteBtn).toBeInTheDocument();
    userEvent.click(favoriteBtn);
    userEvent.click(favoriteBtn);
  });

  history.push('/favorite-recipes');
  waitFor(() => {
    const corba = screen.findByRole(
      'heading',
      { level: 1, name: /Corba/ },
    );
    expect(corba).toBeInTheDocument();

    const favoriteBtn = screen.findByTestId(/0-horizontal-favorite-btn/);
    expect(favoriteBtn).toBeInTheDocument();
    userEvent.click(favoriteBtn);
    expect(corba).not.toBeInTheDocument();
  });

  const favoriteRecipesMeals = [{
    id: '52771',
    type: 'meal',
    nationality: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
  }];
  localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipesMeals));

  waitFor(() => {
    const Spicy = screen.findByRole(
      'heading',
      { level: 1, name: /Spicy Arrabiata Penne/ },
    );
    expect(Spicy).toBeInTheDocument();
  });

  const favoriteRecipesdrink = [{
    id: '178319',
    type: 'drink',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
  }];
  localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipesdrink));
  waitFor(() => {
    const Aquamarine = screen.findByRole(
      'heading',
      { level: 1, name: /Aquamarine/ },
    );
    expect(Aquamarine).toBeInTheDocument();
  });
  const filterall = await screen.findByTestId(/filter-by-all-btn/);
  userEvent.click(filterall);

  const filterdrink = await screen.findByTestId(/filter-by-drink-btn/);
  userEvent.click(filterdrink);

  const filterMeals = await screen.findByTestId(/filter-by-meal-btn/);
  userEvent.click(filterMeals);

  userEvent.click(filterall);

  const imgdrink = await screen.findByTestId(/0-horizontal-image/);
  expect(imgdrink).toBeInTheDocument();

  const h3text1 = await screen.findByTestId(/0-horizontal-top-text/);
  expect(h3text1).toBeInTheDocument();
});
