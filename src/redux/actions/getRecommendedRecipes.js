import { GET_RECOMMENDED_RECIPES } from './types';

function getRecommendedRecipes(history) {
  const { location: { pathname } } = history;
  const toSliceNum = 6;
  const fetchURL = (pathname.slice(0, toSliceNum) === '/meals') ? ('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
    : ('https://www.themealdb.com/api/json/v1/1/search.php?s=');

  return async (dispatch) => {
    const response = await fetch(fetchURL);
    const data = await response.json();
    dispatch({
      type: GET_RECOMMENDED_RECIPES,
      payload: {
        data,
      },
    });
  };
}

export default getRecommendedRecipes;
