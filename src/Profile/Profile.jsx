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

  // עדכון editedUser כאשר user משתנה
  useEffect(() => {
    setEditedUser({
      fName: user.fName,
      lName: user.lName,
      email: user.email,
    });
  }, [user]); // תלוי ב-user

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
      const response = await axios.put('http://localhost:3000/user', {
        ...editedUser,
        email: user.email, // או כל מזהה אחר שתרצה להוסיף
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.status === 200) {
        setUser(response.data); // עדכון המצב עם הנתונים המעודכנים מהשרת
        setIsEditing(false);
      }
    } // בפונקציה של שליחת הבקשה, לדוגמה handleSaveChanges

    catch (error) {
      console.error("Error updating profile", error);
        // טוקן פג תוקף, הפנה לדף ההתחברות
        navigate("/login");
      
    }
  
  };

  const handleEdit = (e) => {

    setIsEditing(!isEditing)

  }

  // פונקציה לעדכון נתוני המשתמש
  const updateUser = (newUserData) => {
    setUser(newUserData);
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
                onChange={handleInputChange}
              />
            </>
          ) : (
            <>
              <div className={styles.firstName}> {user.fName}</div>
              <div className={styles.lastName}> {user.lName}</div>
              <div className={styles.email}>{user.email}</div>

            </>
          )}
        </div>
        <div className={styles.editButton}>
          {isEditing ? (
            <button onClick={handleSaveChanges}>Submit</button>
          ) : (
            <button onClick={handleEdit}>Edit</button>
          )}
        </div>

      </div>
    </div>

  );

}
