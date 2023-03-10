/*Login component is responsible for registering the user. It makes a call to an api to store user details
in a database. Confirmation password is not stored in db, but is checked for validity. Password is hashed
before being stored for security reasons (this happens in the backend).*/

import React, { useState } from 'react';
import "./register.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const Register = () => {

    const [newUser, setNewUser] = useState({
        "email": "",
        "password": "",
        "password_confirmation": ""
    })

    const handleAddUser = async (e) => {
        e.preventDefault();
        if (newUser.password === newUser.password_confirmation){
            try {
                await fetch('http://localhost:8080/todos/register', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newUser),
                });
                window.location = "/login"
            } catch (error) {
                console.error(error);
            }
        }else{
            alert("password confirmation incorrect")
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

    return(
        <div className="login-wrapper">
            <h2 className="form-title">Register</h2>
            <div className="formbold-main-wrapper">
                <div className="formbold-form-wrapper">
                    <form className="User-form" onSubmit={handleAddUser}>
                        <div className="formbold-input-flex">
                            <div>
                                {/* <label className="formbold-form-label">
                                    Email:
                                </label> */}
                                <input
                                    type="email"
                                    value={newUser.email}
                                    onChange={handleEmailChange}
                                    placeholder="Type email here..."
                                    className="formbold-form-input"
                                />
                            </div>
                            <div>
                                {/* <label className="formbold-form-label">
                                    Password:
                                </label> */}
                                <input
                                    type="password"
                                    value={newUser.password}
                                    onChange={handlePasswordChange}
                                    placeholder="Type password here..."
                                    className="formbold-form-input"
                                />
                            </div>
                            <div>
                                {/* <label className="formbold-form-label">
                                    Password:
                                </label> */}
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
        </div>
    )
}

export default Register;