import logo from "./logo.svg";
import "./App.css";
import React, { useState } from "react";
import loadable from '@loadable/component';

// const SplitMe = loadable(() => import('./SplitMe'));
const SplitMe = loadable(() => import('./SplitMe'), {
  fallback: <div>loading...</div>
});

function App() {
  const [visible, setVisible] = useState(false);
  const onClick = () => {
    setVisible(true);
  };
  const onMouseOver = () => {
    SplitMe.preload();
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p onMouseOver={onMouseOver}>test</p>
        <button 
          onClick={onClick}
          onMouseOver={onMouseOver}
        >
          Hello React
        </button>
        {visible && <SplitMe />}
      </header>
    </div>
  );
}

export default App;
