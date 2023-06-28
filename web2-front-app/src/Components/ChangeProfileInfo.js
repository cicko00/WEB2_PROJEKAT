import React, { useState } from 'react';
import './Styles/ChangeProfileInfo.css'
import axios from 'axios';

const ChangeProfileInfo = ({ user, onSave, onCancel }) => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(sessionStorage["Token"])}`;
  const [updatedUser, setUpdatedUser] = useState(user);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser((prevUser) => ({
      ...prevUser,
      [name]: value
    }));
  };

  const handleSave = async() => {
    try{
       updatedUser.dateOfBirth=(new Date(updatedUser.dateOfBirth)).toISOString();
       console.log(new Date(updatedUser.dateOfBirth));
       axios.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(sessionStorage["Token"])}`;  
    await axios.put('https://localhost:7108/api/users/'+user.userId, updatedUser);
    }
    catch(error){
        alert("SOMETHING WENT WRONG!");
    }
    onSave(updatedUser);
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <div className="change-profile-info">
      <div className="form-field">
        <label>Username:</label>
        <input type="text" name="userName" value={updatedUser.userName} onChange={handleChange} />
      </div>
      <div className="form-field">
        <label>First Name:</label>
        <input type="text" name="firstName" value={updatedUser.firstName} onChange={handleChange} />
      </div>
      <div className="form-field">
        <label>Last Name:</label>
        <input type="text" name="lastName" value={updatedUser.lastName} onChange={handleChange} />
      </div>
      <div className="form-field">
        <label>Email:</label>
        <input type="email" name="email" value={updatedUser.email} onChange={handleChange} />
      </div>
      <div className="form-field">
        <label>Date of Birth:</label>
        <input type="date" name="dateOfBirth" value={updatedUser.dateOfBirth} onChange={handleChange} />
      </div>
      <div className="form-field">
        <label>Address:</label>
        <input type="text" name="address" value={updatedUser.address} onChange={handleChange} />
      </div>
      <div className="buttons">
        <button className="save-button" onClick={handleSave}>
          Save
        </button>
        <button className="cancel-button" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ChangeProfileInfo;
