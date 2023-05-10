import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { registerUser, loginUser } from "../api";

const Header = ({ setCurrentUser, isLoggedIn, setIsLoggedIn, setToken }) => {
  const navigate = useNavigate();
  return (
    <section className="headerElem">
      <div>Fitness Tracker</div>
      <div></div>
      <nav id="navBar">
        <NavLink to="/" id="navFeature">
          Home
        </NavLink>

        <NavLink to="/routines" id="navFeature">
          Routines
        </NavLink>
        <NavLink to="/activities" id="navFeature">
          Activities
        </NavLink>
        <NavLink to="/profile" id="navFeature">
          Profile
        </NavLink>

        {isLoggedIn ? (
          <button
            onClick={() => {
              setIsLoggedIn(false);
              setCurrentUser("");
              setToken("");
              localStorage.removeItem("currentUser");
              localStorage.removeItem("token");
              navigate("/Home");
            }}
          >
            {" "}
            Logout
          </button>
        ) : (
          <button
            onClick={() => {
              navigate("/LoginPage");
            }}
          >
            {" "}
            Log In
          </button>
        )}
        <button id="register" onclick="registerFunction()">
          Sign Up
        </button>
      </nav>
    </section>
  );
};

export default Header;
