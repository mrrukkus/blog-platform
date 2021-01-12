const initialState = {
  authorizationStatus: false,
  currentUser: null,
  isLoading: true,
  errors: null
};

const ActionType = {
  REQUIRED_AUTHORIZATION: `REQUIRED_AUTHORIZATION`,
  SET_CURRENT_USER: `SET_CURRENT_USER`,
  SET_ERRORS: `SET_ERRORS`
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
    })
};

const Operation = {
  checkAuthorizationStatus: () => async (dispatch, getState, api) => api.get(`/user`)
      .then((response) => {
        dispatch(ActionCreator.requireAuthorization(true, response.data.user));
      })
      .catch((err) => {
        throw err;
      }),
  login: (authData) => (dispatch, getState, api) =>
    api.post(`/users/login`, {
      "user": {
        "email": authData.email,
        "password": authData.password
      }
    })
      .then(({ data }) => {
       // eslint-disable-next-line no-param-reassign
       api.defaults.headers.common.Authorization = `Token ${data.user.token}`;
        dispatch(ActionCreator.requireAuthorization(true, data.user));
        dispatch(ActionCreator.setErrors(null));
        localStorage.setItem(
          'user',
          JSON.stringify({ ...data.user }).toString()
        )
      })
      .catch(({response}) => {
        dispatch(ActionCreator.setErrors(response.data.errors));
      }),
  register: (registrationData) => (dispatch, getState, api) =>
    api.post(`/users`, {
      "user": {
        "username": registrationData.username,
        "email": registrationData.email,
        "password": registrationData.password
      }
    })
      .then(() => {
        dispatch(ActionCreator.setErrors(null));
      })
      .catch(({response}) => {
        dispatch(ActionCreator.setErrors(response.data.errors));
      }),
  editProfile: (newData) => (dispatch, getState, api) =>
    api.put(`/user`, {
      "user": {
        "username": newData.username,
        "email": newData.email,
        "password": newData.password,
        "image": newData.image
      }
    }).then(({data}) => {
      localStorage.setItem(
        'user',
        JSON.stringify({ email: data.user.email, password: newData.password, token: data.user.token }).toString()
      )
      dispatch(ActionCreator.setCurrentUser(data.user));
    }).catch((err) => {
      throw err;
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
    default:
      return state;
  }
};

export {reducer, ActionType, ActionCreator, Operation};


