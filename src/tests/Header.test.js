import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

const pageTitle = 'page-title';
const profileTopBtn = 'profile-top-btn';
const buttonSearch = 'buttonSearch';
const searchInput = 'search-input';

it('Verifica se na tela /meals existe o Header e o link que manda pra pagina do Profile', () => {
  const { history } = renderWithRouterAndRedux(<App />);
  history.push('/meals');

  expect(screen.getByTestId(pageTitle)).toBeInTheDocument();
  userEvent.click(screen.getByTestId(buttonSearch));
  waitFor(() => {
    expect(screen.getByTestId(searchInput)).toBeInTheDocument();
    userEvent.click(screen.getByTestId(buttonSearch));
    expect(screen.getByTestId(searchInput)).not.toBeInTheDocument();
  }, 1000);

  userEvent.click(screen.getByTestId(profileTopBtn));
  expect(screen.getByTestId(pageTitle)).toBeInTheDocument();
  expect(screen.getByText('Profile')).toBeInTheDocument();
});

it('Verifica se as demais telas renderizam o Header corretamente', () => {
  const { history } = renderWithRouterAndRedux(<App />);
  history.push('/drinks');

  expect(screen.getByTestId(pageTitle)).toBeInTheDocument();
  userEvent.click(screen.getByTestId(buttonSearch));
  waitFor(() => {
    expect(screen.getByTestId(searchInput)).toBeInTheDocument();
    expect(screen.getByTestId(buttonSearch)).toBeInTheDocument();
    userEvent.click(screen.getByTestId(buttonSearch));
    expect(screen.getByTestId(searchInput)).not.toBeInTheDocument();
  }, 1000);

  userEvent.click(screen.getByTestId(profileTopBtn));
  expect(screen.getByTestId(pageTitle)).toBeInTheDocument();
  expect(screen.getByText('Profile')).toBeInTheDocument();

  history.push('/done-recipes');

  expect(screen.getByTestId(pageTitle)).toBeInTheDocument();
  userEvent.click(screen.getByTestId(profileTopBtn));
  expect(screen.getByTestId(pageTitle)).toBeInTheDocument();
  expect(screen.getByText('Profile')).toBeInTheDocument();

  history.push('/favorite-recipes');

  expect(screen.getByTestId(pageTitle)).toBeInTheDocument();
  userEvent.click(screen.getByTestId(profileTopBtn));
  expect(screen.getByTestId(pageTitle)).toBeInTheDocument();
  expect(screen.getByText('Profile')).toBeInTheDocument();

  history.push('/notfound');

  expect(screen.getByText(/NotFound/i)).toBeInTheDocument();
});
