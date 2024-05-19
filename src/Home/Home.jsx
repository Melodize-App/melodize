import React, { useContext } from 'react'
import SongsList from '../Songlist/SongsList';
import DataContext from '../context/DataContext';
import PlayLists from '../PlayLists/PlayLists';
import styles from "./style.module.css"
import Carousel from '../Carousel/Carousel';
import PlayListBox from '../PlayListBox/PlayListBox';



export default function Home() {



  const { setSearchTerm, handleSearch, user, likedSongs, setLikedSongs, likedSongsList, setlikedSongsList, handleSongClick, searchTerm, songs, wasPlayed, topFiveSongs } = useContext(DataContext);

  console.log("test" + topFiveSongs); // זה יאפשר לך לראות אם יש בעיות בנתונים לפני העברתם


  //   return (
  //     /* רינדור מותנה כללי עבור searchTerm */
  //     searchTerm ? (
  //       <div className={styles.home}>
  //         <div className={styles.listContainer}>
  //           <SongsList onSongClick={(songID, song) => handleSongClick(songID, song, "search")} searchTerm={searchTerm} songs={songs} />

  //         </div>
  //       </div>
  //     ) : <div className={styles.home2}>

  //       <div className={styles.title}>Recently played
  //       <Carousel items={playLists} itemsPerSlide={2} />
  // </div>
  //       </div>
  //   );

  // }


  const userId = user._id;


  return (
    // רינדור מותנה כללי עבור searchTerm
    searchTerm ? (
      <div className={styles.home}>
        <div className={styles.listContainer}>
          {/* <SongsList onSongClick={handleSongClick} searchTerm={searchTerm} songs={songs} /> */}

          <SongsList onSongClick={(songID, song) => handleSongClick(songID, song, "search")} searchTerm={searchTerm} songs={songs} />
        </div>
      </div>
    ) : (
      !wasPlayed && (
        <div className={styles.playlistList}>
          <div className={styles.firstTitle}>Recent Echoes</div>
          <Carousel onSongClick={(songID, song) => handleSongClick(songID, song)} searchTerm={searchTerm} songs={likedSongsList} songsList={topFiveSongs} itemsPerSlide={4} />
          <div className={styles.title}>Crafted For You</div>
          <Carousel onSongClick={(songID, song) => handleSongClick(songID, song)} searchTerm={searchTerm} songs={likedSongsList} songsList={topFiveSongs} itemsPerSlide={4} />
          <div className={styles.title}>Trending Hits</div>
          <Carousel onSongClick={(songID, song) => handleSongClick(songID, song)} searchTerm={searchTerm} songs={likedSongsList} songsList={topFiveSongs} itemsPerSlide={4} />
        </div>
      )
    )
  );
}


































