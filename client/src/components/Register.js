import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
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

  const handleAddUser = async (e) => {
    e.preventDefault();

    // Reset error message before each submission
    setErrorMessage("");

    // Check if passwords match
    if (newUser.password !== newUser.password_confirmation) {
      setErrorMessage("Passwords do not match.");
      return; // Exit early if passwords do not match
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
        return; // Exit early if there's an error
      }

      window.location = "/login"; // Redirect on successful registration
    } catch (error) {
      console.error(error);
      setErrorMessage("An error occurred while registering. Please try again."); // General error message
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
              <button className="btn" type="submit">
                <FontAwesomeIcon icon={faArrowRight} />
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="account-link">
        <p>
          Already have an account? <Link to="/login">Log in</Link>{" "}
          {/* Use Link for navigation */}
        </p>
      </div>
      {errorMessage && <p className="error-message">{errorMessage}</p>}{" "}
      {/* Display error message snugly under input */}
    </div>
  );
};

export default Register;
