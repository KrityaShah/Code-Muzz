import React from 'react'
import "./Home2.css"
import { Link } from 'react-router-dom'
import Navbar from './Navbar'


const Home2 = () => {
  return <>
  <Navbar/>
    <div className='Home2-Container'>
    <h1>Do you want to write some code?</h1>
    <div className="home2-bottom">
 <Link to="/gettingstarted" className="nav-link"><button>Code now</button></Link> 
    </div>
</div>

  </>
}

export default Home2
