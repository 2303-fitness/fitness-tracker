import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { loginUser, callGetMe } from "../api";

const LoginPage = ({
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
    const userToAuth = { username: username, password: password };
    const data = await loginUser(userToAuth);

    if (!data) {
      window.alert("Invalid credentials, Username or Password is incorrect");
    } else {
      setToken(data.token);
      setCurrentUser(data.userObject ? data.userObject.username : "");
      localStorage.setItem(
        "currentUser",
        data.userObject ? data.userObject.username : ""
      );
      localStorage.setItem("token", data.token);
      setIsLoggedIn(true);

      const userData = await callGetMe();
      console.log(userData);

      setUsername("");
      setPassword("");
      navigate("/Home");
    }
  };

  return (
    <>
      <section id="mainContainer">
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
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="password"
                id="psw"
                placeholder="Password"
                name="psw"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
