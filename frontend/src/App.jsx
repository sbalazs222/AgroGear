import { useState, useEffect } from 'react';
import { BrowserRouter, NavLink, Routes, Route, Navigate } from "react-router-dom";
import Home from './Home';
import Aboutus from './Aboutus';
import Profile from './Profile';
import Orders from './Orders';
import Cart from './Cart';
import Login from './Login';
import Register from './Register';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") setDarkMode(true);
  }, []);

  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? "#121212" : "#f8f9fa";
    document.body.style.color = darkMode ? "#f4f4f4" : "#121212";
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const toggleTheme = () => setDarkMode(!darkMode);

  const addToCart = (product) => {
    setCartItems(prev => {
      const exist = prev.find(item => item.id === product.id);
      if (exist) return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => setCartItems(prev => prev.filter(item => item.id !== id));

  const handleLogout = async () => {
    try { await fetch("http://localhost:3000/auth/logout", { method: "POST", credentials: "include" }); } 
    catch (err) { console.error(err); }
    setIsLoggedIn(false); 
    setCartItems([]);
  };

  const navStyle = {
    position: "sticky", top: 0, zIndex: 1000,
    backdropFilter: "blur(10px)",
    backgroundColor: darkMode ? "rgba(31, 31, 31, 0.8)" : "rgba(255, 255, 255, 0.8)",
    padding: "15px 5%",
    display: "flex", justifyContent: "space-between", alignItems: "center",
    boxShadow: "0 2px 15px rgba(0,0,0,0.05)"
  };

  return (
    <BrowserRouter>
      <nav style={navStyle}>
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <b style={{fontSize: "1.5rem", color: "#2e7d32", marginRight: "20px"}}>AgroGear</b>
          <NavLink to="/" className="nav-link-custom" style={({isActive}) => ({color: isActive ? "#2e7d32" : (darkMode ? "#fff" : "#444"), textDecoration: "none", fontWeight: 600})}>Főoldal</NavLink>
          <NavLink to="/Aboutus" className="nav-link-custom" style={({isActive}) => ({color: isActive ? "#2e7d32" : (darkMode ? "#fff" : "#444"), textDecoration: "none", fontWeight: 600})}>Rólunk</NavLink>
          {isLoggedIn && (
            <>
              <NavLink to="/cart" className="nav-link-custom" style={{textDecoration: "none", color: "inherit"}}>Kosár ({cartItems.reduce((a, b) => a + b.quantity, 0)})</NavLink>
              <NavLink to="/profile" className="nav-link-custom" style={{textDecoration: "none", color: "inherit"}}>Profil</NavLink>
              <NavLink to="/orders" className="nav-link-custom" style={{textDecoration: "none", color: "inherit"}}>Rendeléseim</NavLink>
            </>
          )}
        </div>
        <div style={{display: "flex", alignItems: "center", gap: "15px"}}>
          {!isLoggedIn ? (
            <>
              <NavLink to="/Login" style={{textDecoration: "none", color: "#2e7d32", fontWeight: 600}}>Belépés</NavLink>
              <NavLink to="/Register" className="btn btn-success" style={{borderRadius: "20px", padding: "5px 20px"}}>Regisztráció</NavLink>
            </>
          ) : (
            <button onClick={handleLogout} className="btn btn-outline-danger btn-sm" style={{borderRadius: "20px"}}>Kijelentkezés</button>
          )}
          <button onClick={toggleTheme} style={{background: "none", border: "none", fontSize: "1.2rem", cursor: "pointer"}}>{darkMode ? "☀️" : "🌙"}</button>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home addToCart={addToCart} />} />
        <Route path="/Aboutus" element={<Aboutus />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/cart" element={<Cart cartItems={cartItems} removeFromCart={removeFromCart} setCartItems={setCartItems} />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;