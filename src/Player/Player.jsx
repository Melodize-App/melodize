import React, { useState, useRef, useEffect, useContext } from 'react';
import ReactPlayer from 'react-player';
import { FaPlay, FaPause, FaHeart } from 'react-icons/fa';
import { PiMonitorPlayFill } from "react-icons/pi";
import { HiMiniVideoCamera, HiMiniVideoCameraSlash } from "react-icons/hi2";
import { TbPlayerTrackNextFilled, TbPlayerTrackPrevFilled } from "react-icons/tb";
import DataContext from '../context/DataContext';
import styles from "./style.module.css";

export default function Player({ url, isProfilePage, isHomePage }) {
  const { song, handleFavorite, likedSongs, handleNextPrev, setWasPlayed, playing, setPlaying, wasPlayed } = useContext(DataContext);

  // Determine the image link based on song thumbnails
  let imageLink = "/path/to/default/image.jpg";
  if (typeof song.thumbnails === 'string') {
    imageLink = song.thumbnails;
  } else if (Array.isArray(song.thumbnails) && song.thumbnails.length > 0) {
    imageLink = song.thumbnails[0].url;
  }

  // Handles the click event for the favorite button
  const onClic = (e) => {
    handleFavorite(song, e, song.video_id);
  };

  const [played, setPlayed] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const playerRef = useRef(null);

  // Toggles the screen open or closed
  const openScreen = () => {
    setIsOpen(!isOpen);
  };

  // Handles the change in seek bar position
  const handleSeekChange = (e) => {
    const newPlayed = parseFloat(e.target.value);
    setPlayed(newPlayed);
    playerRef.current.seekTo(newPlayed);
  };

  // Toggles play/pause state
  const togglePlayPause = () => {
    setPlaying(!playing);
    if (!playing) {
      setWasPlayed(!wasPlayed);
    }
  };

  // Updates the played state and checks if the song has ended to play the next song
  const handleProgress = (progress) => {
    setPlayed(progress.played);
    if (progress.played >= 0.99) {
      handleNextPrev('next');
    }
  };

  const [showVideo, setShowVideo] = useState(true);

  // Toggles video visibility
  const handlePlayVideo = () => {
    setShowVideo(!showVideo);
  };

  const [duration, setDuration] = useState(0);

  // Formats the duration from seconds to mm:ss format
  const formatTime = (seconds) => {
    const rounded = Math.floor(seconds);
    const minutes = Math.floor(rounded / 60);
    const remainingSeconds = rounded % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  // Toggle play/pause with space bar
  useEffect(() => {
    const handleSpaceBar = (event) => {
      const isTyping = document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA';
      if (event.code === 'Space' && !isTyping) {
        event.preventDefault();
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
        {(isOpen || (!isProfilePage && !isHomePage)) && (
          <div className={isOpen ? `${styles.screen}` : `${styles.closedScreen}`}>
            <div className={`${styles.coverImage} ${showVideo ? 'video' : 'hidden'}`}>
              <img src={imageLink} alt="Song Thumbnail" />
            </div>
            {isOpen ? <div className={styles.title}>{song.title}</div> : ""}
          </div>)}
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
            {showVideo ? <HiMiniVideoCamera /> : <HiMiniVideoCameraSlash />}
          </button>
          <button className={styles.openScreen} onClick={openScreen}><PiMonitorPlayFill />
          </button>
        </div>
      </div>
    ) : ""
  );
}