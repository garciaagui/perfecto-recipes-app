import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';
import renderWithRouterAndRedux from '../helpers/renderWithRouterAndRedux';
import mockMealsFirstRecipes from '../helpers/mocks/mockMealsFirstRecipes';
import mockMealsCategoryBeef from '../helpers/mocks/mockMealsCategoryBeef';
import mockDrinksFirstRecipes from '../helpers/mocks/mockDrinksFirstRecipes';
import mockDrinksCategoryShake from '../helpers/mocks/mockDrinksCategoryShake';

it('Verifica se 06 buttons são renderizados', async () => {
  renderWithRouterAndRedux(<App />, { initialEntries: ['/meals'] });

  await waitFor(() => {
    const categoriesBtns = screen.getAllByTestId(/-category-filter/i);
    expect(categoriesBtns).toHaveLength(6);
  });
});

it('Verifica se o filtro funciona corretamente quando um dos buttons de categoria é clicado', async () => {
  renderWithRouterAndRedux(<App />, { initialEntries: ['/meals'] });

  await waitFor(() => {
    const beefCategoryBtn = screen.getByRole('button', { name: 'Beef' });
    userEvent.click(beefCategoryBtn);
  });

  await waitFor(() => {
    const recipesRendered = screen.getAllByTestId(/-recipe-card/i);
    const recipesMocked = mockMealsCategoryBeef.meals.slice(0, 12);

    expect(recipesRendered).toHaveLength(12);
    recipesRendered.forEach((recipe, index) => {
      expect(recipe).toHaveTextContent(recipesMocked[index].strMeal);
    });

    userEvent.click(screen.getByTestId(/drinks-bottom-btn/i));
  });

  await waitFor(() => {
    const shakeCategoryBtn = screen.getByRole('button', { name: 'Shake' });
    userEvent.click(shakeCategoryBtn);
  });

  await waitFor(() => {
    const recipesRendered = screen.getAllByTestId(/-recipe-card/i);
    const recipesMocked = mockDrinksCategoryShake.drinks.slice(0, 12);

    expect(recipesRendered).toHaveLength(12);
    recipesRendered.forEach((recipe, index) => {
      expect(recipe).toHaveTextContent(recipesMocked[index].strDrink);
    });
  });
});

it('Verifica se o button "All" retorna as 12 primeiras receitas', async () => {
  renderWithRouterAndRedux(<App />, { initialEntries: ['/meals'] });

  await waitFor(() => {
    const beefCategoryBtn = screen.getByRole('button', { name: 'Beef' });
    userEvent.click(beefCategoryBtn);
  });

  await waitFor(() => {
    const recipesRendered = screen.getAllByTestId(/-recipe-card/i);
    const recipesMocked = mockMealsCategoryBeef.meals.slice(0, 12);

    expect(recipesRendered).toHaveLength(12);
    recipesRendered.forEach((recipe, index) => {
      expect(recipe).toHaveTextContent(recipesMocked[index].strMeal);
    });

    const allBtn = screen.getByRole('button', { name: 'All' });
    userEvent.click(allBtn);
  });

  await waitFor(() => {
    const recipesRendered = screen.getAllByTestId(/-recipe-card/i);
    const recipesMocked = mockMealsFirstRecipes.meals.slice(0, 12);

    expect(recipesRendered).toHaveLength(12);
    recipesRendered.forEach((recipe, index) => {
      expect(recipe).toHaveTextContent(recipesMocked[index].strMeal);
    });
  });
});

it('Verifica se retorna as 12 primeiras receitas quando o mesmo button é clicado duas vezes', async () => {
  renderWithRouterAndRedux(<App />, { initialEntries: ['/drinks'] });

  await waitFor(() => {
    const shakeCategoryBtn = screen.getByRole('button', { name: 'Shake' });
    userEvent.click(shakeCategoryBtn);
  });

  await waitFor(() => {
    const recipesRendered = screen.getAllByTestId(/-recipe-card/i);
    const recipesMocked = mockDrinksCategoryShake.drinks.slice(0, 12);

    expect(recipesRendered).toHaveLength(12);
    recipesRendered.forEach((recipe, index) => {
      expect(recipe).toHaveTextContent(recipesMocked[index].strDrink);
    });

    const shakeCategoryBtn = screen.getByRole('button', { name: 'Shake' });
    userEvent.click(shakeCategoryBtn);
  });

  await waitFor(() => {
    const recipesRendered = screen.getAllByTestId(/-recipe-card/i);
    const recipesMocked = mockDrinksFirstRecipes.drinks.slice(0, 12);

    expect(recipesRendered).toHaveLength(12);
    recipesRendered.forEach((recipe, index) => {
      expect(recipe).toHaveTextContent(recipesMocked[index].strDrink);
    });
  });
});
