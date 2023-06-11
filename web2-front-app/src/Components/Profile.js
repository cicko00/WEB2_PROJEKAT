import React, { useState } from 'react';
import './Styles/Profile.css';
import User from '../Models/User';
import ChangeProfileInfo from './ChangeProfileInfo';
import ChangePassword from './ChangePassword';

const Profile = () => {
  const [user, setUser] = useState(JSON.parse(sessionStorage["User"]));
  const [editing, setEditing] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);

  const handleSave = (updatedUser) => {
    // Save the updated user data
    setUser(updatedUser);
    setEditing(false);
    setChangingPassword(false);
  };

  const handleCancel = () => {
    // Cancel the editing and go back to the profile view
    setEditing(false);
  };

  const handlePasswordChange = () => {
    setChangingPassword(true);
  };

  const handlePasswordChangeCancel = () => {
    setChangingPassword(false);
  };

  const handlePhotoChange = () => {
    try{
    if (user.fbUser === false) {
      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.accept = 'image/*';
      fileInput.onchange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
          const imageString = reader.result; // Converted image as a string
          const updatedUser = {
            ...user,
            image: imageString,
          };
          setUser(updatedUser);
        };
        reader.readAsDataURL(file);
      };
      fileInput.click();
    }
    }
    catch(error){}

  };
  

  const renderProfileContent = () => {
    console.log(user);
    if (editing) {
      return <ChangeProfileInfo user={user} onSave={handleSave} onCancel={handleCancel} />;
    } else if (changingPassword) {
      return <ChangePassword onSave={handleSave} onCancel={handlePasswordChangeCancel} user={user} />;
    } else {
      return (
        <>
          <div className="profile-photo" onClick={handlePhotoChange}>
            <img src={user.image} alt="Profile" />
          </div>
          <div className="profile-details">
            <div className="profile-field">
              <span className="profile-label">Username:</span>
              <span>{user.userName}</span>
            </div>

            <div className="profile-field">
              <span className="profile-label">First Name:</span>
              <span>{user.firstName}</span>
            </div>
            <div className="profile-field">
              <span className="profile-label">Last Name:</span>
              <span>{user.lastName}</span>
            </div>
            <div className="profile-field">
              <span className="profile-label">Email:</span>
              <span>{user.email}</span>
            </div>
            <div className="profile-field">
              <span className="profile-label">Date of Birth:</span>
              <span>{user.dateOfBirth}</span>
            </div>
            <div className="profile-field">
              <span className="profile-label">Address:</span>
              <span>{user.address}</span>
            </div>
            <div className="profile-actions">
              <button className="edit-button" onClick={() => setEditing(true)}>
                Edit Profile
              </button>
              {user.fbUser ===false && (
                <button className="change-password-button" onClick={handlePasswordChange}>
                  Change Password
                </button>
              )}
            </div>
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
      <div className="profile-content">{renderProfileContent()}</div>
    </div>
  );
};

export default Profile;
