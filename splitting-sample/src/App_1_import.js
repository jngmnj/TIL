import logo from './logo.svg';
import './App.css';
// import notify from './notify';

function App() {
  const onClick = () => {
    // notify();
    import('./notify').then(result => result.default())
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={onClick}>Hello React</button>
      </header>
    </div>
  );
}

export default App;
