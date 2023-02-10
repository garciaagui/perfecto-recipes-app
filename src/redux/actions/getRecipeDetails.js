import { GET_RECIPE_DETAILS } from './types';

function filterIngredients(recipe) {
  const toSliceFilterNum = 13;
  return Object.entries(recipe)
    .filter((e) => e[0]
      .slice(0, toSliceFilterNum) === 'strIngredient' && e[1] !== ' ' && e[1])
    .map((e) => e[1]);
}

function filterIngredientsQuantity(recipe) {
  const toSliceFilterNum = 10;
  return Object.entries(recipe)
    .filter((e) => e[0]
      .slice(0, toSliceFilterNum) === 'strMeasure' && e[1] !== ' ' && e[1])
    .map((e) => e[1]);
}

export default function getRecipeDetails(pathname, id) {
  const type = (pathname.includes('meals')) ? 'meals' : 'drinks';
  const recipeDB = (pathname.includes('meals')) ? 'themealdb' : 'thecocktaildb';
  const fetchURL = `https://www.${recipeDB}.com/api/json/v1/1/lookup.php?i=${id}`;

  return async (dispatch) => {
    const response = await fetch(fetchURL);
    const data = await response.json();
    const recipeDetails = data[type][0];
    dispatch({
      type: GET_RECIPE_DETAILS,
      payload: {
        recipeDetails,
        ingredientsList: filterIngredients(recipeDetails),
        ingredientsQuantity: filterIngredientsQuantity(recipeDetails),
      },
    });
  };
}
