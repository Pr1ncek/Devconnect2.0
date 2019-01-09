import {
  ADD_POST,
  GET_ERRORS,
  GET_POST,
  GET_POSTS,
  POST_LOADING,
  DELETE_POST
} from '../actions/types';

const initialState = {
  posts: [],
  post: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_POST:
      return { ...state, posts: [action.payload, ...state.posts] };
    case POST_LOADING:
      return { ...state, loading: true };
    case GET_POSTS:
      return { ...state, posts: action.payload, loading: false };
    case GET_POST:
      return { ...state, post: action.payload, loading: false };
    case DELETE_POST:
      const updatedPosts = state.posts.filter(
        post => post._id !== action.payload
      );
      return { ...state, posts: updatedPosts };
    default:
      return state;
  }
}
