import React from 'react'
import ReactDOM from 'react-dom/client'
import { render } from 'react-dom'
import App from "./App"
import counterStore from './counterStore'

const store = new counterStore();

ReactDOM.createRoot(document.getElementById("root")).render(
    <App myCounter={store} />
);
