import React from 'react'
import "./Home.css"
import { Link } from 'react-router-dom'
import Signup from './Signup'
import Login from './Login'

const Home = () => {
  return (
    <div className='Home-Container'>
        <h1>Do you want to write some code?</h1>
        <div className="home-bottom">
     <Link to="/signup" className="nav-link"><button>Code now</button></Link> 
        </div>
    </div>
    
    // <Signup/>
    // <Login/>

  
  )
}

export default Home
