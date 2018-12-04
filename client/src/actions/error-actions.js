import { GET_ERRORS } from './types';

// Clear the errors object
export const clearErrors = () => {
  return {
    type: GET_ERRORS,
    payload: {}
  };
};
