import React, { useContext, useEffect, useState } from 'react'
import styles from "./style.module.css"
import DataContext from '../context/DataContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Profile() {

  const navigate = useNavigate();
  const { user, setUser, playing } = useContext(DataContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({
    fName: '',
    lName: '',
    email: '',
  });

  // Update editedUser when user changes
  useEffect(() => {
    setEditedUser({
      fName: user.fName,
      lName: user.lName,
      email: user.email,
    });
  }, [user]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Save changes to user profile
  const handleSaveChanges = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.put('http://localhost:3000/user', {
        ...editedUser,
        email: user.email, // Or any other identifier you want to update
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.status === 200) {
        setUser(response.data); // Update state with new user data from server
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Error updating profile", error);
      navigate("/login"); // Redirect to login if token is expired
    }
  };

  // Toggle edit mode
  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className={styles.container}>
      <div className={styles.userBox}>
        <div className={styles.image}>
          <div className={styles.userName}>
            {user.fName} {user.lName}
          </div>
        </div>

        <div className={styles.userDetails}>
          {isEditing ? (
            <>
              <input
                className={styles.firstNameEdit}
                name="fName"
                value={editedUser.fName}
                onChange={handleInputChange}
              />
              <input
                className={styles.lastNameEdit}
                name="lName"
                value={editedUser.lName}
                onChange={handleInputChange}
              />
              <input
                className={styles.emailEdit}
                name="email"
                value={editedUser.email}
                onChange={handleInputChange} />
            </>) : (
            <>
              <div className={styles.firstName}> {user.fName}</div>
              <div className={styles.lastName}> {user.lName}</div>
              <div className={styles.email}>{user.email}</div>
            </>
          )}
        </div>
        <div className={styles.editButton}>
          {isEditing ? (<button onClick={handleSaveChanges}>Submit</button>) : (<button onClick={handleEdit}>Edit</button>)}
        </div>
      </div>
    </div>
  );
}
