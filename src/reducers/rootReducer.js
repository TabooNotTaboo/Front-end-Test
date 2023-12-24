import { combineReducers } from 'redux';
import internReducer from '../actions/internReducer';
import exerciseReducer from './exerciseReducer';
const rootReducer = combineReducers({
  intern: internReducer,
   exercise: exerciseReducer,
});

export default rootReducer;
