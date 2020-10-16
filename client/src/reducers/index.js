import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import cocktailReducer from './cocktailReducer'
import authReducer from './authReducer'
import errorReducer from './errorReducer'

export default combineReducers({
  cocktails: cocktailReducer,
  auth: authReducer,
  error: errorReducer,
  // for redux-form
  form: formReducer
});