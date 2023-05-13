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
      setCurrentUser(data.username);
      localStorage.setItem("currentUser", username);
      localStorage.setItem("token", data.token);
      setIsLoggedIn(true);

      // Call the getMe function to fetch user data
      const userData = await callGetMe();
      console.log(userData); // do something with user data

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
                type="text"
                id="psw"
                placeholder="Password"
                name="psw"
                value={password} // bind the input field to the password state variable
                onChange={(e) => setPassword(e.target.value)} // update the state when the user types
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
