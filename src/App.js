import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// Styling
import './App.css';
// Components
import Home from './Components/Pages/Home';
import RegisterUser from './Components/Pages/RegisterUser';
import LoginUser from './Components/Pages/LoginUser';
import Client from './Components/Pages/Client';
import Dashboard from './Components/Pages/Dashboard'
import Texteditor from "./Components/Texteditor";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<RegisterUser />} />
          <Route path='/login' element={<LoginUser />} />
          <Route path='/user/:userId/*' element={<Client />}>
            <Route index element={<Dashboard />} />
            <Route path="n/:noteID" element={<Texteditor />} />
          </Route>
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App;
