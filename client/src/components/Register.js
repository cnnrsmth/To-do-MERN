import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./register.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const Register = () => {
  const [newUser, setNewUser] = useState({
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [errorMessage, setErrorMessage] = useState(""); // State for error messages
  const [hasError, setHasError] = useState(false); // State for tracking errors

  const handleAddUser = async (e) => {
    e.preventDefault();

    // Reset error message and error state before each submission
    setErrorMessage("");
    setHasError(false);

    // Check if passwords match
    if (newUser.password !== newUser.password_confirmation) {
      setErrorMessage("Passwords do not match.");
      setHasError(true); // Set error state if passwords do not match
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/todos/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrorMessage(errorData.error); // Set the error message from the response
        setHasError(true); // Set error state if there's an error from the API
        return;
      }

      window.location = "/login"; // Redirect on successful registration
    } catch (error) {
      console.error(error);
      setErrorMessage("An error occurred while registering. Please try again.");
      setHasError(true); // Set error state for general errors
    }
  };

  const handleEmailChange = (e) => {
    setNewUser({ ...newUser, email: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setNewUser({ ...newUser, password: e.target.value });
  };

  const handlePasswordConfirmationChange = (e) => {
    setNewUser({ ...newUser, password_confirmation: e.target.value });
  };

  return (
    <div className="login-wrapper">
      <div className="form-title-wrapper">
        <h2 className="form-title">REGISTER</h2>
        <p className="form-instructions">
          Please enter your email and create a secure password to get started.
        </p>
      </div>
      <div className="formbold-main-wrapper">
        <div className="formbold-form-wrapper">
          <form className="User-form" onSubmit={handleAddUser}>
            <div className="formbold-input-flex">
              <div>
                <input
                  type="email"
                  value={newUser.email}
                  onChange={handleEmailChange}
                  placeholder="Type email here..."
                  className="formbold-form-input"
                />
              </div>
              <div>
                <input
                  type="password"
                  value={newUser.password}
                  onChange={handlePasswordChange}
                  placeholder="Type password here..."
                  className="formbold-form-input"
                />
              </div>
              <div>
                <input
                  type="password"
                  value={newUser.password_confirmation}
                  onChange={handlePasswordConfirmationChange}
                  placeholder="Confirm password..."
                  className="formbold-form-input"
                />
              </div>
              <button
                className={`btn ${hasError ? "btn-error" : ""}`} // Apply btn-error class if hasError is true
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
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
      {errorMessage && <p className="error-message">{errorMessage}</p>}{" "}
      {/* Error message display */}
    </div>
  );
};

export default Register;
