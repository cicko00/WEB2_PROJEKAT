import React, { useState } from 'react';
import './Styles/ChangeProfileInfo.css';
import axios from 'axios';
const ChangePassword = ({ onSave, onCancel,user }) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [repeatNewPassword, setRepeatNewPassword] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = async(e) => {
    e.preventDefault();

    // Validation
    const validationErrors = {};
    if (!oldPassword) {
      validationErrors.oldPassword = 'Old password is required';
    }
    if (!newPassword) {
      validationErrors.newPassword = 'New password is required';
    }
    if (!repeatNewPassword) {
      validationErrors.repeatNewPassword = 'Repeat new password is required';
    }
    if (newPassword !== repeatNewPassword) {
      validationErrors.repeatNewPassword = 'Passwords do not match';
    }

    // Set errors or submit form
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      // Save the new password
      const updatedUser = {
        ...user,
        oldPassword:user.password,
        password: newPassword,
        
      };
      try{
        console.log(user.UserId);
        updatedUser.dateOfBirth=(new Date(updatedUser.dateOfBirth)).toISOString();
      await axios.put('https://localhost:7108/api/users/'+user.userId, updatedUser);
      }
      catch(error){
        alert("SOMETHING WENT WRONG!");
      }
      onSave(updatedUser);
    }
  };

  return (
    <div className="change-profile-info-container">
      <h2>Change Password</h2>
      <form className="change-profile-info-form" onSubmit={handleSubmit}>
        <div className="change-profile-info-field">
          <label className="change-profile-info-label">Old Password:</label>
          <input
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
          {errors.oldPassword && <p className="change-profile-info-error">{errors.oldPassword}</p>}
        </div>
        <div className="change-profile-info-field">
          <label className="change-profile-info-label">New Password:</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          {errors.newPassword && <p className="change-profile-info-error">{errors.newPassword}</p>}
        </div>
        <div className="change-profile-info-field">
          <label className="change-profile-info-label">Repeat New Password:</label>
          <input
            type="password"
            value={repeatNewPassword}
            onChange={(e) => setRepeatNewPassword(e.target.value)}
          />
          {errors.repeatNewPassword && (
            <p className="change-profile-info-error">{errors.repeatNewPassword}</p>
          )}
        </div>
        <div className="change-profile-info-actions">
          <button type="submit">Save</button>
          <button type="button" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
