import { useState, useEffect } from 'react'
import { BrowserRouter, NavLink, Routes, Route } from "react-router-dom"
import './App.css'
import Home from './Home'
import Register from './Register'
import Login from './Login'
import Aboutus from './Aboutus'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [today, setToday] = useState("")
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const date = new Date()
    const days = ["vasárnap", "hétfő", "kedd", "szerda", "csütörtök", "péntek", "szombat"]
    const dayName = days[date.getDay()]
    const formattedDate = `${date.getFullYear()}. ${String(date.getMonth() + 1).padStart(2, "0")}. ${String(date.getDate()).padStart(2, "0")} - ${dayName}`
    setToday(formattedDate)
  }, [])

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme")
    const prefersDark =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches

    if (storedTheme === "dark" || (!storedTheme && prefersDark)) {
      setDarkMode(true)
    }
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", darkMode ? "dark" : "light")
    localStorage.setItem("theme", darkMode ? "dark" : "light")
  }, [darkMode])

  const toggleTheme = (e) => {
    setDarkMode(e.target.checked)
  }

  return (
    <>
      <BrowserRouter>
        <nav>
          <NavLink to="/">kezdőlap</NavLink>{" | "}
          <NavLink to="/Register">Regisztráció</NavLink>{" | "}
          <NavLink to="/Login">Bejelentkezés</NavLink>{" | "}
          <NavLink to="/Aboutus">Rólunk</NavLink> {" | "}
          <div className="toggle-theme-wrapper">
            <span>☀️</span>
            <label className="toggle-theme" htmlFor="checkbox">
              <input type="checkbox" id="checkbox" checked={darkMode} onChange={toggleTheme}/>
              <div className="slider round"></div>
            </label>
            <span>🌒</span>
          </div>
        </nav>

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Register' element={<Register />} />
          <Route path='/Login' element={<Login />} />
          <Route path='/Aboutus' element={<Aboutus />} />
        </Routes>
      </BrowserRouter>

      {today}
    </>
  )
}

export default App