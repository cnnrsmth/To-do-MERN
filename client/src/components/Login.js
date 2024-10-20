import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "./register.css"; // Make sure to have styles for login in this file or create a separate login.css
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const [confirmUser, setConfirmUser] = useState({
    email: "",
    password: "",
  });

  const handleConfirmUser = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/todos/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(confirmUser),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      // Sets token response from API to local storage, to persist for the user's session
      localStorage.setItem("token", data.accessToken);
      window.location = "/app";
    } catch (error) {
      console.error(error);
    }
  };

  const handleEmailChange = (e) => {
    setConfirmUser({ ...confirmUser, email: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setConfirmUser({ ...confirmUser, password: e.target.value });
  };

  return (
    <div className="login-wrapper">
      <div className="form-title-wrapper">
        <h2 className="form-title">LOGIN</h2>
        <p className="form-instructions">
          Please enter your registered email and password to access your
          account.
        </p>
      </div>
      <div className="formbold-main-wrapper">
        <div className="formbold-form-wrapper">
          <form className="User-form" onSubmit={handleConfirmUser}>
            <div className="formbold-input-flex">
              <div>
                <input
                  type="email"
                  value={confirmUser.email}
                  onChange={handleEmailChange}
                  placeholder="Type email here..."
                  className="formbold-form-input"
                />
              </div>
              <div>
                <input
                  type="password"
                  value={confirmUser.password}
                  onChange={handlePasswordChange}
                  placeholder="Type password here..."
                  className="formbold-form-input"
                />
              </div>
              <button className="btn" type="submit">
                <FontAwesomeIcon icon={faArrowRight} />
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="account-link">
        <p>
          Don't have an account? <Link to="/register">Create one</Link>{" "}
          {/* Use Link for navigation */}
        </p>
      </div>
    </div>
  );
};

export default Login;
