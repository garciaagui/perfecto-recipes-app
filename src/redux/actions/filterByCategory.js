import { GET_RECIPES_BY_CATEGORY } from './types';

export default function filterByCategory(pathname, category) {
  const recipeDB = (pathname === '/meals') ? 'themealdb' : 'thecocktaildb';
  const type = (pathname === '/meals') ? 'meals' : 'drinks';
  const fetchURL = `https://www.${recipeDB}.com/api/json/v1/1/filter.php?c=${category}`;
  const LIMIT = 12;

  return async (dispatch) => {
    try {
      const response = await fetch(fetchURL);
      const data = await response.json();
      // dispatch({
      //   type: GET_RECIPES_BY_CATEGORY,
      //   payload: {
      //     data,
      //     category,
      //   },
      // });
      dispatch({
        type: GET_RECIPES_BY_CATEGORY,
        payload: {
          data: data[type].slice(0, LIMIT),
          category,
        },
      });
    } catch (e) {
      global.alert('error');
    }
  };
}
