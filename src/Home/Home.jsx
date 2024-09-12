import React, { useContext } from 'react'
import SongsList from '../Songlist/SongsList';
import DataContext from '../context/DataContext';
import styles from "./style.module.css"
import Carousel from '../Carousel/Carousel';

export default function Home() {
  const { setSearchTerm, handleSearch, user, likedSongs, setLikedSongs, likedSongsList, setlikedSongsList, handleSongClick, searchTerm, songs, wasPlayed, topFiveSongs } = useContext(DataContext);

  const userId = user._id;

  return (
    searchTerm ? (
      <div className={styles.home}>
        <div className={styles.listContainer}>
          <SongsList onSongClick={(songID, song) => handleSongClick(songID, song, "search")} searchTerm={searchTerm} songs={songs} />
        </div>
      </div>
    ) : (!wasPlayed && (
      <div className={`${styles.playlistList} ${styles.fadeIn}`}>
        <div className={`${styles.carouselContainer} ${styles.slideUp} ${styles.delay1}`}>
          <div className={styles.firstTitle}>Recent Echoes</div>
          <Carousel onSongClick={(songID, song) => handleSongClick(songID, song)} searchTerm={searchTerm} songs={likedSongsList} songsList={topFiveSongs} itemsPerSlide={4} />
        </div>
        <div className={`${styles.carouselContainer} ${styles.slideUp} ${styles.delay2}`}>
          <div className={styles.title}>Crafted For You</div>
          <Carousel onSongClick={(songID, song) => handleSongClick(songID, song)} searchTerm={searchTerm} songs={likedSongsList} songsList={topFiveSongs} itemsPerSlide={4} />
        </div>
        <div className={`${styles.carouselContainer} ${styles.slideUp} ${styles.delay3}`}>
          <div className={styles.title}>Trending Hits</div>
          <Carousel onSongClick={(songID, song) => handleSongClick(songID, song)} searchTerm={searchTerm} songs={likedSongsList} songsList={topFiveSongs} itemsPerSlide={4} />
        </div>
      </div>
    ))
  );
}