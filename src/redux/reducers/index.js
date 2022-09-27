import { combineReducers } from 'redux';
import renderRecipes from './searchedRecipes';
import renderRecipeDetails from './RecipeDetailsData';

const rootReducer = combineReducers({
  renderRecipes,
  renderRecipeDetails,
});

export default rootReducer;
