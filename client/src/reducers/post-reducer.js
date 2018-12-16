import { ADD_POST, GET_ERRORS, GET_POST } from './types';

const initialState = {
  posts: [],
  post: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
      case ADD_POST:
        return 
    default:
      return state;
  }
}
