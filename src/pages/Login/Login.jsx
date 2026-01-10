import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../feature/auth/authSlice";
import { useNavigate } from "react-router-dom";


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
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="w-full max-w-md bg-black bg-opacity-80 p-8 rounded-md">

        {/* Netflix Text Logo */}
        <h1 className="text-red-600 text-3xl font-bold mb-8">
          NETFLIX
        </h1>

        <h2 className="text-white text-2xl font-semibold mb-6">
          Sign In
        </h2>

        {error && (
          <div className="bg-red-600 text-white p-3 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Email or username"
            value={form.username}
            onChange={handleChange}
            required
            className="w-full p-4 bg-gray-800 text-white rounded outline-none focus:bg-gray-700"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full p-4 bg-gray-800 text-white rounded outline-none focus:bg-gray-700"
          />

          <button
            type="submit"
            // disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded font-semibold flex justify-center items-center"
          >Sign In
            {/* {loading ? <Loader size={18} /> : "Sign In"} */}
          </button>
        </form>

        <div className="flex justify-between text-gray-400 text-sm mt-4">
          <label className="flex items-center gap-1">
            <input type="checkbox" />
            Remember me
          </label>
          <span className="hover:underline cursor-pointer">
            Need help?
          </span>
        </div>

        <p className="text-gray-400 text-sm mt-6">
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
