import React from "react";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";

import Registration from "./components/Registration";
import Login from "./components/Login";
import Homepage from "./components/Homepage";

import "./App.css";
import "./components/Login.css";

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <div className="logo-container">
            <i class="fas fa-head-side-mask"></i>
            <p>Cover your Mouth</p>
          </div>
          <div className="links-container">
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Register</NavLink>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/">Logout</NavLink>
          </div>
        </nav>
        <Route exact path="/register" component={Registration} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/" component={Homepage} />
      </div>
    </Router>
  );
}

export default App;
