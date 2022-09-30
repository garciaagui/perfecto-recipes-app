import { combineReducers } from 'redux';
import mainReducer from './mainReducer';
import detailsReducer from './detailsReducer';

const rootReducer = combineReducers({
  mainReducer,
  detailsReducer,
});

export default rootReducer;
