import { RECIPE_DETAILS_API } from '../actions/RecipesDetailsAPI';

const INITIAL_STATE = {
  recipeDetails: {},
  // recipeDetail: {},
};

function renderRecipeDetails(state = INITIAL_STATE, action) {
  switch (action.type) {
  case RECIPE_DETAILS_API: return {
    ...state,
    recipeDetails: action.payload,
    // recipeDetail: action.payload.data,
  };
  default: return state;
  }
}

export default renderRecipeDetails;
