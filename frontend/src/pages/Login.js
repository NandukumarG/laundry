import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import loginBg from "../assets/login-bgg.png";
import axios from "../api";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    // If already logged in, redirect to home
    if (localStorage.getItem("isLoggedIn") === "true") {
      navigate("/HomePage", { replace: true });
    }
  }, [navigate]);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "/api/users/login",
        {
          email: formData.email,
          password: formData.password,
        }
      );


      // Make sure to set these BEFORE navigation
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("isLoggedIn", "true");
      console.log("Login state set:", localStorage.getItem("isLoggedIn")); // Debug log

      toast.success("Login successful!");
      console.log("Navigating to HomePage..."); // Debug log
      window.location.replace("/HomePage");
    } catch (error) {
      if (error.response) {
        console.error("Login failed:", error.response.data);
        toast.error(
          `Login failed: ${
            error.response.data.message || error.response.statusText
          }`
        );
      } else if (error.request) {
        console.error("No response received:", error.request);
        toast.error("No response received from the server. Please try again.");
      } else {
        console.error("Request setup error:", error.message);
        toast.error("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center vh-100 bg-container">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <div className="row w-75 shadow-lg custom-rounded">
        <div className="col-md-6 p-0 bg-info-subtle">
          <img src={loginBg} alt="Laundry Illustration" className="img-fluid" />
        </div>

        <div className="col-md-6 p-6 bg-info-subtle right-container">
          <h2 className="text-dark fw-bold text-center">WELCOME</h2>
          <p className="text-center text-muted">
            <em>Sign in to your account</em>
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="email"
                className="form-control bg-light"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-control bg-light"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100 fw-bold">
              Log In
            </button>
          </form>
          <p className="mt-3 text-center">
            Don't have an account?{" "}
            <a href="/Signup" className="fw-bold text-dark">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
