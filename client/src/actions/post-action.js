import axios from 'axios';
import {
  ADD_POST,
  GET_ERRORS,
  GET_POST,
  GET_POSTS,
  POST_LOADING,
  DELETE_POST
} from './types';
import { clearErrors } from './error-actions';

export const addPost = postData => dispatch => {
  axios
    .post('/api/post', postData)
    .then(res => {
      dispatch({ type: ADD_POST, payload: res.data });
      dispatch(clearErrors());
    })
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

export const getPosts = () => dispatch => {
  dispatch({ type: POST_LOADING });
  axios
    .get('/api/post')
    .then(res => dispatch({ type: GET_POSTS, payload: res.data }))
    .catch(err => dispatch({ type: GET_POSTS, payload: [] }));
};

export const getPost = postId => dispatch => {
  dispatch({ type: POST_LOADING });
  axios
    .get('/api/post/' + postId)
    .then(res => dispatch({ type: GET_POST, payload: res.data }))
    .catch(err => dispatch({ type: GET_POST, payload: null }));
};

export const deletePost = postId => dispatch => {
  axios
    .delete('/api/post/' + postId)
    .then(res => dispatch({ type: DELETE_POST, payload: postId }))
    .catch(err => console.error(err));
};

export const likePost = postId => dispatch => {
  axios
    .post('/api/post/like/' + postId)
    .then(res => dispatch(getPosts()))
    .catch(err => console.error(err));
};

export const addComment = (postId, commentData) => dispatch => {
  axios
    .post('/api/post/comment/' + postId, commentData)
    .then(res => {
      dispatch(getPost(postId));
      dispatch(clearErrors());
    })
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

export const deleteComment = (postId, commentId) => dispatch => {
  axios
    .delete(`/api/post/comment/${postId}/${commentId}`)
    .then(res => dispatch(getPost(postId)))
    .catch(err => console.error(err));
};
