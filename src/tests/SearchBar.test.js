import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndRedux from '../helpers/renderWithRouterAndRedux';

const searchTopBtn = 'search-top-btn';
const searchInputStr = 'search-input';
const ingredientSearchRadioStr = 'ingredient-search-radio';
const nameSearchRadio = 'name-search-radio';
const execSearchBtn = 'exec-search-btn';
const firstLetterSearchRadio = 'first-letter-search-radio';

it('Verifica se na tela meals o search bar funciona corretamente', async () => {
  const { history } = renderWithRouterAndRedux(<App />);
  history.push('/meals');

  expect(screen.getByTestId(searchTopBtn)).toBeInTheDocument();
  userEvent.click(screen.getByTestId(searchTopBtn));
  await waitFor(() => {
    expect(screen.getByTestId(searchInputStr)).toBeInTheDocument();
    expect(screen.getByTestId(ingredientSearchRadioStr)).toBeInTheDocument();
    expect(screen.getByTestId(nameSearchRadio)).toBeInTheDocument();
    expect(screen.getByTestId(firstLetterSearchRadio)).toBeInTheDocument();
    expect(screen.getByTestId(execSearchBtn)).toBeInTheDocument();
  });

  const buttonSearch = screen.getByTestId(execSearchBtn);
  const searchInput = screen.getByTestId(searchInputStr);
  const ingredientRadio = screen.getByTestId(ingredientSearchRadioStr);
  const nameFilterRadio = screen.getByTestId(nameSearchRadio);

  userEvent.type(searchInput, 'orange');
  userEvent.click(ingredientRadio);
  userEvent.click(buttonSearch);
  await waitFor(() => {
    expect(screen.getAllByTestId(/-card-img/i)).toHaveLength(8);
    expect(screen.getAllByRole('heading', { level: 2 })).toHaveLength(8);
  });

  userEvent.click(nameFilterRadio);
  userEvent.click(buttonSearch);

  await waitFor(() => {
    expect(screen.getByText(/RecipeDetails/i)).toBeInTheDocument();
  });
});

it('Verifica se na tela drinks o search bar funciona corretamente', async () => {
  const { history } = renderWithRouterAndRedux(<App />);
  history.push('/drinks');

  expect(screen.getByTestId(searchTopBtn)).toBeInTheDocument();
  userEvent.click(screen.getByTestId(searchTopBtn));
  waitFor(() => {
    expect(screen.findByTestId(searchInputStr)).toBeInTheDocument();
    expect(screen.findByTestId(ingredientSearchRadioStr)).toBeInTheDocument();
    expect(screen.findByTestId(nameSearchRadio)).toBeInTheDocument();
    expect(screen.findByTestId(firstLetterSearchRadio)).toBeInTheDocument();
  }, 1000);

  const buttonSearch = screen.getByTestId(execSearchBtn);
  const searchInput = screen.getByTestId(searchInputStr);
  const ingredientRadio = screen.getByTestId(ingredientSearchRadioStr);

  userEvent.type(searchInput, 'whisky');
  userEvent.click(ingredientRadio);
  userEvent.click(buttonSearch);
  expect(await screen.findByText(/RecipeDetails/i)).toBeInTheDocument();
});
