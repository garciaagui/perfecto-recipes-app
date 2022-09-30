import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndRedux from '../helpers/renderWithRouterAndRedux';

it('Testa botão de favorite', async () => {
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
});
