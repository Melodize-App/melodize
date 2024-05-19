import React, { useEffect } from 'react';
import { useState } from 'react';


import DataContext from '../context/DataContext';
import { useContext } from 'react';
import Song from '../Song/Song';

export default function SongsList({ onSongClick, songs}) {

  return (
    <div className='list'>
      {songs?.map(song => (
        <div key={song.video_id} onClick={() => onSongClick(song.video_id, song)}>

                  {/* <div key={song.video_id} onClick={() => onSongClick(song.video_id, song,"search")}> */}

          {/* {console.log((songs))} */}
          <Song song={song} />
        </div>
      ))}
    </div>
  )

}