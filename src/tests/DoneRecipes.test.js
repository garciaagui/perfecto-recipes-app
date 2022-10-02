import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndRedux from '../helpers/renderWithRouterAndRedux';

it('Verifica se a tela Done Recipes renderiza corretamente', async () => {
  const { history } = renderWithRouterAndRedux(<App />);
  const doneRecipeURL = '/done-recipes';

  localStorage.setItem('doneRecipes', JSON.stringify([{
    id: '52882',
    type: 'meal',
    nationality: 'nacionalidade-da-receita-ou-texto-vazio',
    category: 'categoria-da-receita-ou-texto-vazio',
    alcoholicOrNot: 'alcoholic-ou-non-alcoholic-ou-texto-vazio',
    name: 'nome-da-receita',
    image: 'imagem-da-receita',
    doneDate: 'quando-a-receita-foi-concluida',
    tags: ['tag1'] }, {
    id: '17256',
    type: 'drink',
    nationality: 'nacionalidade-da-receita-ou-texto-vazio',
    category: 'categoria-da-receita-ou-texto-vazio',
    alcoholicOrNot: 'alcoholic-ou-non-alcoholic-ou-texto-vazio',
    name: 'nome-da-receita',
    image: 'imagem-da-receita',
    doneDate: 'quando-a-receita-foi-concluida',
    tags: ['tag1'] }]));

  history.push(doneRecipeURL);

  expect(screen.getByTestId('page-title')).toBeInTheDocument();
  expect(screen.getAllByRole('link')).toHaveLength(3);
  userEvent.click(screen.getByTestId('profile-top-btn'));

  await waitFor(() => {
    expect(history.location.pathname).toBe('/profile');
    expect(screen.getByTestId('page-title')).toBeInTheDocument();
    history.push(doneRecipeURL);
    expect(history.location.pathname).toBe(doneRecipeURL);
  });

  expect(screen.getByTestId('filter-by-meal-btn')).toBeInTheDocument();
  userEvent.click(screen.getByTestId('filter-by-meal-btn'));

  await waitFor(() => {
    expect(screen.getAllByRole('link')).toHaveLength(2);
  });

  expect(screen.getByTestId('filter-by-drink-btn')).toBeInTheDocument();
  userEvent.click(screen.getByTestId('filter-by-drink-btn'));

  await waitFor(() => {
    expect(screen.getAllByRole('link')).toHaveLength(2);
  });

  expect(screen.getByTestId('filter-by-all-btn')).toBeInTheDocument();
  userEvent.click(screen.getByTestId('filter-by-all-btn'));

  await waitFor(() => {
    expect(screen.getAllByRole('link')).toHaveLength(3);
  });

  expect(screen.getByTestId('0-horizontal-image')).toBeInTheDocument();
  userEvent.click(screen.getByTestId('0-horizontal-image'));

  await waitFor(() => {
    expect(history.location.pathname).toBe('/meals/52882');
    expect(screen.getByTestId('recipe-photo')).toBeInTheDocument();
    history.push(doneRecipeURL);
    expect(history.location.pathname).toBe(doneRecipeURL);
  });

  expect(screen.getByTestId('1-horizontal-image')).toBeInTheDocument();
  userEvent.click(screen.getByTestId('1-horizontal-image'));

  await waitFor(() => {
    expect(history.location.pathname).toBe('/drinks/17256');
    expect(screen.getByTestId('recipe-photo')).toBeInTheDocument();
    history.push(doneRecipeURL);
    expect(history.location.pathname).toBe(doneRecipeURL);
  });

  expect(screen.getByTestId('0-horizontal-share-btn')).toBeInTheDocument();
  userEvent.click(screen.getByTestId('0-horizontal-share-btn'));
  expect(screen.getByText(/Done Recipes/i)).toBeInTheDocument();
  /* await waitFor(() => {
    expect(screen.getByText('Link copied!')).toBeInTheDocument();
  }); */

  /* await waitFor(() => {
  }); */
});
