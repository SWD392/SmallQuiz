import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import axiosInstance from "../api/axiosInstance";
import jwt_decode from "jwt-decode";
export default function List_question() {
  const [info, setInfo] = useState([]);
  const [record, setRecord] = useState();
  const token = localStorage.getItem("token");
  


  // useEffect(() => {
  //   axios.get("http://localhost:8081/admin/listQuestions").then((res) => {
  //     setInfo(res.data);
  //   });
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        axiosInstance.get("/admin/listQuestions").then((response) => {
          setInfo(response.data);
        });
      } catch (error) {}
    };

    fetchData();
  }, []);
  const nagative = useNavigate();

  

  const handleLogout = () => {
    localStorage.removeItem("token");
    nagative("/list_question");
  };

  

  console.log(info);
  return (
    <div>
 
        <div>
          <div>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
              <a class="navbar-brand" href="#">
                Navbar
              </a>
              <button
                class="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                  {token ? (
                    <li onClick={handleLogout} class="nav-item active">
                      <Link to="/login" class="nav-link" href="#">
                        Log out <span class="sr-only">(current)</span>
                      </Link>
                    </li>
                  ) : (
                    <li class="nav-item active">
                      <Link to="/login" class="nav-link" href="#">
                        Log in <span class="sr-only">(current)</span>
                      </Link>
                    </li>
                  )}
                  <li class="nav-item">
                    <a class="nav-link" href="#">
                      Features
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#">
                      Pricing
                    </a>
                  </li>
                  <li class="nav-item">
                    <a
                      class="nav-link disabled"
                      href="#"
                      tabindex="-1"
                      aria-disabled="true"
                    >
                      Disabled
                    </a>
                  </li>
                </ul>
              </div>
            </nav>
            {
              info[0].content
            }
            <footer className="footer">
              <div className="row align-items-center justify-content-xl-between">
                <div className="col-xl-6 m-auto text-center">
                  <div className="copyright">
                    <p>
                      Made with{" "}
                      <a
                        href="https://www.creative-tim.com/product/argon-dashboard"
                        target="_blank"
                      >
                        Argon Dashboard
                      </a>{" "}
                      by Creative Tim
                    </p>
                  </div>
                </div>
              </div>
            </footer>
          </div>
          <ToastContainer />
        </div>
      
    </div>
  );
}
