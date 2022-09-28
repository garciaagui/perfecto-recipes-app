import { combineReducers } from 'redux';
import renderRecipes from './renderRecipes';
import renderCategories from './renderCategories';

const rootReducer = combineReducers({
  renderRecipes,
  renderCategories,
});

export default rootReducer;
