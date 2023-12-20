import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import rootReducer from './modules/index.js'
import { applyMiddleware, legacy_createStore as createStore } from "redux";
import { Provider } from 'react-redux';
// import loggerMiddleware from './lib/loggerMiddleware.js';
import { createLogger } from 'redux-logger';
// import ReduxThunk from 'redux-thunk';
import { thunk } from 'redux-thunk';

// 01. 직접 만든 미들웨어
// const store = createStore(rootReducer, applyMiddleware(loggerMiddleware));

// 02. redux-thunk
const logger = createLogger();
const store = createStore(rootReducer, applyMiddleware(logger, thunk));

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
