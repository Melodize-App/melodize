import React from 'react';

import { useContext } from 'react';
import PlayListBox from '../PlayListBox/PlayListBox';
import DataContext from '../context/DataContext';
import styles from "./style.module.css"

export default function PlyLists({ onSongClick}) {
  const { songs, setSongs, playLists, setplayLists } = useContext(DataContext);

  

  
  return (
<div className={styles.listt}>
  {playLists?.map(playlist => (
    <div key={playlist.name}>
      <PlayListBox playlist={playlist} />
    </div>
  ))}
</div>

  )

}