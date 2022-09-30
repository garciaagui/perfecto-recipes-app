import { GET_RECOMMENDED_RECIPES } from './types';

function getRecommendedRecipes(pathname) {
  const recipeDB = (pathname.includes('meals')) ? 'thecocktaildb' : 'themealdb';
  const fetchURL = `https://www.${recipeDB}.com/api/json/v1/1/search.php?s=`;
  const type = (pathname.includes('meals')) ? 'drinks' : 'meals';

  const LIMIT = 6;

  return async (dispatch) => {
    const response = await fetch(fetchURL);
    const data = await response.json();
    dispatch({
      type: GET_RECOMMENDED_RECIPES,
      payload: data[type].slice(0, LIMIT),
    });
  };
}

export default getRecommendedRecipes;
