import axios from 'axios';
import { GET_ERRORS } from './types';
import setAuthToken from '../utils/set-auth-token';

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

export const loginUser = (userData, history) => dispatch => {
  axios
    .post('/api/user/login', userData)
    .then(res => {
      const { Token } = res.data;
      localStorage.setItem('jwtToken', Token);
      setAuthToken(Token);
      history.push('/dashboard');
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
