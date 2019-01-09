import axios from 'axios';
import {
  GET_PROFILE,
  PROFILE_LOADING,
  GET_ERRORS,
  GET_PROFILES
} from './types';
import { clearErrors } from './error-actions';

// GET all profiles
export const getProfiles = () => dispatch => {
  dispatch({ type: PROFILE_LOADING });
  axios
    .get('/api/profile/all')
    .then(res => dispatch({ type: GET_PROFILES, payload: res.data }))
    .catch(err => dispatch({ type: GET_PROFILES, payload: [] }));
};

// GET user profile by profile handle
export const getProfileByHandle = handle => dispatch => {
  dispatch({ type: PROFILE_LOADING });
  axios
    .get('/api/profile/' + handle)
    .then(res => dispatch({ type: GET_PROFILE, payload: res.data }))
    .catch(err => dispatch({ type: GET_PROFILE, payload: null }));
};

// GET current profile
export const getCurrentProfile = () => dispatch => {
  dispatch({ type: PROFILE_LOADING });
  axios
    .get('/api/profile')
    .then(res => dispatch({ type: GET_PROFILE, payload: res.data }))
    .catch(err => dispatch({ type: GET_PROFILE, payload: {} }));
};

// Create a new profile or update existing one
export const createProfile = (profileData, history) => dispatch => {
  axios
    .post('/api/profile', profileData)
    .then(res => {
      dispatch(clearErrors());
      history.push('/dashboard');
    })
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

// Add work experience to the profile
export const addExperience = (expData, history) => dispatch => {
  axios
    .post('/api/profile/experience', expData)
    .then(response => {
      dispatch(clearErrors());
      history.push('/dashboard');
    })
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

// Delete work experience from the profile
export const deleteExperience = expId => dispatch => {
  if (window.confirm('Are you sure you want to delete this experience?')) {
    axios.delete('api/profile/experience/' + expId).then(res => {
      dispatch({ type: GET_PROFILE, payload: res.data.profile });
    });
  }
};

// Add education to the profile
export const addEducation = (eduData, history) => dispatch => {
  axios
    .post('api/profile/education', eduData)
    .then(response => {
      dispatch(clearErrors());
      history.push('/dashboard');
    })
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

// Delete education from the profile
export const deleteEducation = eduId => dispatch => {
  if (window.confirm('Are you sure you want to delete this education?')) {
    axios.delete('api/profile/education/' + eduId).then(res => {
      dispatch({ type: GET_PROFILE, payload: res.data.profile });
    });
  }
};
