import axios from 'axios';
import { GET_PROFILE, PROFILE_LOADING, GET_ERRORS } from './types';

// GET current profile
export const getCurrentProfile = () => dispatch => {
  dispatch({ type: PROFILE_LOADING });
  axios
    .get('api/profile')
    .then(res => dispatch({ type: GET_PROFILE, payload: res.data }))
    .catch(err => dispatch({ type: GET_PROFILE, payload: {} }));
};

// Create a new profile
export const createProfile = (profileData, history) => dispatch => {
  axios
    .post('/api/profile', profileData)
    .then(res => history.push('/dashboard'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Delete Profile
export const deleteProfile = () => dispatch => {
  if (window.confirm('Are you sure you want to delete your profile?')) {
    axios
      .delete('/api/profile')
      .then(res => dispatch({ type: GET_PROFILE, payload: {} }))
      .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
  }
};
