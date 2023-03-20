import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./menu.css";
import jwt_decode from "jwt-decode";
import { getInfoUser } from "../service/requestAPI";
export const Navbar = () => {
  const nagative = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userid");
    nagative("/");
  };

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const [info, setInfo] = useState("");

  const decode = token ? jwt_decode(token) : null;
  useEffect(() => {
    const fetchInfo = async () => {
      const username = decode.sub;
      const infoData = await getInfoUser(username);
      setInfo(infoData);
    };

    fetchInfo();
  }, []);

  console.log(info);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container px-5">
        <a className="navbar-brand" href="#!">
          Small Quiz
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                to="/home"
                className="nav-link"
                aria-current="page"
                href="#!"
              >
                Home
              </Link>
            </li>
            {!token ? (
              <li className="nav-item">
                <Link
                  to="/login"
                  className="nav-link"
                  aria-current="page"
                  href="#!"
                >
                  Login
                </Link>
              </li>
            ) : (
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="/"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Hello {info.firstName} {info.lastName}
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <Link to="/changepassword" className="dropdown-item">
                      Change Password
                    </Link>
                  </li>

                  {role === "ROLE_ADMIN" ? (
                    <li>
                      <Link to="/list_question" className="dropdown-item">
                        List Question
                      </Link>
                    </li>
                  ) : (
                    <li>
                      <Link to="/viewusertest" className="dropdown-item">
                        View Test History
                      </Link>
                    </li>
                  )}
                  <li>
                    <p
                      onClick={handleLogout}
                      style={{ margin: "0", cursor: "pointer" }}
                      className="dropdown-item"
                    >
                      Logout
                    </p>
                  </li>
                </ul>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
