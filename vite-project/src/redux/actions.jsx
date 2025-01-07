export const SET_FORM_DATA = 'SET_FORM_DATA';
export const RESET_FORM = 'RESET_FORM';
export const SET_ERRORS = 'SET_ERRORS';
export const RESET_ERRORS = 'RESET_ERRORS';

// Action to set form data
export const setFormData = (formData) => ({
  type: SET_FORM_DATA,
  payload: formData,
});

// Action to reset form data
export const resetForm = () => ({
  type: RESET_FORM,
});

// Action to set errors
export const setErrors = (errors) => ({
  type: SET_ERRORS,
  payload: errors,
});

// Action to reset errors
export const resetErrors = () => ({
  type: RESET_ERRORS,
});
