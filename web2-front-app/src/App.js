import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Components/Home';
import Register from './Components/Register';
import Login from './Components/Login';
import Profile from './Components/Profile';
import {RolePicker} from './Services/RolePicker' 
import './App.css';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);

  const handleLogin = () => {
    // Perform login logic and set isLoggedIn to true
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    // Perform logout logic and set isLoggedIn to false
    setIsLoggedIn(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const isTop = window.scrollY < 1000;
      setIsNavbarVisible(isTop);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Router>
      <nav className={`navbar ${isNavbarVisible ? 'navbar-visible' : ''}`}>
        <div className="navbar-container">
          <Link to="/" className="navbar-logo">
            Fragrances.com
          </Link>
          <div className="nav-menu">
            <ul className="nav-list">
              <li className="nav-item">
                <Link to="/" className="nav-link">Home</Link>
              </li>
              {!isLoggedIn && (
                <>
                  <li className="nav-item">
                    <Link to="/register" className="nav-link">Register</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/login" className="nav-link">Login</Link>
                  </li>
                </>
              )}

              {isLoggedIn && RolePicker().isSeller(
                <>
                  <li className="nav-item">
                    <Link to="/addProduct" className="nav-link">Add Product</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/showProducts" className="nav-link">Show My Products</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/newOrders" className="nav-link">New Orders</Link>
                  </li>

                  <li className="nav-item">
                    <Link to="/ordersHistory" className="nav-link">Orders History</Link>
                  </li>
                </>
              )}

              {isLoggedIn && (
                <>
                  <li className="nav-item">
                    <Link to="/profile" className="nav-link">Profile</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/logout" className="logout-button" onClick={handleLogout}>
                      <span className="icon">⏚</span> Logout
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register handleLogin={handleLogin}/>} />
        <Route path="/login" element={<Login handleLogin={handleLogin} />} />
        {isLoggedIn && (
          <Route path="/profile" element={<Profile />} />
        )}
      </Routes>
    </Router>
  );
};

export default App;
