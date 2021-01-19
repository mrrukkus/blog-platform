import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {createStore, applyMiddleware} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";

import reducer from './reducer/reducer';
import './index.css';
import App from './App';
import { localStorageActions } from './routes';
import reportWebVitals from './reportWebVitals';
import api from './api';

if (localStorageActions.getUser()) {
  api.defaults.headers.common.Authorization = `Token ${JSON.parse(localStorageActions.getUser()).token}`;
}

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


