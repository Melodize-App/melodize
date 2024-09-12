import React, { useContext, useEffect, useState } from 'react'
import styles from "./style.module.css"
import DataContext from '../context/DataContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const navigate = useNavigate();
  const { user, setUser, apiUrl } = useContext(DataContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({
    fName: '',
    lName: '',
    email: '',
  });

  useEffect(() => {
    setEditedUser({
      fName: user.fName,
      lName: user.lName,
      email: user.email,
    });
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSaveChanges = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.put(`${apiUrl}/user`, {
        ...editedUser,
        email: user.email,
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.status === 200) {
        setUser(response.data);
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Error updating profile", error);
      navigate("/login");
    }
  };

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className={`${styles.container} ${styles.fadeIn}`}>
      <div className={`${styles.userBox} ${styles.slideDown}`}>
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