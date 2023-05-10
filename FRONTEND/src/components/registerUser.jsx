import React, { useState } from "react";
import { registerUser } from "../api";

const register = ({
  user,
  setUser,
  isLoggedIn,
  setIsLoggedIn,
  token,
  setToken,
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const userToRegister = { user: { username: username, password: password } };
    const data = await registerUser(userToRegister);
    console.log(data.token);
    if (data.token) {
      setToken(data.token);
      setUser(username);
      setIsLoggedIn(true);
    }
    setUsername("");
    setPassword("");
  };

  return (
    <>
      <section id="mainContainer">
        <div className="openBtn">
          <button className="openButton" onClick={() => openForm()}>
            <strong>Open Form</strong>
          </button>
        </div>
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
                type="password"
                id="psw"
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
              <button type="submit" className="btn">
                Log in
              </button>
              <button
                type="button"
                className="btn cancel"
                onClick={() => closeForm()}
              >
                Close
              </button>
            </form>
          </div>
        </div>
        <script>
          {`
             function openForm() {
                document.createElementById("popupForm").style.display = "block";
              }
          function closeForm() {
            document.createElementById("popupForm").style.display = "none";
          }
        `}
        </script>
      </section>
    </>
  );
};

export default register;
