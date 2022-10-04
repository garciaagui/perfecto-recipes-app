import { GET_CATEGORIES } from './types';
// import mealCategories from '../../helpers/mocks copy/mealCategories';

export default function getCategories(pathname) {
  const recipeDB = (pathname === '/meals') ? 'themealdb' : 'thecocktaildb';
  const type = (pathname === '/meals') ? 'meals' : 'drinks';
  const fetchURL = `https://www.${recipeDB}.com/api/json/v1/1/list.php?c=list`;
  const LIMIT = 5;

  // return {
  //   type: GET_CATEGORIES,
  //   payload: mealCategories.meals.slice(0, LIMIT),
  // };
  return async (dispatch) => {
    try {
      const response = await fetch(fetchURL);
      const data = await response.json();
      dispatch({
        type: GET_CATEGORIES,
        payload: data[type].slice(0, LIMIT),
      });
    } catch (e) {
      global.alert('Error: Categories not found');
    }
  };
}
