import { CLEAR_ERRORS } from './types';

// Clear the errors object
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
