import React, { useEffect } from 'react';
import styles from "./style.module.css";

export default function SongBox({ song, onClick, isActive }) {

  return (
    <div
      className={`${isActive ? styles.activeBox : styles.box}`}
      onClick={onClick}
      style={{ backgroundImage: `url(${song.thumbnails})` }}>
      <div className={styles.authorAndTitle}>
        <div className={styles.author}>{song?.author}</div>
        <div className={styles.title}>{song?.title}</div>
      </div>
    </div>
  );
}
