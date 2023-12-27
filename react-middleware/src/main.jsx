import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import rootReducer, { rootSaga } from './modules/index.js'
import { applyMiddleware, legacy_createStore as createStore } from "redux";
import { Provider } from 'react-redux';
// import loggerMiddleware from './lib/loggerMiddleware.js';
import { createLogger } from 'redux-logger';
// import ReduxThunk from 'redux-thunk';
import { thunk } from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

// 01. 직접 만든 미들웨어
// const store = createStore(rootReducer, applyMiddleware(loggerMiddleware));

// 02. redux-thunk
// const logger = createLogger();
// const store = createStore(rootReducer, applyMiddleware(logger, thunk));

// 03. redux-saga
const logger = createLogger();
const sagaMiddleware = createSagaMiddleware();
const store  = createStore(
  rootReducer,
  applyMiddleware(logger, thunk, sagaMiddleware)
);
sagaMiddleware.run(rootSaga)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
