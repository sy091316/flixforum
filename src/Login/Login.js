import React, { useState, useContext } from "react";
import Axios from 'axios'
import { Link, useNavigate } from "react-router-dom";
import "./Loginpage.css";
import CategoryContext from "../CategoryContext";
import Logo from "../Logo/logo";



export const Login = () => {
    //store email, and password users typed on the Login Page
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const navigate = useNavigate();

    //Check if email and password users entered on the Login Page match (Register)
    const login = () => {
        Axios.post("http://localhost:3001/login", {
          email: email,
          password: pass,
        }).then((response) => {
            // If user's email and password does NOT match
            if(response.data.message) {
                // console.log(response.data.message);
            } else {
                // If user's email and password does match, it navigates to the Home page
                localStorage.setItem('member', JSON.stringify(response.data[0].id))
                navigate('/');
            }
        });
    }
   

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
        console.log(pass);
    }
 
    return (
    <>   
    {/* Logo */}
    <div className = "logo-button"><Logo/></div>
    {/* Login Page */}
        <div className="Register-Login">
            {/* Login Page - Container that has email, password input */}
            <div className="auth-form-container">
                {/* Login Page - Title */}
                <h2>Login</h2>
                <form action='/Home' className="login-form" onSubmit={handleSubmit}>
                    {/* Login Page - Email label and input box */}
                    <label htmlFor="email">email</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="youremail@gmail.com" id="email" name="email" />
                    {/* Login Page - Password label and input box */}
                    <label htmlFor="password">password</label>
                    <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
                    {/* Login Page - Log In button */}
                    <button onClick={login} type="submit" >Log In</button>
                </form>
                <br></br>
                {/* Login Page - If users don't have an account, click this link to navigate to the Register page */}
                <Link to= "/register">Don't have an account? Register here.</Link> 
            </div>
        </div>
    </>
    )
}
export default Login;
