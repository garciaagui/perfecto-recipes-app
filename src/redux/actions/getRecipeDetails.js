import { GET_RECIPE_DETAILS } from './types';

function filterIngredients(recipe) {
  const toSliceFilterNum = 13;
  return Object.entries(recipe)
    .filter((e) => e[0].slice(0, toSliceFilterNum) === 'strIngredient' && e[1])
    .map((e) => e[1]);
}

function filterIngredientsQuantity(recipe) {
  const toSliceFilterNum = 10;
  return Object.entries(recipe)
    .filter((e) => e[0].slice(0, toSliceFilterNum) === 'strMeasure' && e[1])
    .map((e) => e[1]);
}

export default function getRecipeDetails(pathname) {
  const type = (pathname.includes('meals')) ? 'meals' : 'drinks';
  let fetchURL;

  if (type === 'meals') {
    const toSliceNum = 7;
    fetchURL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${pathname.slice(toSliceNum)}`;
  } else {
    const toSliceNum = 8;
    fetchURL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${pathname.slice(toSliceNum)}`;
  }

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
