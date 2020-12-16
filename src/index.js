import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import { Provider } from 'react-redux';

import reducer from './reducer/reducer.js';
import {ActionCreator} from "./reducer/user/user";

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import createAPI from "./api";


const onUnauthorized = () => {
  store.dispatch(ActionCreator.requireAuthorization(false));
};

const api = createAPI(onUnauthorized);

const store = createStore(
  reducer,
  composeWithDevTools(
      applyMiddleware(thunk.withExtraArgument(api))
  )
);


ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
);

reportWebVitals();


