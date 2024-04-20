import React, { useEffect, useState, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {} from "../../../context/auth.context";
import { AuthContext } from "../../../context/auth.context";

import "./navbar.scss";

const Navbar = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const fetchData = async () => {
    const user = localStorage.getItem("user");
    if (user) {
      setIsLoggedIn(true);
    }
  };

  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    toast.success("Logged Out 👋");
    navigate("/");
  };

  useEffect(() => {
    fetchData();
  }, [isLoggedIn]);

  return (
    <nav>
      <div className="nav" data-aos="zoom-in-down" data-dos-delay="20">
        <Link to="/">
          <div className="logo">Book Reviewer</div>
        </Link>
        <div className={`links-and-buttons open}`}>
          <div className="auth-section">
            {!isLoggedIn && (
              <>
                <Link to="/signin">
                  <button>Login</button>
                </Link>

                <Link to="/signup">
                  <button>SignUp</button>
                </Link>
              </>
            )}

            {isLoggedIn && (
              <>
                <Link to="books/allBooks">
                  <button>See Books</button>
                </Link>
                <Link to="books/add">
                  <button>Add Book</button>
                </Link>

                <Link to="/" onClick={handleLogOut}>
                  <button1 className="bg-red-500 pointer px-[9px] py-[4px] rounded-[4px] ml-[10px] hover:bg-red-800">
                    Logout
                  </button1>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
