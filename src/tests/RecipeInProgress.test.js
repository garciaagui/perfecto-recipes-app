import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndRedux from '../helpers/renderWithRouterAndRedux';

const path = '/meals/52977/in-progress';

it('Verifica o conteúdo da tela de receita em progresso', async () => {
  renderWithRouterAndRedux(<App />, { initialEntries: [path] });

  await waitFor(() => {
    expect(screen.getByTestId(/recipe-title/i)).toBeInTheDocument();
    expect(screen.getByTestId(/recipe-category/i)).toBeInTheDocument();
    expect(screen.getByTestId(/recipe-photo/i)).toBeInTheDocument();
    expect(screen.getByTestId(/instructions/i)).toBeInTheDocument();
    expect(screen.getByTestId(/share-btn/i)).toBeInTheDocument();
    expect(screen.getByTestId(/favorite-btn/i)).toBeInTheDocument();
    expect(screen.getByTestId(/finish-recipe-btn/i)).toBeInTheDocument();
  });
});

it('Verifica a renderização da lista de ingredientes', async () => {
  renderWithRouterAndRedux(<App />, { initialEntries: [path] });

  await waitFor(() => {
    const ingredientsList = screen.getAllByTestId(/-ingredient-step/i);
    expect(ingredientsList).toHaveLength(13);
  }, { timeout: 5000 });
});

jest.setTimeout(10000);
it('Verifica se ao atualizar a página, os itens marcados anteriormente continuam marcados', async () => {
  const { history } = renderWithRouterAndRedux(<App />, { initialEntries: [path] });

  await waitFor(() => {
    const ingredientsList = screen.getAllByTestId(/-ingredient-step/i);
    ingredientsList.forEach((item) => {
      expect(item).toHaveClass('unchecked-ingredient');
      userEvent.click(item);
    });
  }, { timeout: 5000 });

  history.push('/meals/52977');
  history.push(path);

  await waitFor(() => {
    const ingredientsList = screen.getAllByTestId(/-ingredient-step/i);
    ingredientsList.forEach((item) => {
      expect(item).toHaveClass('checked-ingredient');
    });
  }, { timeout: 5000 });
});

it('Verifica se redireciona para a tela de Done Recipes ao clicar no botão de finalizar, quando habilitado', async () => {
  localStorage.clear();
  const { history } = renderWithRouterAndRedux(<App />, { initialEntries: [path] });

  await waitFor(() => {
    const finishBtn = screen.getByTestId(/finish-recipe-btn/i);
    expect(finishBtn).toBeDisabled();
    const ingredientsList = screen.getAllByTestId(/-ingredient-step/i);
    ingredientsList.forEach((item) => {
      userEvent.click(item);
    });
    expect(finishBtn).not.toBeDisabled();
    userEvent.click(finishBtn);
  }, { timeout: 5000 });

  await waitFor(() => {
    const { pathname } = history.location;
    expect(pathname).toBe('/done-recipes');
  });
});
