import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// Styling
import './App.css';
// Components
import Home from './Pages/Home';
import RegisterUser from './Pages/RegisterUser';
import LoginUser from './Pages/LoginUser';
import Client from './Pages/Client';
import Dashboard from './Pages/Dashboard'
import Texteditor from "./Components/Texteditor";
// Context API
import { AppProvider } from './Contexts/AppContext';

const App = () => {
  return (
    <>
      <AppProvider>
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
      </AppProvider>
    </>
  )
}

export default App;
