import { SET_FORM_DATA, RESET_FORM, SET_ERRORS, RESET_ERRORS } from './actions';

const initialState = {
  formData: {
    title: '',
    description: '',
    author: '',
    country: '',
    state: '',
    city: '',
    imagePreview: null,
    content: '',
  },
  errors: {},
};

const formDataReducer = (state = initialState.formData, action) => {
  switch (action.type) {
    case SET_FORM_DATA:
      return { ...state, ...action.payload };
    case RESET_FORM:
      return { ...state, ...initialState.formData };
    default:
      return state;
  }
};

const errorsReducer = (state = initialState.errors, action) => {
  switch (action.type) {
    case SET_ERRORS:
      return { ...state, ...action.payload };
    case RESET_ERRORS:
      return {};
    default:
      return state;
  }
};

export const rootReducer = (state = initialState, action) => {
  return {
    formData: formDataReducer(state.formData, action),
    errors: errorsReducer(state.errors, action),
  };
};
