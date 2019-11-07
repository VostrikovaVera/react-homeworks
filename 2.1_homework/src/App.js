import React from 'react';
import logo from './logo.svg';
import { ButtonC } from './Buttons';
import { ButtonF } from './Buttons';
import './App.css';

function App() {
  return (
    <div className="App">
      <ButtonC url="https://google.com" color="red" name="Button created as class-component" />
      <ButtonF url="https://google.com" color="green" name="Button created as function-component" />

      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
