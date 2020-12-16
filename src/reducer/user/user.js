import {extend} from '../../utils.js';
// import {Operation as DataOperation} from '../data/data';


const initialState = {
  authorizationStatus: false,
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
  checkAuthorizationStatus: () => (dispatch, getState, api) => {//кажется готово
    return api.get(`/user`)
      .then(() => {
        dispatch(ActionCreator.requireAuthorization(true));
      })
      .catch((err) => {
        throw err;
      });
  },
  login: (authData) => (dispatch, getState, api) => { //дописать обработчики
    return api.post(`/users/login`, {
      "user": {
        "email": authData.email,
        "password": authData.password
      }
    })
      .then(({ data }) => {
        console.log(data);
        dispatch(ActionCreator.requireAuthorization(true));
        localStorage.setItem(
          'user', 
          JSON.stringify({ email: data.user.email, password: authData.password, token: data.user.token }).toString()
        )
        // dispatch(DataOperation.loadContacts());
        // dispatch(DataOperation.loadEmptyContact());
      })
      .catch((err) => {
        console.log(err);
        alert(`Возникла ошибка при входе. Ошибка: `, err);
      });
  },
  register: (registrationData) => (dispatch, getState, api) => {//только исправить обработчики
    return api.post(`/users`, {
      "user": {
        "username": registrationData.userName,
        "email": registrationData.email,
        "password": registrationData.password
      }
    })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      })
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.REQUIRED_AUTHORIZATION:
      return extend(state, {
        authorizationStatus: action.status
      });
    default:
      return state;
  }
};

export {reducer, ActionType, ActionCreator, Operation};
