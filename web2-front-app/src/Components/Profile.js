import React, { useState,useEffect } from 'react';
import './Styles/Profile.css';
import User from '../Models/User';
import ChangeProfileInfo from './ChangeProfileInfo';
import ChangePassword from './ChangePassword';
import {PickRole} from '../Services/RolePicker' 
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState(JSON.parse(sessionStorage["User"]));
  const [editing, setEditing] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);
  const [ph,setPh]=useState("");

  const handleSave = (updatedUser) => {
    // Save the updated user data
    setUser(updatedUser);
    setEditing(false);
    setChangingPassword(false);
    sessionStorage.setItem("User",JSON.stringify(updatedUser));
    
  };

  useEffect(() => {
   
    renderphoto();

  }, []);
    
  const renderphoto = async () => {
    const id=(JSON.parse(sessionStorage["User"])).userId;
    const p=await getPhoto(id);
    setPh(p.data);
    console.log("------------------");
    console.log(p);
    console.log(p.data);
  };
  const handleCancel = () => {
    // Cancel the editing and go back to the profile view
    setEditing(false);
  };

  const handlePasswordChange = () => {
    setChangingPassword(true);
  };

  const getPhoto = async (id) => {
    
    return await axios.get(`https://localhost:7122/api/users/photo/${parseInt(id)}`);
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
          setPh(imageString);
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
            <img src={ph} alt="Profile" />
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
            { PickRole().isSeller===true &&(
            <div className="profile-field">
              <span className="profile-label">Verification Status:</span>
              {user.verified===0 &&(
                <span>REJECTED</span>
              )}
              {user.verified===1 &&(
                <span>WAITING</span>
              )}

                {user.verified===2 &&(
                <span>VERIFIED</span>
              )}
              
            </div>
    )}

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
