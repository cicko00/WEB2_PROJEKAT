import React, { useState,useRef } from 'react';
import './Styles/Register.css';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import Login from './Login'
const Register = ({history}) => {
  const [FirstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [Email, setEmail] = useState('');
  const [UserName, setUserName] = useState('');
  const [Password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [Address, setAddress] = useState('');
  const [DateOfBirth, setDateOfBirth] = useState('');
  const [UserType, setUserType] = useState('buyer');
  const [errors, setErrors] = useState({});
  const [Image, setPhoto] = useState(null);
    <Router>
      <Routes>
       
        <Route path='/login' element={<Login/>} />
      </Routes>
    </Router>

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    const validationErrors = {};
    if (!FirstName) {
      validationErrors.firstName = 'First Name is required';
    }
    if (!LastName) {
      validationErrors.lastName = 'Last Name is required';
    }
    if (!Email) {
      validationErrors.email = 'Email is required';
    }
    if (!UserName) {
      validationErrors.userName = 'Username is required';
    }
    if (!Password) {
      validationErrors.password = 'Password is required';
    }
    if (!repeatPassword) {
      validationErrors.repeatPassword = 'Repeat Password is required';
    }
    if (Password !== repeatPassword) {
      validationErrors.repeatPassword = 'Passwords must match';
    }
    if (!Address) {
      validationErrors.address = 'Address is required';
    }
    if (!DateOfBirth) {
      validationErrors.dateOfBirth = 'Date of Birth is required';
    }

    // Set errors or submit form
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      try {
        const data = {
          FirstName,
          LastName,
          Email,
          UserName,
          Password,
          Address,
          DateOfBirth,
          UserType,
          Image:"aaaa",
        };
       
        if (Image !="") {
          const reader = new FileReader();
          reader.onloadend = () => {
            const photoString = reader.result;
            data.Image = photoString;
            const response = sendRequest(data);
            console.log(response.data);
          };
          reader.readAsDataURL(Image);
          
        
        }

        console.log(data);
        

       
        alert('USPEŠNA REGISTRACIJA!');
        
       
      } catch (error) {
        console.error(error);
        alert('NEUSPEŠNA REGISTRACIJA!');
      }
    }
  };

  const photoFrameRef = useRef(null);
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);

    const photoURL = URL.createObjectURL(file);
  // Set the URL as the background image of the photo frame
  photoFrameRef.current.style.backgroundImage = `url(${photoURL})`;
  };

const sendRequest=async(data)=>{
  return await axios.post('https://localhost:7108/api/users', data); 
};

  return (
    
    <div className="register-container">
      <div className="register-form">
        <h1 className="title">Register</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              placeholder="First Name"
              value={FirstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            {errors.firstName && <p className="error">{errors.firstName}</p>}
          </div>
          <div>
            <input
              type="text"
              placeholder="Last Name"
              value={LastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            {errors.lastName && <p className="error">{errors.lastName}</p>}
          </div>
          <div>
            <input
              type="email"
              placeholder="Email"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>
          <div>
            <input
              type="text"
              placeholder="Username"
              value={UserName}
              onChange={(e) => setUserName(e.target.value)}
            />
            {errors.userName && <p className="error">{errors.userName}</p>}
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <p className="error">{errors.password}</p>}
          </div>
          <div>
            <input
              type="password"
              placeholder="Repeat Password"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
            />
            {errors.repeatPassword && <p className="error">{errors.repeatPassword}</p>}
          </div>
          <div>
            <input
              type="text"
              placeholder="Address"
              value={Address}
              onChange={(e) => setAddress(e.target.value)}
            />
            {errors.address && <p className="error">{errors.address}</p>}
          </div>
          <div>
            <input
              type="date"
              placeholder="Date of Birth"
              value={DateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
            />
            {errors.dateOfBirth && <p className="error">{errors.dateOfBirth}</p>}
          </div>
          <div>
            <p></p>
            <label htmlFor="role">Role:</label>
            <select id="role" value={UserType} onChange={(e) => setUserType(e.target.value)}>
              <option value="buyer">Buyer</option>
              <option value="seller">Seller</option>
            </select>
          </div>
          <p></p>
          <label htmlFor="role">Set Profile Photo:</label>
          <div className="photo-container">
            <div className="photo-frame"  ref={photoFrameRef} >
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
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
