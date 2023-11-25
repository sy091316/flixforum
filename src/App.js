import React, {useState} from "react";
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import CategoryContext from './CategoryContext';
import Home from "./Home/Home";
import Register from './Login/Register';
import Login from './Login/Login';
import Forum from './Forum/Forum';
import SearchResult from "./Searchbar/searchResult";
import Newpostmodal from './Newpostmodal/Newpostmodal';
import LikeButton from "./LikeButton/LikeButton";
import './App.css';

function App() {
  const [loginStatus, setLoginStatus] = useState(false);
  const [selectedShow, setSingleShow] = useState([]);
  return (
    <>
      <Router>
        <CategoryContext.Provider value={{loginStatus, setLoginStatus, selectedShow, setSingleShow}}>
          <Routes>
            <Route exact path='/' element={<Home/>}/>
            <Route exact path='/login' element={<Login/>}/>
            <Route exact path='/register' element={<Register/>}/>
            <Route exact path='/forum' element={<Forum/>}/>
            <Route exact path='/searchResult' element={<SearchResult/>}/>
            <Route exact path='/newpostmodal' element={<Newpostmodal/>}/>
            <Route exact path='/totalLikes' element={<LikeButton/>}/>
            <Route exact path='/totalDisikes' element={<LikeButton/>}/>
            <Route exact path='/buttonStatus' element={<LikeButton/>}/>
            <Route exact path='/updatePostsLikes' element={<LikeButton/>}/>
            <Route exact path='/insertPost' element={<LikeButton/>}/>
            <Route exact path='/addLike' element={<LikeButton/>}/>
            <Route exact path='/subLike' element={<LikeButton/>}/>
            <Route exact path='/addDisike' element={<LikeButton/>}/>
            <Route exact path='/subDisike' element={<LikeButton/>}/>
          </Routes>
        </CategoryContext.Provider>
      </Router>
    </>
  );
}

export default App;