import { useState } from 'react'
import { BrowserRouter, NavLink, Routes, Route } from "react-router-dom"
import './App.css'
import Home from './Home'
import Register from './Register'
import Login from './Login'
import Aboutus from './Aboutus'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <>
      <BrowserRouter>
        <nav>
          <NavLink to="/">kezdőlap</NavLink>{" | "}
          <NavLink to="/Register">Regisztráció</NavLink>{" | "}
          <NavLink to="/Login">Bejelentkezés</NavLink>{" | "}
          <NavLink to="/Aboutus">Rólunk</NavLink>
        </nav>

        <Routes>
          <Route path='/' element={<Home /> } />
          <Route path='/Register' element={<Register /> } />
          <Route path='/Login' element={<Login /> } />
          <Route path='/Aboutus' element={<Aboutus /> } />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
