import axios from "axios";
import {createStore, applyMiddleware} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import reducer from './reducer/reducer';
import {ActionCreator} from "./reducer/user/user";

const Error = {
  UNAUTHORIZED: 401
};

const createAPI = (onUnauthorized) => {
  const api = axios.create({
    baseURL: `https://conduit.productionready.io/api/`,
    timeout: 5000,
    withCredentials: true,
  });

  if (localStorage.getItem('user')) {
    api.defaults.headers.common.Authorization = `Token ${JSON.parse(localStorage.getItem('user')).token}`;
  }

  const onSuccess = (response) => response;

  const onFail = (err) => {
    const {response} = err;

    if (response.status === Error.UNAUTHORIZED) {
      onUnauthorized();

      throw err;
    }

    throw err;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};

/* eslint no-use-before-define: ["error", { "variables": false }] */
const onUnauthorized = () => {
  store.dispatch(ActionCreator.requireAuthorization(false, null));
};

const api = createAPI(onUnauthorized);

const store = createStore(
  reducer,
  composeWithDevTools(
      applyMiddleware(thunk.withExtraArgument(api))
  )
);

export {api}
export default store;
