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
  renderWithRouterAndRedux(<App />, { initialEntries: ['/meals'] });

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
    expect(screen.getByTestId(/recipe-title/i)).toHaveTextContent('Tunisian Orange Cake');
  });
});

it('Verifica se na tela drinks o search bar funciona corretamente', async () => {
  renderWithRouterAndRedux(<App />, { initialEntries: ['/drinks'] });

  expect(screen.getByTestId(searchTopBtn)).toBeInTheDocument();
  userEvent.click(screen.getByTestId(searchTopBtn));

  await waitFor(() => {
    expect(screen.getByTestId(searchInputStr)).toBeInTheDocument();
    expect(screen.getByTestId(ingredientSearchRadioStr)).toBeInTheDocument();
    expect(screen.getByTestId(nameSearchRadio)).toBeInTheDocument();
    expect(screen.getByTestId(firstLetterSearchRadio)).toBeInTheDocument();
  }, 1000);

  const buttonSearch = screen.getByTestId(execSearchBtn);
  const searchInput = screen.getByTestId(searchInputStr);
  const ingredientRadio = screen.getByTestId(ingredientSearchRadioStr);

  userEvent.type(searchInput, 'whisky');
  userEvent.click(ingredientRadio);
  userEvent.click(buttonSearch);

  await waitFor(() => {
    expect(screen.getByTestId(/recipe-title/i)).toBeInTheDocument();
  });
});
