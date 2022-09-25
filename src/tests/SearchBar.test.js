import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

const buttonSearch = screen.findByTestId('exec-search-btn');

it('Verifica se na tela meals o search bar funciona corretamente', () => {
  const { history } = renderWithRouterAndRedux(<App />);
  history.push('/meals');

  expect(screen.getByTestId('search-top-btn')).toBeInTheDocument();
  userEvent.click(screen.getByTestId('search-top-btn'));
  waitFor(() => {
    expect(screen.findByTestId('search-input')).toBeInTheDocument();
    expect(screen.findByTestId('ingredient-search-radio')).toBeInTheDocument();
    expect(screen.findByTestId('name-search-radio')).toBeInTheDocument();
    expect(screen.findByTestId('first-letter-search-radio')).toBeInTheDocument();
    expect(buttonSearch).toBeInTheDocument();

    userEvent.type(screen.findByTestId('search-input'), 'onion');
    userEvent.click(screen.findByTestId('ingredient-search-radio'));
    userEvent.click(buttonSearch);

    userEvent.click(screen.findByTestId('name-search-radio'));
    userEvent.click(buttonSearch);

    userEvent.click(screen.findByTestId('first-letter-search-radio'));
    userEvent.click(buttonSearch);
  }, 1000);
});
