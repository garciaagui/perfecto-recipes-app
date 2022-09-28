import { GET_RECIPES } from './types';

export default function getFirstRecipes(pathname) {
  const recipeDB = (pathname === '/meals') ? 'themealdb' : 'thecocktaildb';
  const fetchURL = `https://www.${recipeDB}.com/api/json/v1/1/search.php?s=`;

  return async (dispatch) => {
    try {
      const response = await fetch(fetchURL);
      const data = await response.json();
      dispatch({
        type: GET_RECIPES,
        payload: {
          data,
        },
      });
    } catch (e) {
      global.alert('error');
    }
  };
}
