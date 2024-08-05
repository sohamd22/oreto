import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Signup, Login, Dashboard } from "./pages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Dashboard />} /> 
      </Routes>
    </BrowserRouter>
  )
}

export default App
