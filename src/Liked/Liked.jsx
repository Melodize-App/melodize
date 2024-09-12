import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DataContext from '../context/DataContext';
import SongsList from '../Songlist/SongsList';
import styles from "./style.module.css";

export default function Liked() {
  const { handleSongClick, searchTerm, user, setLikedSongs, likedSongsList, setlikedSongsList, apiUrl } = useContext(DataContext);

  const userId = user._id;
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get(`${apiUrl}/liked/${userId}`, {
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
  }, [userId, setLikedSongs, apiUrl, navigate]);

  return (
    <div className={`${styles.likedPage} ${styles.fadeIn}`}>
      <div className={`${styles.listContainer} ${styles.slideIn}`}>
        <SongsList
          onSongClick={(songID, song) => handleSongClick(songID, song, "favorites")}
          searchTerm={searchTerm}
          songs={likedSongsList}
        />
      </div>
    </div>
  );
}