import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import "./signUp.styles.scss";
import Loader from "../../common/components/Loader/Loader";
import { signUp } from "../../APIs/authAPIs";

export default function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  async function signUpHandler(event) {
    event.preventDefault();

    if (formData.password.length < 8) {
      toast.error("Password must be at least 8 characters long.");
      return;
    }

    try {
      setIsLoading(true);
      const res = await signUp(formData);
      if (res.success) {
        toast.success("Account Created Successfully 😊");
        navigate("/signin");
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  function changeHandler(event) {
    const { name, value, checked, type } = event.target;

    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  }

  return (
    <div className="log-container" data-aos="fade-right" data-dos-delay="10">
      <h2 className="log-heading">Sign Up</h2>

      <form className="log-form" onSubmit={signUpHandler}>
        <h4>Sign Up</h4>

        <label htmlFor="username">Name:</label>
        <input
          type="text"
          id="username"
          name="name"
          value={formData.name}
          onChange={changeHandler}
          required
        />

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

        <button type="submit">Sign Up</button>

        {isLoading && (
          <div className="loader-container">
            <Loader />
          </div>
        )}

        <div>
          <h5>Already Signed Up?</h5>
          <Link to="/signin">
            <span className="btn">Login</span>
          </Link>
        </div>
      </form>
    </div>
  );
}
