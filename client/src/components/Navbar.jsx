import React from 'react'
import "./Navbar.css"
import { Link } from 'react-router-dom'
import { useAuth } from '../../store/auth'

const Navbar = () => {
  const {isLoggedIn} = useAuth();
  return (
   <nav>
    <h1>Code-Editor</h1>
    <ul>
      {isLoggedIn? <>
      
        <Link to="/home2" className="nav-link"><li className="nav-item">Home</li></Link> 
        <Link to="/profile" className="nav-link"><li className="nav-item">Profile</li></Link> 
        <Link to="" className="nav-link"><li className="nav-item">Explore</li></Link> 
        <Link to="/logout" className="nav-link"><li className="nav-item">Logout</li></Link> 
      
      
      </>
      : <>
       <Link to="/" className="nav-link"><li className="nav-item">Home</li></Link> 
       <Link to="/login" className="nav-link"><li className="nav-item">Login</li></Link> 
      </>}
    </ul>
   </nav>
  )
}

export default Navbar
