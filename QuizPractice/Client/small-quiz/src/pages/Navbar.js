import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "./menu.css";
export const Navbar = ({handleLogout}) => {

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="container px-5">
      <a className="navbar-brand" href="#!">Small Quiz</a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon" /></button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
          <li className="nav-item"><Link to='/home' className="nav-link" aria-current="page" href="#!">Home</Link></li>
          <li className="nav-item"><Link to='/quiz' className="nav-link" aria-current="page" href="#!">Take Quiz</Link></li>
          <li className="nav-item"><Link to='/' className="nav-link" aria-current="page" href="#!">View Quiz</Link></li>
          <li className="nav-item"><Link to='/login' className="nav-link" onClick={handleLogout}>LogIn</Link></li>
        </ul>
      </div>
    </div>
  </nav>
  )
}
