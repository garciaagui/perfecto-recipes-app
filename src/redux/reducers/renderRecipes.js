import { GET_RECIPES } from '../actions/types';

const INITIAL_STATE = {
  recipes: false,
};

function renderRecipes(state = INITIAL_STATE, action) {
  switch (action.type) {
  case GET_RECIPES: return {
    ...state,
    recipes: action.payload.data,
  };
  default: return state;
  }
}

export default renderRecipes;
