import React, { useState } from 'react';
import './Styles/Login.css';
import axios from 'axios';
import {  useNavigate } from 'react-router-dom';
import {decodeJWTToken} from '../Services/JwtDecodeService'

const Login = ({handleLogin}) => {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
   const navigate = useNavigate();

  const handleSubmit =async (e) => {
    e.preventDefault();

    // Validation
    const validationErrors = {};
    if (!email) {
      validationErrors.email = 'Email is required';
    }
    if (!password) {
      validationErrors.password = 'Password is required';
    }

    // Set errors or submit form
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
        const userData = {
            email,
            password,
          };
    
          axios.post('https://localhost:7108/api/users/login', userData)
            .then((response) => {
              if(response.data!=="!"){
                console.log(typeof(response));
                handleLogin();
                
                decodeJWTToken(response.data);
                console.log(sessionStorage["User"]);
                navigate('/');
              }
              else{
                alert("PRIJAVA NIJE USPELA. PROVERITE VAŠE PODATKE!");

              }
              // Handle successful login
              
              
            })
            .catch((error) => {
              // Handle login error
              console.log(error);
            });
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h1 className="title">Login</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <p className="error">{errors.password}</p>}
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
