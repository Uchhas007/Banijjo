import React from "react";

const SignIn = () => {
  return (
    <>
      <style>{`
        body, html {
          height: 100%;
          background: linear-gradient(135deg, #1e3c72, #2a5298);
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        .signin-container {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 1rem;
        }
        .signin-form {
          background: #fff;
          padding: 2.5rem 2rem;
          border-radius: 12px;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
          width: 100%;
          max-width: 400px;
        }
        .signin-form h2 {
          margin-bottom: 1.5rem;
          font-weight: 700;
          color: #1e3c72;
          text-align: center;
        }
        .form-label {
          font-weight: 600;
          color: #34495e;
        }
        .form-control {
          border-radius: 8px;
          border: 1.5px solid #ced4da;
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .form-control:focus {
          border-color: #1e3c72;
          box-shadow: 0 0 8px rgba(30, 60, 114, 0.5);
          outline: none;
        }
        .btn-primary {
          width: 100%;
          background: #1e3c72;
          border: none;
          font-weight: 600;
          padding: 0.75rem;
          border-radius: 8px;
          transition: background 0.3s ease;
        }
        .btn-primary:hover {
          background: #162c52;
        }
        .form-text {
          color: #7f8c8d;
          font-size: 0.85rem;
          margin-top: 0.25rem;
        }
      `}</style>

      <div className="signin-container">
        <form className="signin-form">
          <h2>Sign In</h2>

          <div className="mb-4">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter your email"
              required
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
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="role" className="form-label">
              Select your role
            </label>
            <select className="form-select" id="role" required>
              <option value="" disabled selected>
                Choose role...
              </option>
              <option value="user">User</option>
              <option value="broker">Broker</option>
            </select>
          </div>

          <div className="mb-4 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="rememberMe"
            />
            <label className="form-check-label" htmlFor="rememberMe">
              Remember me
            </label>
          </div>

          <button type="submit" className="btn btn-primary">
            Sign In
          </button>
        </form>
      </div>
    </>
  );
};

export default SignIn;
