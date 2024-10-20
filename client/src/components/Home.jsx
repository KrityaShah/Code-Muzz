import React from 'react'
import "./Home.css"
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className='Home-Container'>
        <h1>Do you want to write some code?</h1>
        <div className="home-bottom">
     <Link to="/code" className="nav-link"><button>Code now</button></Link> 
        </div>
    </div>
  )
}

export default Home
