import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { BiLoaderAlt, BiCheck, BiX } from "react-icons/bi";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess(false);

    if (!formData.email || !formData.password) {
      setError("Please fill all fields");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "https://linworkout-backend.onrender.com/user",
        formData
      );
      console.log(response.data);
      localStorage.setItem("user", JSON.stringify(response.data));
      setSuccess(true);
      // Redirect or update app state here
    } catch (error) {
      console.error(error);
      setError("Registration failed. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="register-header">
          <div className="flex justify-center">
            <img
              src="../imgs/bohan.png"
              alt="URAVITY logo"
              className="register-logo"
            />
          </div>

          {/* <h2 className="register-title">URAVITY</h2> */}
        </div>
        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            <label htmlFor="email">Name</label>
            <input
              type="text"
              id="name"
              className="form-control"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your Name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="register-button"
            disabled={isLoading}
          >
            {isLoading ? (
              <BiLoaderAlt className="icon-spin" />
            ) : success ? (
              <BiCheck className="icon-success" />
            ) : (
              "Register"
            )}
          </button>
        </form>
        {error && (
          <p className="error-message">
            <BiX className="icon-error" /> {error}
          </p>
        )}
        {success && (
          <p className="success-message">
            <BiCheck className="icon-success" /> Registration successful!
          </p>
        )}
        <div className="register-footer">
          <p>
            Already have an account?{" "}
            <Link to="/login" className="login-link">
              Sign in
            </Link>
          </p>
        </div>
      </div>
      <style>{`
        .register-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background-color: #1c1c1c;
        }

.register-card {
  background-color: #1c1c1c;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 
    0 4px 6px rgba(0, 0, 0, 0.3), /* Light shadow */
    0 10px 15px rgba(0, 0, 0, 0.2), /* Deeper shadow */
    0 15px 20px rgba(0, 0, 0, 0.1); /* Soft ambient shadow */
  width: 100%;
  max-width: 400px;
}


        .register-header {
          text-align: center;
          margin-bottom: 1rem;
          
        }

        .register-logo {
          width: 160px;
          height: 100px;
          border-radius: 50%;
          margin-bottom: 1rem;
        }

        .register-title {
          font-size: 1.5rem;
          font-weight: bold;
          color: #ff4d4d ;
        }

        .register-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
        }

        .form-group label {
          margin-bottom: 0.5rem;
          font-weight: 500;
          color: #d1d1d1;
        }

        .form-group input {
          padding: 0.5rem;
          border: 1px solid #ccc;
          border-radius: 4px;
          font-size: 1rem;
          background-color: #333;
          color: #d1d1d1;
        }

        .register-button {
          background-color: #dc3545;
          color: #d1d1d1;
          padding: 0.75rem;
          border: none;
          border-radius: 4px;
          font-size: 1rem;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        .register-button:hover {
          background-color: #e63946;
        }

        .register-button:disabled {
          background-color: #ccc;
          cursor: not-allowed;
        }

        .error-message {
          color: #d32f2f;
          margin-top: 1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .success-message {
          color: #388e3c;
          margin-top: 1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .register-footer {
          margin-top: 1rem;
          text-align: center;
        }

        .login-link {
          color: #ff4d4d ;
          text-decoration: none;
        }

        .login-link:hover {
          text-decoration: underline;
        }

        .icon-spin {
          animation: spin 1s linear infinite;
        }

        .icon-success {
          color: #388e3c;
        }

        .icon-error {
          color: #d32f2f;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @media (max-width: 768px) {
    .register-card {
      box-shadow: none;
    }
  }


      `}</style>
    </div>
  );
}

export default Register;
