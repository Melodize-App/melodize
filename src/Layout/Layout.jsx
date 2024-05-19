import React, { useEffect, useState } from 'react';
import SongsList from '../Songlist/SongsList';
import Player from '../Player/Player';
import Header from '../Header/Header';
import Search from"../Search/Search";
import Liked from '../Liked/Liked';
import Profile from '../Profile/Profile';
import { Routes, useLocation, useNavigate } from 'react-router-dom';
import { Route } from 'react-router-dom';
import DataContext from '../context/DataContext';
import styles from "./style.module.css"
import axios from 'axios';
import Home from '../Home/Home';


export default function Layout() {


///API req for YT songs

 const [searchTerm, setSearchTerm] = useState('');

  useEffect(() =>
  {
    const url = `https://youtube-v2.p.rapidapi.com/search/?query=${searchTerm}&lang=en&order_by=this_year`;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': import.meta.env.VITE_REACT_APP_RAPID_KEY,
        'X-RapidAPI-Host': 'youtube-v2.p.rapidapi.com'
        
      }
      
    };

    fetch(url, options).then((res) => {
      res.json().then((object) => {
        setSongs(object.videos);
        // console.log("search",object.videos );
      });
    });

  }, [searchTerm]);

////////////////////////////////////////////////////////////////



const [playing, setPlaying] = useState(true);
















  //get user 
  const [user, setUser] = useState([]);


  useEffect(() => {
    const userEmail = localStorage.getItem('userEmail');
    if (userEmail) {
      const token = localStorage.getItem('token'); // קבלת הטוקן מהאחסון המקומי
      axios.get(`http://localhost:3000/user/${encodeURIComponent(userEmail)}`, {
        headers: {
          'Authorization': `Bearer ${token}` // הוספת הטוקן לכותרת הבקשה
        }
      })
      .then(res => {
        setUser(res.data);
        console.log("GET USER",res.data);
      })
      .catch(err => {
        console.error(err);
        navigate("/login");

      });
      
    }}, []);


///////////////////////////////////////////////////////////////














//Search option


const navigate = useNavigate();

console.log(user._id);

const handleSearch = (searchTerm) => {
  setSearchTerm(searchTerm);
  //redirect the user to homepage amd results if he is in another page
  navigate("/");
};

////////////////////////////////////////////////////////////////
  //Songs list
  const [songs, setSongs]=useState([])

////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////
  //Playlists list

const Playlistss=[
  {"name": "Summer Hits", "genre": "Pop", "songCount": 25},
  {"name": "Rock Anthems", "genre": "Rock", "songCount": 30},
  {"name": "Hip Hop Classics", "genre": "Hip Hop", "songCount": 20},
  {"name": "Electronic Essentials", "genre": "Electronic", "songCount": 22},
  {"name": "Jazz Vibes", "genre": "Jazz", "songCount": 15},
  {"name": "Winter Vibes", "genre": "Jazz", "songCount": 12}

]


  const [playLists, setplayLists]=useState(Playlistss)

////////////////////////////////////////////////////////////////


//Instant content for users for demo

const users = [
  {
      "name": "Alex Johnson",
      "profileImage": "https://example.com/path/to/alex-profile.jpg",
      "favoriteSongs": [
          {"title": "Song 1", "artist": "Artist A", "video_id": "1"},
          {"title": "Song 2", "artist": "Artist B", "video_id": "2"},
          {"title": "Song 3", "artist": "Artist C", "video_id": "3"},
      ],
      "userPlaylists": [
          {"name": "Chill Vibes", "genre": "Chill", "songCount": 10},
          {"name": "Workout Hits", "genre": "Electronic", "songCount": 20},
      ]
  },
  {
      "name": "Emma Williams",
      "profileImage": "https://example.com/path/to/emma-profile.jpg",
      "favoriteSongs": [
          {"title": "Song 4", "artist": "Artist D", "video_id": "4"},
          {"title": "Song 5", "artist": "Artist E", "video_id": "5"},
          {"title": "Song 6", "artist": "Artist F", "video_id": "6"},
      ],
      "userPlaylists": [
          {"name": "Rock Classics", "genre": "Rock", "songCount": 15},
          {"name": "Pop Hits", "genre": "Pop", "songCount": 25},
      ]
  }
];



///////////////////////////
//most played tracks



const [songPlayCount, setSongPlayCount] = useState({});

let topSongs=[];




// const getTopFiveSongs = () => {
//   return Object.values(songPlayCount)
//     .sort((a, b) => b.playCount - a.playCount)
//     .slice(0, 5); // אין צורך להשתמש ב .map אם המידע כבר נמצא באובייקטים האלה
// };



// console.log(getTopFiveSongs()); // מחזירה ומדפיסה את המערך topSongs






