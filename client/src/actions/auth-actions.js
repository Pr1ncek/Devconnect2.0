import axios from 'axios';
import { GET_ERRORS, SET_CURRENT_USER, CLEAR_CURRENT_PROFILE } from './types';
import setAuthToken from '../utils/set-auth-token';
import jwt_decode from 'jwt-decode';

export const registerUser = (userData, history) => dispatch => {
  axios
    .post('/api/user/register', userData)
    .then(res => history.push('/login'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const loginUser = userData => dispatch => {
  axios
    .post('/api/user/login', userData)
    .then(res => {
      const { token } = res.data;
      localStorage.setItem('jwtToken', token);
      // allows axios to automatically include the token on follow up requests after login
      setAuthToken(token);
      const decoded = jwt_decode(token);
      dispatch({
        type: SET_CURRENT_USER,
        payload: decoded
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const logoutUser = () => dispatch => {
  localStorage.removeItem('jwtToken');
  setAuthToken(false);
  dispatch({
    type: SET_CURRENT_USER,
    payload: {}
  });
  dispatch({
    type: CLEAR_CURRENT_PROFILE
  });
  window.location.href = '/login';
};
