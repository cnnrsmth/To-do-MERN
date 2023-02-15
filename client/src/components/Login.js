/*Login component responsible for logging the user in, ensuring valid credentials are stored in the database
and that the JWT is authenticated.*/

import React, { useState } from 'react';
import "./register.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const Login = () => {

    const [confirmUser, setConfirmUser] = useState({
        "email": "",
        "password": "",
    })

    const handleConfirmUser = async (e) => {
        e.preventDefault();
            try {
                const response = await fetch('http://localhost:8080/todos/login', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(confirmUser),
                })
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                //sets token response from api to local storage, to persist for the users session
                localStorage.setItem("token", data.accessToken)
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

    return(
        <div className="login-wrapper">
            <h2 className="form-title">Login</h2>
            <div className="formbold-main-wrapper">
                <div className="formbold-form-wrapper">
                    <form className="User-form" onSubmit={handleConfirmUser}>
                        <div className="formbold-input-flex">
                            <div>
                                {/* <label className="formbold-form-label">
                                    Email:
                                </label> */}
                                <input
                                    type="email"
                                    value={confirmUser.email}
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
        </div>
    )
}

export default Login;