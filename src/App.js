import React, {useState} from "react";
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import CategoryContext from './CategoryContext';
import Home from "./Home";
import Register from './Login/Register';
import Login from './Login/Login';



function App() {

  const [loginStatus, setLoginStatus] = useState(false);

  return (
    <>
    {/* This is the alias of BrowserRouter i.e. Router */}
    <Router>
      <Routes>
          {/* This route is for home component 
          with exact path "/", in component props 
          we passes the imported component*/}
          <Route exact path='/' element={
            <CategoryContext.Provider value={{loginStatus, setLoginStatus}}>
              <Home/>
            </CategoryContext.Provider>}>
          </Route>
          <Route exact path='/login' element={
            <CategoryContext.Provider value={{loginStatus, setLoginStatus}}>
              <Login/>
            </CategoryContext.Provider>}>
          </Route>
          <Route exact path='/register' element={<Register/>}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;