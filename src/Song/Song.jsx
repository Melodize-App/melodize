import React, { useState, useContext } from 'react';
import styles from "./style.module.css";
import { FaHeart } from 'react-icons/fa';
import axios from 'axios';
import DataContext from '../context/DataContext';

export default function Song({ song, onClick }) {
  const { handleFavorite, likedSongs } = useContext(DataContext);
  const isLiked = likedSongs.includes(song.video_id);

  // Handle favoriting a song
  const handleFavoriteSong = (e) => {
    handleFavorite(song, e, song.video_id);
  };

  const [isActive, setIsActive] = useState(false);

  // Handle song click and toggle active state
  const handleSongClick = () => {
    setIsActive(!isActive);
    onClick();
  };

  // Determine the image link based on song thumbnails
  let imageLink = "/path/to/default/image.jpg";
  if (typeof song.thumbnails === 'string') {
    imageLink = song.thumbnails;
  } else if (Array.isArray(song.thumbnails) && song.thumbnails.length > 0) {
    imageLink = song.thumbnails[0].url;
  }

  // Get the song title without the artist name and shorten it to the first eight words
  const getTitleWithoutArtistAndShorten = () => {
    if (!song || !song.title) return "";
    const parts = song.title.split(" - ");
    let titleWithoutArtist = parts.length > 1 ? parts.slice(1).join(" - ") : song.title;
    return titleWithoutArtist.split(" ").slice(0, 8).join(" ");
  };

  {
    return (
      <div
        className={`${styles.song} ${isActive ? styles.active : ''}`}
        onClick={handleSongClick}>
        <div className={styles.leftSide}>
          <div className={styles.image}><img src={imageLink} alt={`${song.title} thumbnail`} /></div>
          <div className={styles.artistAndName}>
            <div className={styles.name}>{getTitleWithoutArtistAndShorten()}</div>
            <div className={styles.artist}>{song.author}</div>
          </div>
        </div>
        <div className={styles.rightSide}>
          <div className={styles.time}>{song.video_length}</div>
          <button className={`${styles.likeButton} ${likedSongs.includes(song.video_id) || song.likedStatus ? styles.liked : ''}`} onClick={handleFavoriteSong} ><FaHeart /></button>
        </div>
      </div>
    );
  }

}