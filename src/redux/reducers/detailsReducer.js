import { GET_RECIPE_DETAILS } from '../actions/types';

const INITIAL_STATE = {
  recipeDetails: {},
  ingredientsList: [],
  ingredientsQuantity: [],
};

function detailsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case GET_RECIPE_DETAILS: return {
    ...state,
    recipeDetails: action.payload.recipeDetails,
    ingredientsList: action.payload.ingredientsList,
    ingredientsQuantity: action.payload.ingredientsQuantity,
  };
  default: return state;
  }
}

export default detailsReducer;
