import { combineReducers } from 'redux';
import renderRecipes from './searchedRecipes';

const rootReducer = combineReducers({
  renderRecipes,
});

export default rootReducer;
