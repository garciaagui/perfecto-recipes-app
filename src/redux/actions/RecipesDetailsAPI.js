export const RECIPE_DETAILS_API = 'RECIPE_DETAILS_API';

export function mountRecipeDetailsAPI(pathname) {
// export function mountRecipeDetailsAPI(pathname) {
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
    // dispatch({
    //   type: RECIPE_DETAILS_API,
    //   payload: {
    //     data,
    //   },
    // });
    dispatch({
      type: RECIPE_DETAILS_API,
      payload: data[type][0],
    });
  };
}
