import React, {useState} from "react";
import './App.css';
import {createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import CategoryContext from './CategoryContext';
import Home from "./Home/Home";
import Register from './Login/Register';
import Login from './Login/Login';
import Forum from './Forum/Forum';
import SearchResult from "./Searchbar/searchResult";
import Newpostmodal from './Newpostmodal/Newpostmodal';
import LikeButton from "./LikeButton/LikeButton";
import './App.css';

const router = createBrowserRouter(
  [
    { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/forum", element: <Forum /> },
      { path: "/searchResult", element: <SearchResult /> },
      { path: "/newpostmodal", element: <Newpostmodal /> },
      { path: "/totalLikes", element: <LikeButton /> },
      { path: "/totalDisikes", element: <LikeButton /> },
      { path: "/buttonStatus", element: <LikeButton /> },
      { path: "/updatePostsLikes", element: <LikeButton /> },
      { path: "/insertPost", element: <LikeButton /> },
      { path: "/addLike", element: <LikeButton /> },
      { path: "/subLike", element: <LikeButton /> },
      { path: "/addDisike", element: <LikeButton /> },
      { path: "/subDisike", element: <LikeButton /> },
  ],
  {
      future: {
      v7_relativeSplatPath: true, // Enables relative paths in nested routes
      v7_fetcherPersist: true,   // Retains fetcher state during navigation
      v7_normalizeFormMethod: true, // Normalizes form methods (e.g., POST or GET)
      v7_partialHydration: true, // Supports partial hydration for server-side rendering
      v7_skipActionErrorRevalidation: true, // Prevents revalidation when action errors occur
    },
  }
);

function App() {
  const [loginStatus, setLoginStatus] = useState(false);
  const [selectedShow, setSingleShow] = useState([]);
  return (
    <CategoryContext.Provider value={{loginStatus, setLoginStatus, selectedShow, setSingleShow}}>
      <RouterProvider future={{ v7_startTransition: true }} router={router} />
    </CategoryContext.Provider>
  );
}

export default App;