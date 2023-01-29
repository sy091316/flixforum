import logo from './logo.svg';
import './App.css';
import React, { useState } from "react";
//import logo from './logo.svg';
import './App.css';
import { Login } from "./Login";
import { Register } from "./Register";

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

// import Home component
import Home from "./Home";



function App() {
  const [currentForm, setCurrentForm] = useState('login');

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }
  /*
     
    <div className="App">
      {
        currentForm === "login" ? <Login onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm} />
        
      }
    </div>
  */

  return (
    
    <>
    {/* This is the alias of BrowserRouter i.e. Router */}
    <Router>
      <Routes>
          {/* This route is for home component 
          with exact path "/", in component props 
          we passes the imported component*/}
          <Route exact path="/home" element={<Home/>}/>
          <Route exact path="/login" element={<Login/>}/>
        </Routes>
      </Router>
      <div className="App">
    {
      currentForm === "login" ? <Login onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm} />
      
    }
    
  </div>
    </>

  );
}

export default App;
/*
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
		  Flix Forum Website Current Homepage
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
*/