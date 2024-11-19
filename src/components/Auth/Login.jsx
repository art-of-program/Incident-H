import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/AuthStyles.css";

function Login({ setUser }) {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  // Password validation rules
  const passwordRules = {
    minLength: 12,
    hasUpperCase: /[A-Z]/,
    hasLowerCase: /[a-z]/,
    hasNumber: /[0-9]/,
    hasSpecial: /[!@#$%^&*(),.?":{}|<>]/,
  };

  const validateUsername = (username) => {
    const errors = [];

    // Prevent XSS by disallowing HTML/script characters
    if (/[<>/"'&]/.test(username)) {
      errors.push("Username contains invalid characters");
    }

    // Username length and allowed characters
    if (username.length < 3 || username.length > 30) {
      errors.push("Username must be between 3 and 30 characters");
    }

    if (!/^[a-zA-Z0-9._-]+$/.test(username)) {
      errors.push(
        "Username can only contain letters, numbers, dots, underscores and hyphens"
      );
    }

    return errors;
  };

  const validatePassword = (password) => {
    const errors = [];

    if (password.length < passwordRules.minLength) {
      errors.push(
        `Password must be at least ${passwordRules.minLength} characters long`
      );
    }

    if (!passwordRules.hasUpperCase.test(password)) {
      errors.push("Password must contain at least one uppercase letter");
    }

    if (!passwordRules.hasLowerCase.test(password)) {
      errors.push("Password must contain at least one lowercase letter");
    }

    if (!passwordRules.hasNumber.test(password)) {
      errors.push("Password must contain at least one number");
    }

    if (!passwordRules.hasSpecial.test(password)) {
      errors.push("Password must contain at least one special character");
    }

    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));

    // Real-time validation
    const validationErrors =
      name === "username" ? validateUsername(value) : validatePassword(value);

    setErrors((prev) => ({ ...prev, [name]: validationErrors }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Final validation before submission
    const usernameErrors = validateUsername(credentials.username);
    const passwordErrors = validatePassword(credentials.password);

    if (usernameErrors.length || passwordErrors.length) {
      setErrors({
        username: usernameErrors,
        password: passwordErrors,
      });
      return;
    }

    //Dummy authentication
    // if (credentials.username && credentials.password) {
    //   setUser({ username: credentials.username, id: Date.now() });
    //   navigate("/");
    // } else {
    //   return errors;
    // }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter username"
            value={credentials.username}
            onChange={handleChange}
            autoComplete="username"
            name="username"
          />
          {errors.username?.map((error, i) => (
            <li
              style={{
                color: "red",
                fontSize: "12px",
                fontFamily: "-moz-initial",
              }}
              key={i}
            >
              {error}
            </li>
          ))}
          <input
            type="password"
            placeholder="Enter password"
            value={credentials.password}
            onChange={handleChange}
            autoComplete="new-password"
            name="password"
          />
          {errors.password?.map((error, i) => (
            <li
              style={{
                color: "red",
                fontSize: "12px",
                fontFamily: "-moz-initial",
              }}
              key={i}
            >
              {error}
            </li>
          ))}
          <button type="submit">Login</button>
        </form>
        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
