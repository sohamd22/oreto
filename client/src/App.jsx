import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';

import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

function App() {
  const [user, setUser] = useState('Soham');

  const logoutHandler = (event) => {
    setUser('');
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/signup' element={user ? <Navigate replace to="/dashboard" /> : <Signup />} />
        <Route path='/login' element={user ? <Navigate replace to="/dashboard" /> : <Login setUser={setUser} />} />
        <Route path='/dashboard' element={user ? <Dashboard logoutHandler={logoutHandler} /> : <Navigate replace to="/login" />} /> 
      </Routes>
    </BrowserRouter>
  )
}

export default App
