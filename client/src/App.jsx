import React from "react"
import Navbar from "./components/Navbar"
import Home from "./components/Home"
import Code from "./components/Code";
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
      <Route path="/code" element={<><Navbar/><Code/></>}/>
      {/* <Route path="/editor" element={<><Editor/></>}/> */}
    </Routes>
  </Router>
    
  
 
    </>
  )
}

export default App
