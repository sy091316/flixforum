import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from "./Home";
import Register from './Login/Register';
import Login from './Login/Login';
import ShowCard from './ShowCard';
import './App.css';

function App() {
  return (
    <>
    {/* This is the alias of BrowserRouter i.e. Router */}
    <Router>
      <Routes>
          {/* This route is for home component 
          with exact path "/", in component props 
          we passes the imported component*/}
          <Route exact path='/' element={
            <>
              <Home/>
              <ShowCard/>
            </>
            }>
          </Route>
          {/* route links to the login page */}
          <Route exact path='/login' element={<Login/>}></Route>
          {/* route links to the register page */}
          <Route exact path='/register' element={<Register/>}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;