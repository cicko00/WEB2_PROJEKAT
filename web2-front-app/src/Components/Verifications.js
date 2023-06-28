import React, { useEffect, useState } from 'react';
import axios from 'axios';

import "./Styles/Verifications.css"

const Verifications = () => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(sessionStorage["Token"])}`;
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      axios.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(sessionStorage["Token"])}`;
      const response = await axios.get('https://localhost:7108/seller/all');
      console.log(response.data);
      setUsers(response.data);
    } catch (error) {
      console.log('Error fetching users:', error);
    }
  };

  const handleAccept = async (userId) => {
    try {
      await axios.put("https://localhost:7108/api/users/admin/"+userId+"/"+2);
      updateUserStatus(userId, 2);
    } catch (error) {
      console.log('Error accepting user:', error);
    }
  };

  const handleReject = async (userId) => {
    try {
        await axios.put("https://localhost:7108/api/users/admin/"+userId+"/"+0);
      updateUserStatus(userId, 0);
    } catch (error) {
      console.log('Error rejecting user:', error);
    }
  };

  const updateUserStatus = (userId, status) => {
    var usr=JSON.parse(sessionStorage["User"]);
    usr.verified=status;
    sessionStorage.setItem("User",JSON.stringify(usr));
    setUsers((prevUsers) =>
      prevUsers.map((user) => {
        if (user.userId === userId) {
          return { ...user, verified: status };
        }
        return user;
      })
    );
  };

  const renderUsers = () => {
    return users.map((user) => (
      <div className="user-card" key={user.userId}>
        <p>
          <span>UserID:</span> {user.userId}
        </p>
        <p>
          <span>Username:</span> {user.userName}
        </p>
        <p>
          <span>First Name:</span> {user.firstName}
        </p>
        <p>
          <span>Last Name:</span> {user.lastName}
        </p>
        <p>
          <span>Address:</span> {user.address}
        </p>
        <p>
          <span>Email:</span> {user.email}
        </p>
        <p>
          <span>Status:</span> {getStatusLabel(user.verified)}
        </p>
        {user.verified === 1 && (
          <div className="button-group">
            <button onClick={() => handleAccept(user.userId)}>Accept</button>
            <button onClick={() => handleReject(user.userId)}>Reject</button>
          </div>
        )}
        
      </div>
      
    ));
  };
  
  const getStatusLabel = (status) => {
    switch (status) {
      case 0:
        return "Rejected";
      case 1:
        return "On Waiting";
      case 2:
        return "Accepted";
      default:
        return "";
    }
  };

  return (
    <div className="verifications-container">
      <h2 className="verifications-title">User Verifications</h2>
      {users.length > 0 ? renderUsers() : <p>No users found.</p>}
    </div>
  );
};

export default Verifications;
