import React from "react"
import Navbar from "./components/Navbar"
import Home from "./components/Home"
import Code from "./components/Code";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Home2 from "./components/Home2";
import Logout from "./components/Logout";
import GettingStarted from "./components/GettingStarted";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {

  return (
    <>  
  <Router>
    <Routes>
      <Route path="/" element={<><Navbar/><Home/></>}/>
      <Route path="/signup" element={<><Navbar/><Signup/></>}/>
      <Route path="/login" element={<><Navbar/><Login/></>}/>
      {/* <Route path="/editor" element={<><Editor/></>}/> */}


      <Route path='/logout' element={<><Logout/></>} />
      <Route path="/home2" element={<Home2/>}/>
      <Route path="/gettingstarted" element={<GettingStarted/>}/>
      <Route path="/code" element={<Code/>}/>
      
          
    </Routes>
  </Router>
    
  
 
    </>
  )
}

export default App
