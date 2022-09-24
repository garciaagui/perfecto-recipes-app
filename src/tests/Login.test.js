import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

const defaultEmail = 'test@test.com';
const defaultPassword = 'xxxxxxx';

it('Verifica a existência do botão de Login e dos inputs de E-mail e Senha', () => {
  renderWithRouterAndRedux(<App />, { initialEntries: ['/'] });

  expect(screen.getByTestId(/email-input/i)).toBeInTheDocument();
  expect(screen.getByTestId(/password-input/i)).toBeInTheDocument();
  expect(screen.getByTestId(/login-submit-btn/i)).toBeInTheDocument();
});

it('Testa a lógica de validação do botão de Login', () => {
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

it('Verifica se a página é redirecionada para "/meals" após clicar no botão de Login', () => {
  const { history } = renderWithRouterAndRedux(<App />, { initialEntries: ['/'] });

  userEvent.type(screen.getByTestId(/email-input/i), defaultEmail);
  userEvent.type(screen.getByTestId(/password-input/i), defaultPassword);
  userEvent.click(screen.getByTestId(/login-submit-btn/i));

  const { pathname } = history.location;
  expect(pathname).toBe('/meals');
});
