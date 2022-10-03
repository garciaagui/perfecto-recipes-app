import { SET_RECIPE_FAVORITE } from '../actions/types';

const INITIAL_STATE = {
  favoriteRecipes: [],
};

function recipeFavorite(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SET_RECIPE_FAVORITE: return {
    ...state,
    favoriteRecipes: action.payload,
  };
  default: return state;
  }
}

export default recipeFavorite;
