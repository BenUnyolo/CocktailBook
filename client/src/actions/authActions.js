import axios from 'axios';
import { returnErrors } from '.';
import { tokenConfig, headerConfig } from './config';

import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  CLEAR_COCKTAILS,
  DELETE_COCKTAILS
} from './types';

import history from '../history';

export const loadUser = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_LOADING });

    const response = await axios.get('/api/users/user', tokenConfig(getState));

    dispatch({ type: USER_LOADED, payload: response.data })
  } catch (err) {
    // here we are dispatching the action returned from the action creator function
    dispatch(returnErrors(err.response.data, err.response.status))
    // this will put any returned errors into state through AUTH_ERROR action
    dispatch({ type: AUTH_ERROR });

    history.push('/login')
  }
}

export const register = ( user ) => async dispatch => {
  try {
    const response = await axios.post('/api/users/register', user, headerConfig);

    dispatch({type: REGISTER_SUCCESS, payload: response.data});

    history.push('/cocktails')
  } catch (err) {
    console.log(err)
      // adding ID of register fail at the end for error checking in register component
      dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'))
      dispatch({
        type: REGISTER_FAIL
      });
  }
}

export const login = ( user ) => async dispatch => {
    try {
      const response = await axios.post('/api/users/login', user, headerConfig);

      dispatch({ type: LOGIN_SUCCESS, payload: response.data })

      history.push('/cocktails')
    } catch (err) {
      dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'))
      dispatch({ type: LOGIN_FAIL });
    }
}

export const logout = () => dispatch => {
  dispatch({ type: CLEAR_COCKTAILS });
  dispatch({ type: LOGOUT_SUCCESS });
  history.push('/');
};

export const deleteUser = () => async (dispatch, getState) => {
  try {
    // setting up header with token
    const authConfig = tokenConfig(getState);
    
    // send request to delete all cocktails
    await axios.delete(`/api/`, authConfig);
    dispatch({ type: DELETE_COCKTAILS });

    // send request to delete user
    await axios.delete(`/api/users/user`, authConfig);
    dispatch({ type: LOGOUT_SUCCESS });

    window.confirm(`Account successfully deleted.`); 
    history.push('/'); 
  } catch (err) {
    console.log(err.response.data)
  }
};