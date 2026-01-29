import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../feature/auth/authSlice";
import { useNavigate } from "react-router-dom";
import "./Login.css"


const Login = () => {
  const [form, setForm] = useState({ username: "", password: "" });

  const { isAuthenticated, loading, error } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redirect after login
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(form));
  };

  return (
    <div className="login-container">
      <div className="login-box">

        {/* Netflix Text Logo */}
        <h1 className="login-logo">
          NETFLIX
        </h1>

        <h2 className="login-title">
          Sign In
        </h2>

        {error && (
          <div className="login-error">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="text"
            name="username"
            placeholder="Email or username"
            value={form.username}
            onChange={handleChange}
            required
            className="login-input"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="login-input"
          />

          <button
            type="submit"
            // disabled={loading}
            className="login-button"
          >Sign In
            {/* {loading ? <Loader size={18} /> : "Sign In"} */}
          </button>
        </form>

        <div className="login-options">
          <label>
            <input type="checkbox" />
            Remember me
          </label>
          <span className="help-link">
            Need help?
          </span>
        </div>

        <p className="signup-text">
          New to Netflix?{" "}
          <span className="text-white hover:underline cursor-pointer">
            Sign up now
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
