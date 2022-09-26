import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

it('Verifica a renderização e lógica dos ícones do Footer', () => {
  const { history } = renderWithRouterAndRedux(<App />, { initialEntries: ['/meals'] });

  expect(screen.getByTestId(/meals-bottom-btn/i)).toBeInTheDocument();
  userEvent.click(screen.getByTestId(/drinks-bottom-btn/i));

  expect(history.location.pathname).toBe('/drinks');

  expect(screen.getByTestId(/drinks-bottom-btn/i)).toBeInTheDocument();
  userEvent.click(screen.getByTestId(/meals-bottom-btn/i));

  expect(history.location.pathname).toBe('/meals');
});

it('Verifica se o Footer é renderizado somente nas páginas corretas', () => {
  const { history } = renderWithRouterAndRedux(<App />, { initialEntries: ['/meals'] });

  expect(screen.getByTestId(/footer/i)).toBeInTheDocument();

  history.push('/drinks');
  expect(screen.getByTestId(/footer/i)).toBeInTheDocument();

  history.push('/profile');
  expect(screen.getByTestId(/footer/i)).toBeInTheDocument('');
});
