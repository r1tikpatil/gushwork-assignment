import React, { useState, useContext } from "react";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import "./login.styles.scss";

import Loader from "../../common/components/Loader/Loader";
import { login } from "../../APIs/authAPIs";
import { AuthContext } from "../../context/auth.context";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { setIsLoggedIn } = useContext(AuthContext);

  async function loginHandler() {
    try {
      setIsLoading(true);
      const res = await login(formData);
      if (res.success) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        toast.success("Logged In Successfully 😊");
        setIsLoggedIn(true);
        navigate("/books/allBooks");
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  function changeHandler(event) {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  return (
    <div className="log-container" data-aos="fade-right" data-dos-delay="10">
      <h2 className="log-heading">Login</h2>

      <div className="log-form">
        <h4 className="log-type">Login</h4>

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={changeHandler}
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={changeHandler}
          required
        />

        <button onClick={loginHandler}>Log in</button>

        {isLoading && (
          <div className="loader-container">
            <Loader />
          </div>
        )}

        <h5>Not Registered Yet?</h5>
        <Link to="/signup">
          <span className="btn">SignUp</span>
        </Link>
      </div>
    </div>
  );
}
