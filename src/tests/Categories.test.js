import React from 'react';
import { screen, waitFor } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';

import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

it('Verifica se 05 buttons são renderizados', async () => {
  renderWithRouterAndRedux(<App />, { initialEntries: ['/meals'] });

  await waitFor(() => {
    const categoriesBtns = screen.getAllByTestId(/-category-filter/i);
    expect(categoriesBtns).toHaveLength(5);
  });
});
