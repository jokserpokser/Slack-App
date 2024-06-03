
import './App.css';
import LoginSignup from './pages/LoginSignup';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';

function App() {

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
