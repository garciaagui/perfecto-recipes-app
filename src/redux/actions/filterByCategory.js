import { GET_RECIPES_BY_CATEGORY } from './types';

export default function filterByCategory(pathname, filter) {
  const recipeDB = (pathname === '/meals') ? 'themealdb' : 'thecocktaildb';
  const fetchURL = `https://www.${recipeDB}.com/api/json/v1/1/filter.php?c=${filter}`;

  return async (dispatch) => {
    try {
      const response = await fetch(fetchURL);
      const data = await response.json();
      dispatch({
        type: GET_RECIPES_BY_CATEGORY,
        payload: {
          data,
        },
      });
    } catch (e) {
      global.alert('error');
    }
  };
}
