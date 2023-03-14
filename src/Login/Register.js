import React, { useState } from "react";
import Axios from 'axios'
import { Link, useNavigate } from "react-router-dom";
import Logo from "../Logo/logo";

/** Citations
 * Frontend Login Page: https://www.youtube.com/watch?v=Y-XW9m8qOis
 * Backend Login Page: https://www.youtube.com/watch?v=W-sZo6Gtx_E , https://www.youtube.com/watch?v=W8jySpfRUDY 
 */

export const Register = () => {
    //store username, email, and password users typed on Register page
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const navigate = useNavigate();

    // save username, email, password to users DB
    const register = () => {
        Axios.post('http://localhost:3001/register', {
          username: name,  
          email: email,
          password: pass,
        })
        // if users type empty username, email, and password, still stays on Login page
        if (name !== '' && email !== '' && pass !== '') {
            navigate('/login');
        }
    }

    return (
    <>
    {/* Logo */}
    <div className = "logo-button"><Logo/></div>
    {/* Register Page */}
    <div className="Register-Login">
        {/* Register Page - Container that has username, email, password input */}
        <div className="auth-form-container">
            {/* Register Page - Title */}
            <h2>Register</h2>
        <form className="register-form" >
            {/* Register Page - Username label and input box */}
            <label htmlFor="name">username</label>
            <input value={name} name="name" onChange={(e) => setName(e.target.value)} id="name" placeholder="username" required />
            {/* Register Page - Email label and input box */}
            <label htmlFor="email">email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="youremail@gmail.com" id="email" name="email" required />
            {/* Register Page - Password label and input box */}
            <label htmlFor="password">password</label>
            <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" required />
            {/* Register Page - Sign Up button */}
            <button onClick = {register} type="submit">Sign Up</button>
        </form>
        <br></br>
        {/* Register Page - If users already have an account, click this link to navigate to the Login page */}
        <Link to= "/login">Already have an account? Log In here.</Link>
    </div>
    </div>
    </>
    )
}

export default Register;