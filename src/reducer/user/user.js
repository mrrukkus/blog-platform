const initialState = {
  authorizationStatus: false,
  currentUser: null,
  isLoading: false,
  errors: null,
  isSuccess: null
};

const ActionType = {
  REQUIRED_AUTHORIZATION: `REQUIRED_AUTHORIZATION`,
  SET_CURRENT_USER: `SET_CURRENT_USER`,
  SET_ERRORS: `SET_ERRORS`,
  SET_SUCCESS: `SET_SUCCESS`,
  SET_IS_LOADING: `SET_IS_LOADING`
};

const ActionCreator = {
  requireAuthorization: (status, user) => ({
    type: ActionType.REQUIRED_AUTHORIZATION,
    status,
    user
  }),
  setCurrentUser: (user) => ({
    type: ActionType.SET_CURRENT_USER,
    user
  }),
  setErrors: (errors) => ({
    type: ActionType.SET_ERRORS,
    errors
  }),
  setSuccess: (status) => ({
    type: ActionType.SET_SUCCESS,
    status
  }),
  setIsLoading: (status) => ({
    type: ActionType.SET_IS_LOADING,
    status
  })
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.REQUIRED_AUTHORIZATION:
      return {
        ...state,
        authorizationStatus: action.status,
        currentUser: action.user,
        isLoading: false
      };
    case ActionType.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.user
      };
    case ActionType.SET_ERRORS:
      return {
        ...state,
        errors: action.errors
      };
    case ActionType.SET_SUCCESS:
      return {
        ...state,
        isSuccess: action.status
      };
    case ActionType.SET_IS_LOADING:
      return {
        ...state,
        isLoading: action.status
      }
    default:
      return state;
  }
};

export {reducer, ActionType, ActionCreator};


