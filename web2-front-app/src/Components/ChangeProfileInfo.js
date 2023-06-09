import React, { useState } from 'react';
import './Styles/ChangeProfileInfo.css'

const ChangeProfileInfo = ({ user, onSave, onCancel }) => {
  const [updatedUser, setUpdatedUser] = useState(user);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser((prevUser) => ({
      ...prevUser,
      [name]: value
    }));
  };

  const handleSave = () => {
    onSave(updatedUser);
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <div className="change-profile-info">
      <div className="form-field">
        <label>Username:</label>
        <input type="text" name="UserName" value={updatedUser.UserName} onChange={handleChange} />
      </div>
      <div className="form-field">
        <label>First Name:</label>
        <input type="text" name="FirstName" value={updatedUser.FirstName} onChange={handleChange} />
      </div>
      <div className="form-field">
        <label>Last Name:</label>
        <input type="text" name="LastName" value={updatedUser.LastName} onChange={handleChange} />
      </div>
      <div className="form-field">
        <label>Email:</label>
        <input type="email" name="Email" value={updatedUser.Email} onChange={handleChange} />
      </div>
      <div className="form-field">
        <label>Date of Birth:</label>
        <input type="date" name="DateOfBirth" value={updatedUser.DateOfBirth} onChange={handleChange} />
      </div>
      <div className="form-field">
        <label>Address:</label>
        <input type="text" name="Address" value={updatedUser.Address} onChange={handleChange} />
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
