import React from 'react'
import "./Navbar.css"
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
   <nav>
    <h1>Code-Editor</h1>
    <ul>
       <Link to="/" className="nav-link"><li className="nav-item">Home</li></Link> 
       <Link to="/profile" className="nav-link"><li className="nav-item">Profile</li></Link> 
       <Link to="/code" className="nav-link"><li className="nav-item">Code</li></Link> 
       <Link to="/" className="nav-link"><li className="nav-item">Logout</li></Link> 
    </ul>
   </nav>
  )
}

export default Navbar
