import axios from 'axios';
import { returnErrors } from './errorActions';
import { USER_LOADED, USER_LOADING, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS, REGISTER_SUCCESS, REGISTER_FAIL } from './types';
import { IConfigHeaders } from '../../types/interfaces';

// check token and load user
export const loadUser = () => (dispatch: Function, getState: Function) => {
  dispatch({ type: USER_LOADING });

  axios.get('/api/auth/user', tokenConfig(getState))
    .then(res => dispatch({
        type: USER_LOADING,
        payload: res.data
    }))
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR
      })
    });
};

// set up config/headers and token 
export const tokenConfig = (getState: Function) => {
  // get token from localstorage
  const token = getState().auth.token;

  // headers
  const config: IConfigHeaders = {
    headers: {
      "Content-type": "application/json"
    }
  };

  // If token, add to headers
  if (token) {
    config.headers['x-auth-token'] = token;
  }

  return config;
};
