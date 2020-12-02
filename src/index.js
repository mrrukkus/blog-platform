import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";

import reducer from './reducer/reducer.js';
import {ActionCreator, AuthorizationStatus} from "./reducer/user/user";

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import createAPI from "./api";


const onUnauthorized = () => {
  store.dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH));
};

const api = createAPI(onUnauthorized);

const store = createStore(
  reducer,
  composeWithDevTools(
      applyMiddleware(thunk.withExtraArgument(api))
  )
);


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();


