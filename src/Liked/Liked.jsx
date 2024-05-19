
import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import DataContext from '../context/DataContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import SongsList from '../Songlist/SongsList';
import styles from "./style.module.css";

export default function Liked() {


  const { handleSongClick, searchTerm,setSearchTerm,handleSearch, user,likedSongs, setLikedSongs,likedSongsList,setlikedSongsList } = useContext(DataContext);

const userId=user._id;


  // useEffect(() => {
  //   axios.get('http://localhost:3000/liked')
  //     .then(res => {
  //       setlikedSongsList(res.data.songs);
  //     })
  //     .catch(err => {
  //       console.error(err);
  //     });
  // }, []);

  const navigate = useNavigate();


  useEffect(() => {
    const token = localStorage.getItem('token'); // קבלת הטוקן מהאחסון המקומי
    axios.get(`http://localhost:3000/liked/${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}` // הוספת הטוקן לכותרת הבקשה
      }
    })
      .then(res => {
          console.log(res.data); // Log the full response to debug
          setlikedSongsList(res.data); // נניח שהשירים נמצאים תחת המפתח 'songs' בתוך res.data
          
        })
        .catch(err => {
          console.error(err);
          navigate("/");


        });

      }, [userId, setLikedSongs]); // הוספת setLikedSongs כתלות ל-useEffect
      // Adding userId as a dependency to refetch when userId changes
  

  return (
<div className={styles.likedPage}>
<div className={styles.listContainer}>
      {/* <SongsList onSongClick={handleSongClick} searchTerm={searchTerm} songs={likedSongs} /> */}
      {/* <SongsList onSongClick={() => handleSongClick(song.id, song, "favorites")} searchTerm={searchTerm} songs={likedSongs} /> */}
      <SongsList onSongClick={(songID, song) => handleSongClick(songID, song, "favorites")} searchTerm={searchTerm} songs={likedSongsList} />

    </div>
</div>
  );
}
