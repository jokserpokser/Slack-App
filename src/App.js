import logo from './assets/slack-logo.png';
import './App.css';
import Login from "./components/Authentication/Login"
import Signup from './components/Authentication/Signup';
import { useState } from 'react';

function App() {
  const [ display, setDisplay ]  = useState(true);

  return (
    <div className="App">
      <div>
        <img src={logo} alt="Slack" className="logo-img" />
      </div>
      {display ? <Login setDisplay={setDisplay} /> : <Signup setDisplay={setDisplay} />}
    </div>
  );
}

export default App;
