
import './App.css';
import LoginSignup from './pages/LoginSignup';
import { useState } from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import Users from './components/Sidebar2/Users';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Messages from './components/Sidebar2/Messages';
import Channels from './components/Sidebar2/Channels';
import Sidebar2 from './components/Sidebar2/Sidebar2';
import Dashboard from './pages/Dashboard';

function App() {
  const [display, setDisplay] = useState('login');
  const [displayDashboard, setDisplayDashboard] = useState(false);


  return (
    <div className="App">

      <BrowserRouter>
        <Routes>
          <Route index element={<LoginSignup />}></Route>
          <Route path='dashboard/*' element={<Dashboard />}></Route>
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
