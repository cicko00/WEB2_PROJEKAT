import React, { useState, useRef } from 'react';
import './Styles/Register.css';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link,useNavigate } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import Login from './Login';
import FacebookLogin from 'react-facebook-login';
import {decodeJWTToken} from '../Services/JwtDecodeService'
import {setFbPhoto} from "../Services/SetPhotoFbUserService"
import {PickRole} from "../Services/RolePicker"

const Register = ({handleLogin}) => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [address, setAddress] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [userType, setUserType] = useState('buyer');
  const [errors, setErrors] = useState({});
  const [image, setPhoto] = useState(null);
  const [fbuser, setFbUser] = useState(false);

  const data = {
    userId: 0,
    firstName,
    lastName,
    email,
    userName,
    password,
    address,
    dateOfBirth,
    userType,
    image: '',
    fbuser,
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    const validationErrors = {};
    if (!firstName) {
      validationErrors.firstName = 'First Name is required';
    }
    if (!lastName) {
      validationErrors.lastName = 'Last Name is required';
    }
    if (!email) {
      validationErrors.email = 'Email is required';
    }
    if (!userName) {
      validationErrors.userName = 'Username is required';
    }
    if (!password) {
      validationErrors.password = 'Password is required';
    }
    if (!repeatPassword) {
      validationErrors.repeatPassword = 'Repeat Password is required';
    }
    if (password !== repeatPassword) {
      validationErrors.repeatPassword = 'Passwords must match';
    }
    if (!address) {
      validationErrors.address = 'Address is required';
    }
    if (!dateOfBirth) {
      validationErrors.dateOfBirth = 'Date of Birth is required';
    }

    


    // Set errors or submit form
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      
       
        if (image) {
          const reader = new FileReader();
          const filePromise = new Promise((resolve) => {
            reader.onloadend = () => {
              const photoString = reader.result;
              data.image = photoString;
              resolve(); // Resolve the promise once the image string is set
            };
          });
          reader.readAsDataURL(image);

          await filePromise; // Wait for the promise to be resolved
        }

        var res=await sendRequest(data);
        if(res.data===200){
        alert('USPEŠNA REGISTRACIJA!');
        
        
        navigate('/login');
        }
        else{
          alert(res.data);
          console.log(res.data);
          console.log(typeof res.data)
        }
      }
        
        
      
    
  };

  const getPhoto = async (id) => {
    return await axios.get('https://localhost:7108/api/users/photo/'+Number(id));
  };

  const photoFrameRef = useRef(null);
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);

    const photoURL = URL.createObjectURL(file);
    // Set the URL as the background image of the photo frame
    photoFrameRef.current.style.backgroundImage = `url(${photoURL})`;
  };

  const sendRequest = async (data) => {
    return await axios.post('https://localhost:7108/api/users', data);
  };

  const responseFacebook = async(response) => {
    try{
    setFirstName("");
    setLastName("");
    setEmail("");
    
    const { name, email, picture  } = response;
    data.firstName=(name.split(' ')[0]);
    data.lastName=(name.split(' ')[1]);
    data.email=(email);
    data.userName=(email);
    data.dateOfBirth=undefined;
    data.fbuser=(true);
    
    if (picture && picture.data && picture.data.url) {
      const photoURL = picture.data.url;
      // Set the URL as the background image of the photo frame
      photoFrameRef.current.style.backgroundImage = `url(${photoURL})`;
    }

    
    
    var result=await sendRequest(data);

      if(result.data.length > 30){
      
      
      var i=decodeJWTToken(result.data);
      setFbPhoto(picture.data.url);
      
      
      if(i===null){
        alert("SOMETHING WENT WRONG!");
      }
      else{
        handleLogin();
       
        alert("USPESNA REGISTRACIJA!");
        navigate('/');
      }


      
      }
      else{
        alert(result.data);
        console.log(result.data);
      }
    
    }
    catch(error){}
    
      
      
    
    
    
  };

  return(
    <div className="register-container">
      <div className="register-form">
        <h1 className="title">Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            {errors.firstName && <p className="error">{errors.firstName}</p>}
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            {errors.lastName && <p className="error">{errors.lastName}</p>}
          </div>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            {errors.userName && <p className="error">{errors.userName}</p>}
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <p className="error">{errors.password}</p>}
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Repeat Password"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
            />
            {errors.repeatPassword && (
              <p className="error">{errors.repeatPassword}</p>
            )}
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            {errors.address && <p className="error">{errors.address}</p>}
          </div>
          <div className="form-group">
            <input
              type="date"
              placeholder="Date of Birth"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
            />
            {errors.dateOfBirth && (
              <p className="error">{errors.dateOfBirth}</p>
            )}
          </div>
          <div className="form-group">
            <p></p>
            <label htmlFor="role">Role:</label>
            <select
              id="role"
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
            >
              <option value="buyer">Buyer</option>
              <option value="seller">Seller</option>
            </select>
          </div>
          <div className="form-group">
            <p></p>
            <label htmlFor="photo-upload">Set Profile Photo:</label>
            <div className="photo-container">
              <div className="photo-frame" ref={photoFrameRef}>
                <label htmlFor="photo-upload" className="photo-label">
                  <span className="plus-icon">+</span>
                </label>
              </div>
              <input
                type="file"
                id="photo-upload"
                accept="image/*"
                onChange={handlePhotoChange}
              />
            </div>
          </div>
          <button type="submit">Register</button>
        </form>
        <p className="register-link">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
        <div className="or-divider">
          <div className="or-line"></div>
          <div className="or-text">or</div>
          <div className="or-line"></div>
        </div>
        <FacebookLogin
          appId="972429670447706"
          fields="name,email,picture"
          callback={responseFacebook}
          cssClass="facebook-button"
          textButton="Register with Facebook"
        />
      </div>
    </div>
  );
};

export default Register;
