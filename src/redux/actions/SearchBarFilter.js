export const SEARCH_FILTER = 'SEARCH_FILTER';
export const OTHER = 'SEARCH_FILTE';

export function filterSearchBar(state) {
  const { searchInput, searchFilter } = state;

  if (searchFilter === 'ingredient') {
    return async (dispatch) => {
      const fetchURL = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInput}`;
      const response = await fetch(fetchURL);
      const data = await response.json();
      console.log(data);
      dispatch({
        type: SEARCH_FILTER,
        payload: {
          data,
        },
      });
    };
  }
  if (searchFilter === 'name-search') {
    return async (dispatch) => {
      const fetchURL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`;
      const response = await fetch(fetchURL);
      const data = await response.json();
      console.log(data);
      dispatch({
        type: SEARCH_FILTER,
        payload: {
          data,
        },
      });
    };
  }
  if (searchFilter === 'first-letter-search') {
    if (searchInput.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    }
    return async (dispatch) => {
      const fetchURL = `https://www.themealdb.com/api/json/v1/1/search.php?f=${searchInput}`;
      const response = await fetch(fetchURL);
      const data = await response.json();
      console.log(data);
      dispatch({
        type: SEARCH_FILTER,
        payload: {
          data,
        },
      });
    };
  }
}
