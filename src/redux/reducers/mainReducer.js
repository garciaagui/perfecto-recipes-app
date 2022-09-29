import { GET_RECIPES,
  GET_RECIPES_BY_CATEGORY,
  GET_CATEGORIES } from '../actions/types';

const INITIAL_STATE = {
  // recipes: false,
  recipes: [],
  categories: [],
  selectedCategory: '',
};

function mainReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case GET_RECIPES: return {
    ...state,
    // recipes: action.payload.data,
    recipes: action.payload,
    selectedCategory: '',
  };
  case GET_RECIPES_BY_CATEGORY: return {
    ...state,
    recipes: action.payload.data,
    selectedCategory: action.payload.category,
  };
  case GET_CATEGORIES: return {
    ...state,
    categories: action.payload,
  };
  default: return state;
  }
}

export default mainReducer;
