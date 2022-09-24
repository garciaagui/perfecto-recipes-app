import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

const defaultEmail = 'test@test.com';
const defaultPassword = 'xxxxxxx';

it('Verifica a existência dos inputs e do button', () => {
  renderWithRouterAndRedux(<App />, { initialEntries: ['/'] });

  expect(screen.getByTestId(/email-input/i)).toBeInTheDocument();
  expect(screen.getByTestId(/password-input/i)).toBeInTheDocument();
  expect(screen.getByTestId(/login-submit-btn/i)).toBeInTheDocument();
});

it('Testa a lógica de validação do button', () => {
  renderWithRouterAndRedux(<App />, { initialEntries: ['/'] });

  const emailInput = screen.getByTestId(/email-input/i);
  const passwordInput = screen.getByTestId(/password-input/i);
  const submitButton = screen.getByTestId(/login-submit-btn/i);

  userEvent.type(emailInput, 'test');
  userEvent.type(passwordInput, 'xxx');
  expect(submitButton).toBeDisabled();

  userEvent.type(emailInput, defaultEmail);
  expect(submitButton).toBeDisabled();

  userEvent.type(passwordInput, defaultPassword);
  expect(submitButton).not.toBeDisabled();
});
