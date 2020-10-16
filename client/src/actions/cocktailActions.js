import axios from 'axios';

import { CREATE_COCKTAIL, FETCH_COCKTAILS, FETCH_COCKTAIL, DELETE_COCKTAIL, EDIT_COCKTAIL, LOADING_COCKTAILS, FAIL_FETCH_COCKTAILS } from './types'
import history from '../history';
import { tokenConfig } from './config';

// thunk allows us to write action creators that return a function instead of an action
// can be used to delay the dispatch of an action, or to dispatch only if a certain condition is met
export const fetchCocktails = () => async (dispatch, getState) => {
  try {
    dispatch({ type: LOADING_COCKTAILS })
    const response = await axios.get('/api', tokenConfig(getState));
    await dispatch({ type: FETCH_COCKTAILS, payload: response.data })
  } catch (err) {
    dispatch({ type: FAIL_FETCH_COCKTAILS })
    console.log(err)
  }
};

export const fetchCocktail = (id) => async (dispatch, getState) => {
  try {
    const response = await axios.get(`/api/${id}`, tokenConfig(getState));

    dispatch({ type: FETCH_COCKTAIL, payload: response.data });
  } catch (err) {
    console.log(err)
  }
}

export const editCocktail = (id, formValues) => async (dispatch, getState) => {
  try {
    const response = await axios.patch(`/api/${id}`, formValues, tokenConfig(getState));

    dispatch({ type: EDIT_COCKTAIL, payload: response.data });
    history.push('/cocktails');
  } catch (err) {
    console.log(err)
  }
}

export const createCocktail = cocktail => async (dispatch, getState) => {
  try {
    const response = await axios({
      ...tokenConfig(getState),
      method: 'post',
      url: '/api',
      data: cocktail
    });
    console.log(response)
    dispatch({ type: CREATE_COCKTAIL, payload: response.data });
    // we use push to navigate to somewhere with router
    history.push('/cocktails');
  } catch (err) {
    console.log(err)
  }

};

export const deleteCocktail = (id) => async (dispatch, getState) => {
  try {
    await axios.delete(`/api/${id}`, tokenConfig(getState));
    dispatch({ type: DELETE_COCKTAIL, payload: id });
    // history.push('/'); 
  } catch (err) {
    console.log(err)
  }
};