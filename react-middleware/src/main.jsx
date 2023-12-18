import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import rootReducer from './modules/index.js'
import { applyMiddleware, legacy_createStore as createStore } from "redux";
import { Provider } from 'react-redux';
import loggerMiddleware from './lib/loggerMiddleware.js';

const store = createStore(rootReducer, applyMiddleware(loggerMiddleware));

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
