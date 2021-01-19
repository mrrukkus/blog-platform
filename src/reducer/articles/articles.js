const initialState = {
  isSuccess: null,
  isLoading: true
};

const ActionType = {
  SET_IS_SUCCESS: `SET_IS_SUCCESS`,
  SET_IS_LOADING: `SET_IS_LOADING`
};

const ActionCreator = {
  setSuccess: (status) => ({
    type: ActionType.SET_IS_SUCCESS,
    payload: status
  }),
  setIsLoading: (status) => ({
    type: ActionType.SET_IS_LOADING,
    status
  })
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_IS_SUCCESS:
      return {
        ...state,
        isSuccess: action.payload
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

