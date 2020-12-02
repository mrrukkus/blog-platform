import {Operation as DataOperation} from '../data/data';

const AuthorizationStatus = {
  AUTH: `AUTH`,
  NO_AUTH: `NO_AUTH`
};

const initialState = {
  authorizationStatus: AuthorizationStatus.NO_AUTH,
};

const ActionType = {
  REQUIRED_AUTHORIZATION: `REQUIRED_AUTHORIZATION`,
};

const ActionCreator = {
  requireAuthorization: (stats) => {
    return {
      type: ActionType.REQUIRED_AUTHORIZATION,
      status: stats
    };
  },
};

const Operation = {
  checkAuthorizationStatus: () => (dispatch, getState, api) => {
    return api.get(`/login`)
      .then(() => {
        // dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH));
      })
      .catch((err) => {
        throw err;
      });
  },
  login: (authData) => (dispatch, getState, api) => {
    return api.post(`/login`, {
      "email": authData.login,
      "password": authData.password,
    })
      .then((response) => {
        console.log(response);
        dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH));
        dispatch(DataOperation.loadContacts());
        dispatch(DataOperation.loadEmptyContact());
      })
      .catch((err) => {
        console.log(err);
        alert(`Возникла ошибка при входе. Ошибка: `, err);
      });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.REQUIRED_AUTHORIZATION:
      return Object.assign({}, state, {
        authorizationStatus: action.status
      });
  }
  return state;
};

export {reducer, ActionType, ActionCreator, Operation, AuthorizationStatus};
