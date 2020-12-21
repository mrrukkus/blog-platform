import {extend} from '../../utils.js';


const initialState = {
  authorizationStatus: false,
  currentUser: null
};

const ActionType = {
  REQUIRED_AUTHORIZATION: `REQUIRED_AUTHORIZATION`,
  SET_CURRENT_USER: `SET_CURRENT_USER`,
};

const ActionCreator = {
  requireAuthorization: (status) => {
    return {
      type: ActionType.REQUIRED_AUTHORIZATION,
      status,
    };
  },
  setCurrentUser: (user) => {
    return {
      type: ActionType.SET_CURRENT_USER,
      user
    }
  }
};

const Operation = {
  checkAuthorizationStatus: () => async (dispatch, getState, api) => {//кажется готово
    return api.get(`/user`)
      .then((response) => {
        console.log(api.defaults.headers, response);
        dispatch(ActionCreator.setCurrentUser(response.data.user));
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
        api.defaults.headers.common['Authorization'] = `Token ${data.user.token}`;
        dispatch(ActionCreator.setCurrentUser(data.user));
        dispatch(ActionCreator.requireAuthorization(true));
        localStorage.setItem(
          'user',
          JSON.stringify({ email: data.user.email, password: authData.password, token: data.user.token }).toString()
        )
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
      console.log(data.user);
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
      });
    case ActionType.SET_CURRENT_USER:
      return extend(state, {
        currentUser: action.user
      });
    default:
      return state;
  }
};

export {reducer, ActionType, ActionCreator, Operation};
