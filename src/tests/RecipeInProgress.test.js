import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndRedux from '../helpers/renderWithRouterAndRedux';
// import { setNewDoneRecipe } from '../helpers/supportFunctions';

const path = '/meals/52977/in-progress';

jest.setTimeout(20000);
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
  }, { timeout: 10000 });
});

it('Verifica se ao atualizar a página, os itens marcados anteriormente continuam marcados', async () => {
  const { history } = renderWithRouterAndRedux(<App />, { initialEntries: [path] });

  await waitFor(() => {
    const ingredientsList = screen.getAllByTestId(/-ingredient-step/i);
    ingredientsList.forEach((item) => {
      expect(item).toHaveClass('unchecked-ingredient');
      userEvent.click(item);
    });
  }, { timeout: 10000 });

  history.push('/meals/52977');
  history.push(path);

  await waitFor(() => {
    const ingredientsList = screen.getAllByTestId(/-ingredient-step/i);
    ingredientsList.forEach((item) => {
      expect(item).toHaveClass('checked-ingredient');
    });
  }, { timeout: 10000 });
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
  }, { timeout: 10000 });

  await waitFor(() => {
    const { pathname } = history.location;
    expect(pathname).toBe('/done-recipes');
  });
});

it('Verifica se uma receita concluída é devidamente adicionada no Local Storage', async () => {
  localStorage.removeItem('doneRecipes');
  renderWithRouterAndRedux(<App />, { initialEntries: ['/meals/52771/in-progress'] });
  await waitFor(() => {
    const ingredientsList = screen.getAllByTestId(/-ingredient-step/i);
    expect(ingredientsList).toHaveLength(8);

    ingredientsList.forEach((ingredient) => {
      userEvent.click(ingredient);
    });

    const finishBtn = screen.getByTestId(/finish-recipe-btn/i);
    expect(finishBtn).not.toBeDisabled();
    userEvent.click(finishBtn);
  }, { timeout: 10000 });

  await waitFor(() => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    expect(screen.getByTestId(/-horizontal-name/i)).toHaveTextContent(doneRecipes[0].name);
  }, { timeout: 10000 });
});