function formattedImageLink(image) {
  const defaultImageLink = "/path/to/default/image.jpg";

  if (typeof image === 'string') {
    return image; // אם הקלט הוא מחרוזת, הניח שהוא URL והחזר אותו
  } else if (Array.isArray(image) && image.length > 0 && image[0].url) {
    return image[0].url; // אם הקלט הוא מערך ויש לו איבר ראשון עם URL, החזר את ה-URL
  }

  return defaultImageLink; // בכל מקרה אחר, החזר את הלינק לתמונה הדיפולטיבית
}






///////////////////////////////////////



//Start play specific song
const [song, setSong] = useState([]);
const [currentSongUrl, setCurrentSongUrl] = useState(null);




const handleSongClick = (songID, songDetails, source) => {






  setCurrentSource(source);
  let url = `https://www.youtube.com/watch?v=${songID}`;
  setCurrentSongUrl(url);
  setSong(songDetails);
  setCurrentSongId(songID); // עדכון ה-ID של השיר הנוכחי

//fa songs
// setSongPlayCount(prevCounts => ({
//   ...prevCounts,
//   [songID]: {
//     video_id: songDetails.video_id,
//     title: songDetails.title,
//     author: songDetails.author,
//     thumbnails: songDetails?.thumbnails?.length > 0 ? songDetails.thumbnails : 'path/to/default/thumbnail.jpg',
//     isLiked: true,
//     userId: user._id,
//     video_length: songDetails.video_length,
//     playCount: prevCounts[songID] ? prevCounts[songID].playCount + 1 : 1 // Updating play count
//   }
// }));



// let imageLink="/path/to/default/image.jpg";

// if (typeof song.thumbnails === 'string') {
//   imageLink=song.thumbnails;
// }
// else if  (Array.isArray(song.thumbnails) && song.thumbnails.length > 0)
// {
//   imageLink =song.thumbnails[0].url
// };

const token = localStorage.getItem('token'); // קבלת הטוקן מהאחסון המקומי

const imageLink = formattedImageLink(song.thumbnails);

axios.post("http://localhost:3000/top", {
  video_id: song.video_id,
  title: song.title,
  author: song.author,
  thumbnails: imageLink,
  user: user._id,
  video_length: song.video_length
}
, {
  headers: {
    'Authorization': `Bearer ${token}`
  }}).then(response => {
    console.log('Listened Song added successfully:', response);
  })
  .catch(error => {
    console.error('Error adding song:', error);
  });
}; 






const [currentSource, setCurrentSource]=useState("")


const [likedSongsList, setlikedSongsList] = useState([]);


  const [currentSongId, setCurrentSongId] = useState(null);

  const handleNextPrev = (direction) => {
    // קביעה איזה מערך להשתמש בהתאם למקור השיר הנוכחי
    const currentArray = currentSource === "search" ? songs : (currentSource === "favorites" ? likedSongsList : []);
    // ודא שיש פריטים במערך
    if (!currentArray?.length) return;
  
    // מציאת האינדקס של השיר הנוכחי
    const currentSongIndex = currentArray.findIndex(song => song.video_id === currentSongId);
    
    let newIndex;
    if (direction === 'next') {
      newIndex = (currentSongIndex + 1) % currentArray.length;
    } else if (direction === 'prev') {
      newIndex = (currentArray.length + currentSongIndex - 1) % currentArray.length;
    } else {
      console.error('Invalid direction');
      return;
    }
  
    // השגת השיר בהתאם לאינדקס החדש
    const newSong = currentArray[newIndex];
  
    // עדכון ה-state עם הנתונים של השיר החדש
    setCurrentSongId(newSong.video_id);
    setCurrentSongUrl(`https://www.youtube.com/watch?v=${newSong.video_id}`);
    setSong(newSong);
  };
  
  
//////////////////////////////////////////////

  const [topFiveSongs, setTopFiveSongs] = useState([]);

