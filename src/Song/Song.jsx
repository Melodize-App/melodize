import React, { useState } from 'react'
import styles from "./style.module.css"
import { FaHeart } from 'react-icons/fa';
import axios from 'axios'; // Make sure axios is imported
import { useContext } from 'react';
import DataContext from '../context/DataContext';

export default function Song({ song, onClick }) {


  

  const {handleFavorite , likedSongs} = useContext(DataContext);
  const isLiked = likedSongs.includes(song.video_id);
  
  const handleFavoriteSong = (e) => {
    handleFavorite(song, e, song.video_id);
  };
  
  const [isActive, setIsActive] = useState(false);
  const handleSongClick = () => {
    setIsActive(!isActive);
    onClick();
};

// This code block is added to handle two different cases for displaying thumbnails.
// The 'liked' songs list is treated differently because it receives data from the server,
// not directly from the YouTube API. Therefore, we need to accommodate for the possibility
// that thumbnails might be provided as either a string or an array.
// If 'thumbnails' is a string, we use it directly as the image link.
// If it's an array (from the YouTube API), we attempt to access the first item's URL.
// This ensures compatibility with both data formats in a straightforward manner.

  let imageLink="/path/to/default/image.jpg";

  if (typeof song.thumbnails === 'string') {
    imageLink=song.thumbnails;
  }
  else if  (Array.isArray(song.thumbnails) && song.thumbnails.length > 0)
  {
    imageLink =song.thumbnails[0].url
  };

//////////////////////////////////////////
// Function to get the song title without the artist name and the dash, then limit it to the first three words
const getTitleWithoutArtistAndShorten = () => {
  if (!song || !song.title) return ""; // אם אין שיר או אין כותרת לשיר, החזר ריק

  // Assuming the artist name and the title are separated by " - ", split and use the second part
  const parts = song.title.split(" - ");
  let titleWithoutArtist = parts.length > 1 ? parts.slice(1).join(" - ") : song.title;

  // Now, limit the title without the artist to the first three words
  return titleWithoutArtist.split(" ").slice(0, 8).join(" ");
};



  {
    return (
      <div
      className={`${styles.song} ${isActive ? styles.active : ''}`}
      onClick={handleSongClick}
  >
      <div className={styles.leftSide}>
        <div className={styles.image}><img src={imageLink} alt={`${song.title} thumbnail`} /></div>

        <div className={styles.artistAndName}>
          {/* <div className={styles.name}>{song.title.split(" ").slice(0, 3).join(" ")}</div> */}
          <div className={styles.name}>{getTitleWithoutArtistAndShorten()}</div>
          <div className={styles.artist}>{song.author}</div>
        </div>
      </div>
      <div className={styles.rightSide}>
        <div className={styles.time}>{song.video_length}</div>
        {/* <button className={`${styles.likeButton} ${isLiked ? styles.liked : ''}`} onClick={handleFavoriteSong}><FaHeart /></button> */}
        {/* <button className={`${styles.likeButton} ${isLiked ? styles.liked : ''}`} onClick={handleFavoriteSong}><FaHeart /></button> */}
        {/* <button className={`${styles.likeButton} ${song.isLiked ? styles.liked : isLiked ? styles.liked : ''}`} onClick={handleFavoriteSong} ><FaHeart /></button> */}
        <button className={`${styles.likeButton} ${likedSongs.includes(song.video_id) || song.likedStatus? styles.liked  : ''}`} onClick={handleFavoriteSong} ><FaHeart /></button>



      </div>
    </div>
    );
  }

}