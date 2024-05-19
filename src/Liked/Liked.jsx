import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DataContext from '../context/DataContext';
import SongsList from '../Songlist/SongsList';
import styles from "./style.module.css";

export default function Liked() {


  const { handleSongClick, searchTerm, user, setLikedSongs, likedSongsList, setlikedSongsList } = useContext(DataContext);

  const userId = user._id;
  const navigate = useNavigate();

  // Fetch liked songs for the user
  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get(`http://localhost:3000/liked/${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => {
        console.log(res.data);
        setlikedSongsList(res.data);
      })
      .catch(err => {
        console.error(err);
        navigate("/");
      });

  }, [userId, setLikedSongs]);

  return (
    <div className={styles.likedPage}>
      <div className={styles.listContainer}>
        <SongsList
          onSongClick={(songID, song) => handleSongClick(songID, song, "favorites")}
          searchTerm={searchTerm}
          songs={likedSongsList}
        />
      </div>
    </div>
  );
}