//REQ FOR
  useEffect(() => {


    const token = localStorage.getItem('token');
    axios.get(`http://localhost:3000/top/65f6adca8facfe1788d48d21`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => {
          console.log("req test",res.data); 
          setTopFiveSongs(res.data);
          
        })
        .catch(err => {
          console.error(err);

        });

      }, []);


  // useEffect(() => {
  //   // פונקציה לקבלת חמשת השירים הפופולריים ביותר
  //   const updateTopSongs = getTopFiveSongs(); // הנחה שזו פונקציה שכבר כתובה
  //   setTopFiveSongs(updateTopSongs);    console.log('Top 5 songs updated:', topFiveSongs);
  
  //   // כאן תוכל לעשות משהו עם המערך topFiveSongs, כמו לעדכן מצב או לשמור אותו לשימוש נוסף
  //   // למשל, אם יש לך מצב בקומפוננטה ששומר את רשימת השירים הפופולריים, תוכל לעדכן אותו כאן
  // }, [songPlayCount]); // התלות ב-songPlayCount תגרום להפעלת ה-effect בכל פעם שהוא משתנה
  
  
  //////////////////////////////////////////////////////
  
  
  


  //Send the song to the liked list in server and make it favorite

  const [likedSongs, setLikedSongs] = useState([]); // מעקב אחרי שירים אהובים
  

  const handleFavorite = (song, e, videoId) => {
    e.stopPropagation(); // מונע התפשטות האירוע
    console.log(videoId);
    // console.log(likedSongs);

    const token = localStorage.getItem('token'); // קבלת הטוקן מהאחסון המקומי

    // בדיקה אם השיר כבר נמצא במועדפים
    const isAlreadyLiked = likedSongs.includes(videoId);

    if (isAlreadyLiked) {
      // אם השיר כבר נמצא, מסירים אותו
      axios.put("http://localhost:3000/liked", { video_id: song.video_id, isLiked: false }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }).then(response => {
          console.log('Song removed:', response);
          setLikedSongs(likedSongs => likedSongs.filter(id => id !== videoId));
          setLikedSongs(likedSongs =>
            likedSongs.map(song =>
              song.id === videoId ? { ...song, likedStatus: false } : song
            )
          );
          localStorage.setItem('likedSongs', JSON.stringify([...likedSongs, videoId]));

          


          // setSong(song.likedStatus=false);

        })
        .catch(error => {
          console.error('Error removing song:', error);
          navigate("/login");

        });
    } else {
      // אם השיר לא נמצא, מוסיפים אותו
      axios.post("http://localhost:3000/liked", {
        video_id: song.video_id,
        title: song.title,
        author: song.author,
        thumbnails: song?.thumbnails[0]?.url,
        isLiked: true,
        userId: user._id,
        video_length: song.video_length

      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }}).then(response => {
          console.log('Song added successfully:', response);
          // תיקון הקריאה ל-setLikedSongs
          setLikedSongs(likedSongs => [...likedSongs, videoId]);
          // עדכון localStorage
          localStorage.setItem('likedSongs', JSON.stringify([...likedSongs, videoId]));
          
        })
        .catch(error => {
          console.error('Error adding song:', error);
        });
    }
};








// const handleFavorite = async (song, e, videoId) => {
//   e.stopPropagation(); // מניעת התפשטות האירוע
//   const isAlreadyLiked = likedSongs.includes(videoId);

//   // שינוי 1: עדכון אופטימי של המצב לפני הבקשה לשרת
//   setLikedSongs(currentLikedSongs => {
//     return isAlreadyLiked
//           ? currentLikedSongs.filter(id => id !== videoId) // הסרת השיר מידית
//           : [...currentLikedSongs, videoId]; // הוספת השיר מידית
//   });

//   try {
//       if (isAlreadyLiked) {
//           // שינוי 2: הוספת await לקריאה אסינכרונית
//           setSong(song.likedStatus=false);

//           const response = await axios.put("http://localhost:3000/liked", { video_id: song.video_id, isLiked: false });
//           console.log('Song removed:', response); // שינוי 3: הודעה לאחר הסרת השיר בהצלחה

//       } else {
//           // שינוי 4: שליחת פרטי השיר בהתאם לצורך המקורי שלך
//           const response = await axios.post("http://localhost:3000/liked", {
//               video_id: song.video_id,
//               title: song.title,
//               author: song.author,
//               thumbnails: song?.thumbnails[0]?.url,
//               isLiked: true,
//               likedStatus: true,
//               userId: user._id,
//               time: song.video_length
//           });
          
//           console.log('Song added successfully:', response); // שינוי 5: הודעה לאחר הוספת השיר בהצלחה
//       }
//   } catch (error) {
//       console.error('Error updating song like status:', error); // שינוי 6: הודעת שגיאה כללית לכישלון בבקשה
//   }
// };



useEffect(() => {
  const storedLikedSongs = JSON.parse(localStorage.getItem('likedSongs'));
  if (storedLikedSongs) {
    setLikedSongs(storedLikedSongs);
  }
}, []);



  ///////////////////////////////////////////////////////////////


  const [wasPlayed, setWasPlayed] = useState(false);



  const location = useLocation();
  const isProfilePage = location.pathname === "/profile";
  const isHomePage = location.pathname === "/" || location.pathname === "/home";


  

  return (

 // <DataContext.Provider value={{ songs, setSongs, song, setSong, handleFavorite, likedSongs }}>
<DataContext.Provider value={{ songs, setSongs, song, setSong, handleFavorite,likedSongs, setLikedSongs, handleSongClick, 
  playLists, setplayLists, searchTerm, setSearchTerm, users,handleSearch,handleNextPrev, playing, setPlaying,wasPlayed,user, setUser,likedSongsList, setlikedSongsList,topFiveSongs }}>

    <div>
    <Header handleSearch={handleSearch}/>
    <div className={styles.layout}>
      
      <Routes>
      
      <Route path="/" element={<Home />}/>
      <Route path="home" element={<Home />}/>
        <Route path="liked" element={<Liked/>}/>
        <Route path="Profile" element={<Profile/>}/>
      </Routes>
      <div>
        
        </div><Player url={currentSongUrl}  isProfilePage={isProfilePage}  isHomePage={isHomePage}/>
    </div>
    </div>
  </DataContext.Provider>
  );
}