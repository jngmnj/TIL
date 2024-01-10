import React, { Component } from "react";
import { observer } from "mobx-react";

@observer
export class App extends Component {
  render() {
    const myCounter = this.props.myCounter;
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
}

export default App;
