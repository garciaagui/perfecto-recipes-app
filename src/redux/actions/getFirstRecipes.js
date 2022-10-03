import { GET_RECIPES } from './types';
// import meals from '../../helpers/mocks copy/meals';

export default function getFirstRecipes(pathname) {
  const recipeDB = (pathname === '/meals') ? 'themealdb' : 'thecocktaildb';
  const fetchURL = `https://www.${recipeDB}.com/api/json/v1/1/search.php?s=`;
  const type = (pathname === '/meals') ? 'meals' : 'drinks';
  const LIMIT = 12;

  // return {
  //   type: GET_RECIPES,
  //   payload: meals.meals.slice(0, LIMIT),
  // };

  return async (dispatch) => {
    try {
      const response = await fetch(fetchURL);
      const data = await response.json();
      dispatch({
        type: GET_RECIPES,
        payload: data[type].slice(0, LIMIT),
      });
    } catch (e) {
      global.alert('error');
    }
  };
}
