import axios from 'axios';
import { GET_ERRORS, SET_CURRENT_USER } from './types';
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
