import { RECIPE_DETAILS_API } from '../actions/RecipesDetailsAPI';

const INITIAL_STATE = {
  recipeDetail: {},
};

function renderRecipeDetails(state = INITIAL_STATE, action) {
  switch (action.type) {
  case RECIPE_DETAILS_API: return {
    ...state,
    recipeDetail: action.payload.data,
  };
  default: return state;
  }
}

export default renderRecipeDetails;
