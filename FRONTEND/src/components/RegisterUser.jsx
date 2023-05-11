import React, { useState } from "react";
import { NavLink, useNavigate } from 'react-router-dom';
import { registerUser } from "../api";

const RegisterUser = ({
  currentUser,
  setCurrentUser,
  isLoggedIn,
  setIsLoggedIn,
  token,
  setToken,
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const userToRegister = { username: username, password: password };
    const data = await registerUser(userToRegister);
    
    if (data.token) {
      setToken(data.token);
      setCurrentUser(username);
      setIsLoggedIn(true);
    }
    setUsername("");
    setPassword("");
    navigate('/Home');
  };

  return (
    <>
      <section id="mainContainer">
        <div className="login-signup-Popup">
          <div className="formPopup" id="popupForm">
            <form onSubmit={handleSubmit} className="formContainer">
              <h2>Sign Up!</h2>
              <label htmlFor="UserName">
                <strong>UserName</strong>
              </label>
              <input
                type="text"
                id="UserName"
                placeholder="Username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                required
              />
              <label htmlFor="psw">
                <strong>Password</strong>
              </label>
              <input
                type="text"
                id="psw"
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
              <button type="submit" className="btn">
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default RegisterUser;
