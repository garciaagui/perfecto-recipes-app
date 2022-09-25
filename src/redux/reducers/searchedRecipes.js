import { SEARCH_FILTER } from '../actions/SearchBarFilter';

const INITIAL_STATE = {
  recipes: [],
};

function renderRecipes(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SEARCH_FILTER: return {
    ...state,
    recipes: [action.payload.data],
  };
  default: return state;
  }
}

export default renderRecipes;
