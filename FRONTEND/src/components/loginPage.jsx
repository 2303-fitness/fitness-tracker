import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { loginUser } from "../api";

const LoginPage = ({
  user,
  setUser,
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
    const userToAuth = { user: { username: username, password: password } };
    const data = await loginUser(userToAuth);

    if (data.token) {
      setToken(data.token);
      setUser(username);
      setIsLoggedIn(true);
    }
    setUsername("");
    setPassword("");
    navigate("/home");
  };

  return (
    <>
      <section id="mainContainer">
        <div className="openBtn"></div>
        <div className="login-signup-Popup">
          <div className="formPopup" id="popupForm">
            <form onSubmit={handleSubmit} className="formContainer">
              <h2>Please Log in</h2>
              <label htmlFor="UserName">
                <strong>UserName</strong>
              </label>
              <input
                type="text"
                id="UserName"
                placeholder="UserName"
                name="UserName"
                required
              />
              <label htmlFor="psw">
                <strong>Password</strong>
              </label>
              <input
                type="password"
                id="psw"
                placeholder="Password"
                name="psw"
                required
              />
              <button type="submit" className="btn">
                Log in
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default LoginPage;
