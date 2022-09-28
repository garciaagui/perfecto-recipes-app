export const RECIPE_DETAILS_API = 'RECIPE_DETAILS_API';

export function mountRecipeDetailsAPI(history) {
  const { location: { pathname } } = history;
  let fetchURL;

  if (pathname[1] === 'm') {
    const toSliceNum = 7;
    fetchURL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${pathname.slice(toSliceNum)}`;
  } else {
    const toSliceNum = 8;
    fetchURL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${pathname.slice(toSliceNum)}`;
  }

  return async (dispatch) => {
    const response = await fetch(fetchURL);
    const data = await response.json();
    dispatch({
      type: RECIPE_DETAILS_API,
      payload: {
        data,
      },
    });
  };
}
