import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import SignupBg from "../assets/login-bgg.png";
import "./Signup.css";
import axios from "../api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Signup() {
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        "/api/users/register",
        {
          fullName: formData.fullName,
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }
      );
      console.log("User registered:", response.data);
      toast.success("Registration successful!");
    } catch (error) {
      if (error.response) {
        console.error("Registration failed:", error.response.data);
        toast.error(
          `Registration failed: ${
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
      <div className="row w-75 shadow-lg custom-rounded bg-overlay">
        {/* Left Side: Image & Branding */}
        <div className="col-md-6 p-0 bg-info-subtle">
          <img
            src={SignupBg}
            alt="Laundry Illustration"
            className="img-fluid"
          />
        </div>

        {/* Right Side: Signup Form */}
        <div className="col-md-6 p-5 bg-info-subtle">
          <h2 className="text-dark fw-bold text-center">SIGN UP</h2>
          <p className="text-center text-muted">
            <em>Create your free account</em>
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="text"
                className="form-control bg-light"
                placeholder="Full Name"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control bg-light"
                placeholder="Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
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
            <div className="mb-3">
              <input
                type="password"
                className="form-control bg-light"
                placeholder="Confirm Password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-check mb-3">
              <input
                type="checkbox"
                className="form-check-input"
                id="terms"
                required
              />
              <label className="form-check-label" htmlFor="terms">
                I agree to <span className="fw-bold">Terms of User</span>
              </label>
            </div>

            <button type="submit" className="btn btn-primary w-100 fw-bold">
              Create Account
            </button>
          </form>

          <p className="mt-3 text-center">
            Already have an account?{" "}
            <a href="/Login" className="fw-bold text-dark">
              Log in
            </a>
          </p>
        </div>
      </div>

      {/* Toastify Container */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default Signup;
