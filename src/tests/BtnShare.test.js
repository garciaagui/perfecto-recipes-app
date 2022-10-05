import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndRedux from '../helpers/renderWithRouterAndRedux';

jest.setTimeout(20000);
it('Testa botão de favorite', async () => {
  const mockClipboard = {
    writeText: jest.fn(),
  };
  global.navigator.clipboard = mockClipboard;

  const { history } = renderWithRouterAndRedux(<App />);

  history.push('/meals/52977');
  await waitFor(() => {
    const corba = screen.getByRole(
      'heading',
      { level: 1, name: /Corba/ },
    );
    expect(corba).toBeInTheDocument();

    const shareBtn = screen.getByTestId(/share-btn/i);
    expect(shareBtn).toBeInTheDocument();
    userEvent.click(shareBtn);

    const { pathname } = history.location;
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(`http://localhost:3000${pathname}`);
  }, { timeout: 10000 });
});
