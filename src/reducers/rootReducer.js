import { combineReducers } from 'redux';
import internReducer from '../actions/internReducer';

const rootReducer = combineReducers({
  intern: internReducer,
});

export default rootReducer;
