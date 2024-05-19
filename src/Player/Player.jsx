import React, { useState, useRef, useEffect } from 'react';
import ReactPlayer from 'react-player';

import { FaPlay, FaPause } from 'react-icons/fa';
import { FaHeart } from 'react-icons/fa';
import { PiVideoFill } from "react-icons/pi";
import { HiMiniVideoCamera, HiMiniVideoCameraSlash } from "react-icons/hi2";
import { PiMonitorPlayFill } from "react-icons/pi";



import { TbPlayerTrackNextFilled, TbPlayerTrackPrevFilled } from "react-icons/tb";

import DataContext from '../context/DataContext';
import { useContext } from 'react';

import styles from "./style.module.css"
import PlayerContext from '../context/PlayerContext';




export default function Player({ url, isProfilePage, isHomePage }) {








  const { song, liked, setLiked, handleFavorite, likedSongs, handleNextPrev, setWasPlayed, playing, setPlaying, wasPlayed } = useContext(DataContext);




  // This code block is added to handle two different cases for displaying thumbnails.
  // The 'liked' songs list is treated differently because it receives data from the server,
  // not directly from the YouTube API. Therefore, we need to accommodate for the possibility
  // that thumbnails might be provided as either a string or an array.
  // If 'thumbnails' is a string, we use it directly as the image link.
  // If it's an array (from the YouTube API), we attempt to access the first item's URL.
  // This ensures compatibility with both data formats in a straightforward manner.

  let imageLink = "/path/to/default/image.jpg";

  if (typeof song.thumbnails === 'string') {
    imageLink = song.thumbnails;
  }
  else if (Array.isArray(song.thumbnails) && song.thumbnails.length > 0) {
    imageLink = song.thumbnails[0].url
  };

  //////////////////////////////////////////

  const isLiked = likedSongs.includes(song.video_id);

  const onClic = (e) => {
    handleFavorite(song, e, song.video_id);
  };

  const [played, setPlayed] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const playerRef = useRef(null);

  const openScreen = () => {
    setIsOpen(!isOpen);
  };


  const handleSeekChange = e => {
    // עדכון ההתקדמות לפי הלחיצה על הסרגל
    const newPlayed = parseFloat(e.target.value);
    setPlayed(newPlayed);
    playerRef.current.seekTo(newPlayed);
  };


  const togglePlayPause = () => {
    setPlaying(!playing);

    if (!playing) {
      setWasPlayed(!wasPlayed);
    }
  };



  const handleProgress = progress => {

    // progress.played יכיל את האחוז של ההתקדמות
    setPlayed(progress.played);
    if (progress.played >= 0.99) { // 99% כדי להבטיח שהשיר באמת עומד להסתיים
      handleNextPrev('next');
    }

  };




  const [showVideo, setShowVideo] = useState(true)


  const handlePlayVideo = () => {
    setShowVideo(!showVideo);
  }





  const [duration, setDuration] = useState(0); // מאחסן את האורך הכולל של השיר בשניות
  const formatTime = (seconds) => {
    const rounded = Math.floor(seconds);
    const minutes = Math.floor(rounded / 60);
    const remainingSeconds = rounded % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };





  useEffect(() => {
    const handleSpaceBar = (event) => {
      // קביעה אם הפוקוס נמצא על אלמנט שמאפשר קלט טקסט
      const isTyping = document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA';

      if (event.code === 'Space' && !isTyping) {
        event.preventDefault(); // מונע את ההתנהגות הדיפולטיבית של מקש ה-space
        togglePlayPause();
      }
    };

    window.addEventListener('keydown', handleSpaceBar);

    return () => {
      window.removeEventListener('keydown', handleSpaceBar);
    };
  }, [togglePlayPause]);



  return (
    url ? (
      <div className={`${styles.player} player-enter`}>
        <div className={styles.progressContainer}>
          <div className={styles.progressOverlay}></div>
          <div className={styles.progressBar} style={{ width: `${played * 100}%` }}></div>
          <input
            className={styles.progressInput}
            type="range"
            min={0}
            max={1}
            step="any"
            value={played}
            onChange={handleSeekChange}
          />
        </div>

        <div className={styles.songDetails}>
          <div className={styles.image}>
            <img src={imageLink} alt="Song Thumbnail" />
          </div>
          <div className={styles.artistAndName}>
            <div className={styles.name}>{song.title}</div>
            <div className={styles.artist}>{song.author}</div>
          </div>
          <div className={styles.time}>{formatTime(played * duration)} / {formatTime(duration)}</div>
          <button className={`${styles.likeButton} ${likedSongs.includes(song.video_id) || song.likedStatus ? styles.liked : ''}`} onClick={onClic} ><FaHeart /></button>





        </div>

        {
          (isOpen || (!isProfilePage && !isHomePage)) && (
  <div className={isOpen ? `${styles.screen}` : `${styles.closedScreen}`}>
  <div className={`${styles.coverImage} ${showVideo ? 'video' : 'hidden'}`}>
    <img src={imageLink} alt="Song Thumbnail" />
  </div>
  {isOpen?  <div className={styles.title}>{song.title}</div>
:""}
</div>

          )}
        <div className={`${styles.video} ${(!isOpen && (isHomePage || isProfilePage)) ? styles.hiddenVideo : ''} ${showVideo ? 'hidden' : 'video'}`}>
          <ReactPlayer
            ref={playerRef}
            url={url}
            controls={false}
            playing={playing}
            onProgress={handleProgress}
            onDuration={setDuration}
          />
        </div>


        <div className={styles.buttons}>
          <button className={styles.prevButton} onClick={() => handleNextPrev('prev')}><TbPlayerTrackPrevFilled /></button>
          <button className={styles.playButton} onClick={togglePlayPause}>{playing ? <FaPause /> : <FaPlay />}</button>
          <button className={styles.nextButton} onClick={() => handleNextPrev('next')}><TbPlayerTrackNextFilled /></button>
        </div>

        <div className={styles.rightArea}>
          <button className={styles.playVid} onClick={handlePlayVideo}>

            {showVideo ? <HiMiniVideoCamera /> : <HiMiniVideoCameraSlash />
            }
          </button>
          <button className={styles.openScreen} onClick={openScreen}><PiMonitorPlayFill />
          </button>
        </div>
      </div>
    ) : ""
  );

}