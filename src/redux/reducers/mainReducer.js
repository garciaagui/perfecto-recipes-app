import {
  GET_RECIPES,
  GET_RECIPES_BY_CATEGORY,
  GET_CATEGORIES,
  GET_RECOMMENDED_RECIPES } from '../actions/types';

const INITIAL_STATE = {
  recipes: false,
  categories: [],
  selectedCategory: '',
  recommendedRecipes: {},
};

function mainReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case GET_RECIPES: return {
    ...state,
    recipes: action.payload.data,
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
  case GET_RECOMMENDED_RECIPES: return {
    ...state,
    recommendedRecipes: action.payload.data,
  };
  default: return state;
  }
}

export default mainReducer;
