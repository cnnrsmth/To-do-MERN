import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const [confirmUser, setConfirmUser] = useState({
    email: "",
    password: "",
  });
  const [hasError, setHasError] = useState(false); // Track errors
  const [errorMessage, setErrorMessage] = useState(""); // Store the error message

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

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed.");
      }

      // Clear error state if login is successful
      setHasError(false);
      setErrorMessage(""); // Clear error message on success
      localStorage.setItem("token", data.accessToken);
      window.location = "/app"; // Redirect to app after successful login
    } catch (error) {
      setHasError(true); // Set error state if login fails
      setErrorMessage(error.message); // Set the error message to display
      console.error(error.message);
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
              <button
                className={`btn ${hasError ? "btn-error" : ""}`} // Conditionally add the btn-error class
                type="submit"
              >
                <FontAwesomeIcon icon={faArrowRight} />
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="account-link">
        <p>
          Don't have an account? <Link to="/register">Create one</Link>
        </p>
      </div>

      {/* Show error message below the "Don't have an account" */}
      {hasError && (
        <div className="error-message">
          {errorMessage || "An error occurred. Please try again."}
        </div>
      )}
    </div>
  );
};

export default Login;
