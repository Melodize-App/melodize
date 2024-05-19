import React, { useEffect, useState } from 'react';
import Player from '../Player/Player';
import Header from '../Header/Header';
import Liked from '../Liked/Liked';
import Profile from '../Profile/Profile';
import { Routes, useLocation, useNavigate } from 'react-router-dom';
import { Route } from 'react-router-dom';
import DataContext from '../context/DataContext';
import styles from "./style.module.css"
import axios from 'axios';
import Home from '../Home/Home';

export default function Layout() {

  const [searchTerm, setSearchTerm] = useState('');
  const [playing, setPlaying] = useState(true);
  const [user, setUser] = useState([]);
  const [songs, setSongs] = useState([])
  const [topFiveSongs, setTopFiveSongs] = useState([]);
  const [currentSource, setCurrentSource] = useState("")
  const [song, setSong] = useState([]);
  const [currentSongUrl, setCurrentSongUrl] = useState(null);
  const [likedSongsList, setlikedSongsList] = useState([]);
  const [currentSongId, setCurrentSongId] = useState(null);
  const [wasPlayed, setWasPlayed] = useState(false);
  const [likedSongs, setLikedSongs] = useState([]);


  // API request for YouTube songs
  useEffect(() => {
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
      });
    });
  }, [searchTerm]);

  // Get user information from local storage and API
  useEffect(() => {
    const userEmail = localStorage.getItem('userEmail');
    if (userEmail) {
      const token = localStorage.getItem('token');
      axios.get(`http://localhost:3000/user/${encodeURIComponent(userEmail)}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(res => {
        setUser(res.data);
        console.log("GET USER", res.data);
      })
      .catch(err => {
        console.error(err);
        navigate("/login");
      });
    }
  }, []);

  // Handle search functionality
  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
    navigate("/");
  };

  // Format image link for song thumbnails
  function formattedImageLink(image) {
    const defaultImageLink = "/path/to/default/image.jpg";
    if (typeof image === 'string') {
      return image;
    } else if (Array.isArray(image) && image.length > 0 && image[0].url) {
      return image[0].url;
    }
    return defaultImageLink;
  }

  // Handle song click to play specific song
  const handleSongClick = (songID, songDetails, source) => {
    setCurrentSource(source);
    let url = `https://www.youtube.com/watch?v=${songID}`;
    setCurrentSongUrl(url);
    setSong(songDetails);
    setCurrentSongId(songID);

    const token = localStorage.getItem('token');
    const imageLink = formattedImageLink(songDetails.thumbnails);

    axios.post("http://localhost:3000/top", {
      video_id: songDetails.video_id,
      title: songDetails.title,
      author: songDetails.author,
      thumbnails: imageLink,
      user: user._id,
      video_length: songDetails.video_length
    }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then(response => {
      console.log('Listened Song added successfully:', response);
    })
    .catch(error => {
      console.error('Error adding song:', error);
    });
  };


  // Handle next and previous song functionality
  const handleNextPrev = (direction) => {
    const currentArray = currentSource === "search" ? songs : (currentSource === "favorites" ? likedSongsList : []);
    if (!currentArray?.length) return;

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
    const newSong = currentArray[newIndex];
    setCurrentSongId(newSong.video_id);
    setCurrentSongUrl(`https://www.youtube.com/watch?v=${newSong.video_id}`);
    setSong(newSong);
  };


  // Fetch top five songs
  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get(`http://localhost:3000/top/65f6adca8facfe1788d48d21`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(res => {
      console.log("req test", res.data);
      setTopFiveSongs(res.data);
    })
    .catch(err => {
      console.error(err);
    });
  }, []);


// Handle favorite song functionality
const handleFavorite = (song, e, videoId) => {
  e.stopPropagation();
  const token = localStorage.getItem('token');
  const isAlreadyLiked = likedSongs.includes(videoId);

  if (isAlreadyLiked) {
    axios.put("http://localhost:3000/liked", { video_id: song.video_id, isLiked: false }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then(response => {
      console.log('Song removed:', response);
      setLikedSongs(likedSongs => likedSongs.filter(id => id !== videoId));
      setLikedSongs(likedSongs => likedSongs.map(song => song.id === videoId ? { ...song, likedStatus: false } : song));
      localStorage.setItem('likedSongs', JSON.stringify([...likedSongs, videoId]));
    })
    .catch(error => {
      console.error('Error removing song:', error);
      navigate("/login");
    });
  } else {
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
      }
    }).then(response => {
      console.log('Song added successfully:', response);
      setLikedSongs(likedSongs => [...likedSongs, videoId]);
      localStorage.setItem('likedSongs', JSON.stringify([...likedSongs, videoId]));
    })
    .catch(error => {
      console.error('Error adding song:', error);
    });
  }
};

  // Load liked songs from local storage
  useEffect(() => {
    const storedLikedSongs = JSON.parse(localStorage.getItem('likedSongs'));
    if (storedLikedSongs) {
      setLikedSongs(storedLikedSongs);
    }
  }, []);

  const location = useLocation();
  const isProfilePage = location.pathname === "/profile";
  const isHomePage = location.pathname === "/" || location.pathname === "/home";

  return (
    <DataContext.Provider value={{
      songs, setSongs, song, setSong, handleFavorite, likedSongs, setLikedSongs, handleSongClick,
      searchTerm, setSearchTerm, handleSearch, handleNextPrev, playing, setPlaying, wasPlayed, user, setUser, likedSongsList, setlikedSongsList, topFiveSongs
    }}>
      <div>
        <Header handleSearch={handleSearch} />
        <div className={styles.layout}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route path="liked" element={<Liked />} />
            <Route path="profile" element={<Profile />} />
          </Routes>
          <Player url={currentSongUrl} isProfilePage={isProfilePage} isHomePage={isHomePage} />
        </div>
      </div>
    </DataContext.Provider>
  );
}