import './App.css';
import { observer } from "mobx-react";
import { useCounterStore } from './context/counterContext';

// { myCounter }
function App() {
  // Context 
  const myCounter = useCounterStore();

  return (
    <div className="App" style={{ padding: "4rem" }}>
      카운트 : {myCounter.count}
      <br />
      <br />
      마이너스?: {myCounter.isNegative}
      <br />
      <br />
      <button onClick={() => myCounter.increase()}>+</button>
      <button onClick={() => myCounter.decrease()}>-</button>
    </div>
  );
}

export default observer(App);

