import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/AuthStyles.css";

function Login({ setUser }) {
  const [credentials, setCredentials] = useState({
    email: "",
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

  const validateEmail = (email) => {
    const errors = [];
    const disposableDomains = ['tempmail.com', 'throwaway.com']; // Ideally, use a maintained list

    if (!email || typeof email !== 'string') {
        errors.push("Email is required");
        return errors;
    }

    // Normalize email
    const normalizedEmail = email.trim();

    // Check email length
    if (normalizedEmail.length < 6 || normalizedEmail.length > 254) {
        errors.push("Email must be between 6 and 254 characters");
        return errors;
    }

    // Basic regex validation
    const basicEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!basicEmailRegex.test(normalizedEmail)) {
        errors.push("Please enter a valid email address");
    }

    // Check for disposable domains
    const domain = normalizedEmail.split('@')[1];
    if (disposableDomains.includes(domain)) {
        errors.push("Please use a non-disposable email address");
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
      name === "email" ? validateEmail(value) : validatePassword(value);

    setErrors((prev) => ({ ...prev, [name]: validationErrors }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Final validation before submission
    const emailErrors = validateEmail(credentials.email);
    const passwordErrors = validatePassword(credentials.password);

    if (emailErrors.length || passwordErrors.length) {
      setErrors({
        email: emailErrors,
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
            placeholder="Enter email"
            value={credentials.email}
            onChange={handleChange}
            autoComplete="email"
            name="email"
          />
          {errors.email?.map((error, i) => (
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
