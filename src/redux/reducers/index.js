import { combineReducers } from 'redux';
import mainReducer from './mainReducer';
import detailsReducer from './detailsReducer';
import recipeFavorite from './recipes';

const rootReducer = combineReducers({
  mainReducer,
  detailsReducer,
  recipeFavorite,
});

export default rootReducer;
