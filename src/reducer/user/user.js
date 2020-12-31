import {extend} from '../../utils.js';


const initialState = {
  authorizationStatus: false,
  currentUser: null,
  errors: null
};

const ActionType = {
  REQUIRED_AUTHORIZATION: `REQUIRED_AUTHORIZATION`,
  SET_CURRENT_USER: `SET_CURRENT_USER`,
  SET_ERRORS: `SET_ERRORS`
};

const ActionCreator = {
  requireAuthorization: (status, user) => {
    return {
      type: ActionType.REQUIRED_AUTHORIZATION,
      status,
      user
    };
  },
  setCurrentUser: (user) => {
    return {
      type: ActionType.SET_CURRENT_USER,
      user
    }
  },
  setErrors: (errors) => {
    return {
      type: ActionType.SET_ERRORS,
      errors
    }
  }
};

const Operation = {
  checkAuthorizationStatus: () => async (dispatch, getState, api) => {//кажется готово
    return api.get(`/user`)
      .then((response) => {
        // dispatch(ActionCreator.setCurrentUser(response.data.user));
        dispatch(ActionCreator.requireAuthorization(true, response.data.user));
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
        api.defaults.headers.common['Authorization'] = `Token ${data.user.token}`;
        // dispatch(ActionCreator.setCurrentUser(data.user));
        dispatch(ActionCreator.requireAuthorization(true, data.user));
        dispatch(ActionCreator.setErrors(null));
        localStorage.setItem(
          'user',
          JSON.stringify({ email: data.user.email, password: authData.password, token: data.user.token }).toString()
        )
      })
      .catch(({response}) => {
        console.log(response);
        dispatch(ActionCreator.setErrors(response.data.errors));
        alert(`Возникла ошибка при входе. Ошибка: `);
      });
  },
  register: (registrationData) => (dispatch, getState, api) => {//только исправить обработчики
    return api.post(`/users`, {
      "user": {
        "username": registrationData.username,
        "email": registrationData.email,
        "password": registrationData.password
      }
    })
      .then((response) => {
        console.log(response);
        dispatch(ActionCreator.setErrors(null));
      })
      .catch(({response}) => {
        console.log(response);
        dispatch(ActionCreator.setErrors(response.data.errors));
      })
  },
  editProfile: (newData) => (dispatch, getState, api) => {
    console.log(newData, 'new data');
    return api.put(`/user`, {
      "user": {
        "username": newData.username,
        "email": newData.email,
        "password": newData.password,
        "image": newData.image
      }
    }).then(({data}) => {
      // console.log(response);
      localStorage.setItem(
        'user',
        JSON.stringify({ email: data.user.email, password: newData.password, token: data.user.token }).toString()
      )
      dispatch(ActionCreator.setCurrentUser(data.user));
    }).catch((err) => {
      alert('Введенные логин и/или почта заняты!');
      throw err;
    })
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.REQUIRED_AUTHORIZATION:
      return extend(state, {
        authorizationStatus: action.status,
        currentUser: action.user
      });
    case ActionType.SET_CURRENT_USER:
      return extend(state, {
        currentUser: action.user
      });
    case ActionType.SET_ERRORS:
      return extend(state, {
        errors: action.errors
      })
    default:
      return state;
  }
};

export {reducer, ActionType, ActionCreator, Operation};


