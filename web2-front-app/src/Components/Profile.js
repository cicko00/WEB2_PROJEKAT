import React, { useState } from 'react';
import './Styles/Profile.css';
import User from '../Models/User';
import ChangeProfileInfo from './ChangeProfileInfo';

const Profile = () => {
  const [user, setUser] = useState(JSON.parse(sessionStorage["User"]));
  const [editing, setEditing] = useState(false);

  const handleSave = (updatedUser) => {
    // Save the updated user data
    setUser(updatedUser);
    setEditing(false);
  };

  const handleCancel = () => {
    // Cancel the editing and go back to the profile view
    setEditing(false);
  };

  const renderProfileContent = () => {
    if (editing) {
      return (
        <ChangeProfileInfo user={user} onSave={handleSave} onCancel={handleCancel} />
      );
    } else {
      return (
        <>
          <div className="profile-photo">
            <img src={user.PhotoString} alt="Profile" />
          </div>
          <div className="profile-details">
            <div className="profile-field">
              <span className="profile-label">Username:</span>
              <span>{user.UserName}</span>
            </div>
            <div className="profile-field">
              <span className="profile-label">First Name:</span>
              <span>{user.FirstName}</span>
            </div>
            <div className="profile-field">
              <span className="profile-label">Last Name:</span>
              <span>{user.LastName}</span>
            </div>
            <div className="profile-field">
              <span className="profile-label">Email:</span>
              <span>{user.Email}</span>
            </div>
            <div className="profile-field">
              <span className="profile-label">Date of Birth:</span>
              <span>{user.DateOfBirth}</span>
            </div>
            <div className="profile-field">
              <span className="profile-label">Address:</span>
              <span>{user.Address}</span>
            </div>
            <button className="edit-button" onClick={() => setEditing(true)}>
              Edit Profile
            </button>
          </div>
        </>
      );
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>Profile</h1>
      </div>
      <div className="profile-content">
        {renderProfileContent()}
      </div>
    </div>
  );
};

export default Profile;
