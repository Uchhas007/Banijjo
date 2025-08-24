import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    // assigning the state variable user
    // user state will only now store the signup form fields in JSON format {key:val}
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    type: "Basic",
  });

  // creating the user object by putting the values 
  const { name, username, email, password, confirmPassword } = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try { // error handling
      await axios.post("http://localhost:8080/user", user); // telling the axios to post the data (i.e. the user object) in the backend's provided route /user 
      navigate("/"); // redirect to Homepage
      //Backend saves it to DB (via UserController + UserRepository)
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <>
      <style>{`
        .signup-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background-color: #f0f2f5;
          padding: 2rem;
        }
        .signup-form {
          background: white;
          padding: 2.5rem;
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          max-width: 400px;
          width: 100%;
        }
        .signup-form h2 {
          text-align: center;
          margin-bottom: 2rem;
          color: #333;
          font-weight: 600;
        }
        .form-label {
          font-weight: 500;
          color: #555;
          margin-bottom: 0.5rem;
        }
        .form-control {
          border-radius: 8px;
          border: 1px solid #ddd;
          padding: 0.75rem 1rem;
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .form-control:focus {
          border-color: #007bff;
          box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
          outline: none;
        }
        .form-text {
          color: #777;
          font-size: 0.875rem;
        }
        .btn-primary {
          width: 100%;
          padding: 0.75rem;
          border-radius: 8px;
          background-color: #007bff;
          border: none;
          font-weight: 500;
          transition: background-color 0.3s ease, transform 0.2s ease;
        }
        .btn-primary:hover {
          background-color: #0056b3;
          transform: translateY(-2px);
        }
        .mb-4 {
          margin-bottom: 1.5rem !important;
        }
      `}</style>

      <div className="signup-container">
        <form onSubmit={onSubmit} className="signup-form">
          <h2>Create Account</h2>

          <div className="mb-4">
            <label htmlFor="name" className="form-label">
              Full Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              placeholder="Enter your full name"
              required
              value={name}
              onChange={onInputChange}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              placeholder="Enter your username"
              required
              value={username}
              onChange={onInputChange}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              placeholder="Enter your email"
              required
              value={email}
              onChange={onInputChange}
            />
            <div className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              placeholder="Create a password"
              required
              minLength={6}
              value={password}
              onChange={onInputChange}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm your password"
              required
              minLength={6}
              value={confirmPassword}
              onChange={onInputChange}
            />
          </div>

          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-primary">
              Sign Up
            </button>
            <button
              type="button"
              className="btn btn-link"
              onClick={() => console.log("/signin")}
            >
              Already a member?
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignUp;
