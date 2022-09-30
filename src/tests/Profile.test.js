import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndRedux from '../helpers/renderWithRouterAndRedux';

it('reliza login e push a profile', async () => {
  const { history } = renderWithRouterAndRedux(<App />);

  const emailInput = screen.getByTestId(/email-input/i);
  const passwordInput = screen.getByTestId(/password-input/i);
  const submitButton = screen.getByTestId(/login-submit-btn/i);

  userEvent.type(emailInput, 'grupo14@grupo14.com');
  userEvent.type(passwordInput, 'grupo14react');
  userEvent.click(submitButton);

  const buttonProfile = screen.getByTestId('profile-top-btn');
  userEvent.click(buttonProfile);

  const email = screen.getByRole(
    'heading',
    { level: 3, name: /grupo14@grupo14.com/ },
  );
  expect(email).toBeInTheDocument();

  const doneRecipes = screen.getByTestId(/profile-done-btn/i);
  expect(doneRecipes).toBeInTheDocument();

  userEvent.click(doneRecipes);

  const doneRecipesH1 = screen.getByRole(
    'heading',
    { level: 1, name: /Done Recipes/ },
  );
  expect(doneRecipesH1).toBeInTheDocument();

  history.push('/profile');

  const favoriteRecipes = screen.getByTestId(/profile-favorite-btn/i);
  expect(favoriteRecipes).toBeInTheDocument();

  userEvent.click(favoriteRecipes);

  const favoriteRecipesH1 = screen.getByRole(
    'heading',
    { level: 1, name: /Favorite Recipes/ },
  );
  expect(favoriteRecipesH1).toBeInTheDocument();

  history.push('/profile');

  const logout = screen.getByTestId(/profile-logout-btn/i);
  expect(logout).toBeInTheDocument();

  userEvent.click(logout);

  const login = screen.getByRole(
    'heading',
    { level: 2, name: /Login/ },
  );
  expect(login).toBeInTheDocument();
});
