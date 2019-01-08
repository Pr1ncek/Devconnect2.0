import { ADD_POST, GET_ERRORS, GET_POST } from '../actions/types';

const initialState = {
  posts: [],
  post: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_POST:
      return { ...state, posts: [action.payload, ...state.posts] };
    default:
      return state;
  }
}
