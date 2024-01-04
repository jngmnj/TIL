import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import reportWebVitals from './reportWebVitals';
import { applyMiddleware, legacy_createStore as createStore } from "redux";
import rootReducer from './reducers/index.tsx';
import { Provider } from 'react-redux';
import { thunk } from "redux-thunk";

// const root = ReactDOM.createRoot(document.getElementById('root'));
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const loggerMiddleware = (store: any) => (next: any) => (action: any) => {
  console.log("store", store);
  console.log("action", action);
  next(action);
}

const middleware = applyMiddleware(thunk, loggerMiddleware);
const store = createStore(rootReducer, middleware);

const render = () => root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App 
        value={store.getState()}  
        onIncreament={() => store.dispatch({type: "INCREAMENT"})}
        onDecreament={() => store.dispatch({type: "DECREAMENT"})}
      />
    </Provider>
  </React.StrictMode>
);

render();
store.subscribe(render);

reportWebVitals();
