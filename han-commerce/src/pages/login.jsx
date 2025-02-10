import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BiLoaderAlt, BiCheck, BiX } from "react-icons/bi";
import { localCall } from "../utilities/localstorage";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // useState Declaration
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [requireEmail, setRequireEmail] = useState(false);
  const [requirePassword, setRequirePassword] = useState(false);
  const [noUser, setNoUser] = useState(false);
  const [incorrectPassword, setIncorrectPassword] = useState(false);
  // declaring navigate
  const navigate = useNavigate();
  // functions
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validation = () => {
    setIncorrectPassword(false);
    setRequireEmail(false);
    setRequirePassword(false);
    setNoUser(false);
    if (formData.email == "") {
      setRequireEmail(true);
    }
    if (formData.password == "") {
      setRequirePassword(true);
    }
    if (requireEmail == true || requirePassword == true) {
      return;
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    validation();
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
        "http://127.0.0.1:8000/api/userLogin",
        formData
      );
      console.log(response.data);
      if (response.data.status == "true") {
        localCall("setUser", response.data.data);
        localCall("setToken", response.data.api_key);
        setSuccess(true);
      } else {
        if (response.data.data == "Incorrect User Email") {
          setNoUser(true);
          return;
        } else {
          setIncorrectPassword(true);
          return;
        }
      }

      setSuccess(true);
      // Redirect or update app state here
    } catch (error) {
      console.error(error);
      setError("Registration failed. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };
  // useEffect

  useEffect(() => {
    const token = localStorage.getItem("han-commerce-token");
    if (token) {
      navigate("/");
    }
  }, []);
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
            {requireEmail && (
              <small className=" block text-red-500">Email is Required.</small>
            )}
            {noUser && (
              <small className=" block text-red-500">
                The Email is not registered yet!
              </small>
            )}
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
            {requirePassword && (
              <small className=" block text-red-500">
                Password is Required!
              </small>
            )}
            {incorrectPassword && (
              <small className=" block text-red-500">
                Your password is incorrect
              </small>
            )}
          </div>
          <button
            type="submit"
            className={`register-button flex justify-center  disabled:bg-red-400 ${
              success ? "bg-violet-900" : "bg-red-600"
            }`}
            disabled={isLoading}
          >
            {isLoading ? (
              <BiLoaderAlt className="icon-spin" />
            ) : success ? (
              <BiCheck className="icon-success" />
            ) : (
              "Log In"
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
            <BiCheck className="icon-success" /> Login successful!
          </p>
        )}
        <div className="register-footer">
          <p>
            Don't have an account?{" "}
            <Link to="/register" className="login-link">
              Sign up
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

          color: #d1d1d1;
          padding: 0.75rem;
          border: none;
          border-radius: 4px;
          font-size: 1rem;
          cursor: pointer;
          transition: background-color 0.3s;
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

export default Login;
