import axios from 'axios';
import { GET_PROFILE, PROFILE_LOADING } from './types';

// GET current profile
export const getCurrentProfile = () => dispatch => {
  dispatch({ type: PROFILE_LOADING });
  axios
    .get('api/profile/current')
    .then(res => dispatch({ type: GET_PROFILE, payload: res.data }))
    .catch(err => dispatch({ type: GET_PROFILE, payload: {} }));
};
