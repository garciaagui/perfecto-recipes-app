import { combineReducers } from 'redux';
import mainReducer from './mainReducer';
import renderRecipeDetails from './renderRecipeDetails';

const rootReducer = combineReducers({
  mainReducer,
  renderRecipeDetails,
});

export default rootReducer;
