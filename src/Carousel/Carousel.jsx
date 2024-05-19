// import React, { useRef } from 'react';
// import styles from './style.module.css';
// import PlayListBox from '../PlayListBox/PlayListBox';

// export default function Carousel({ items }) {
//   const viewportRef = useRef();

//   const scroll = (direction) => {
//     const { current: viewport } = viewportRef;
//     if (viewport) {
//       const scrollAmount = viewport.offsetWidth; // או כל קצב גלילה אחר שתרצה
//       const newScrollPosition = direction === 'next' ? viewport.scrollLeft + scrollAmount : viewport.scrollLeft - scrollAmount;
//       viewport.scroll({ left: newScrollPosition, behavior: 'smooth' });
//     }
//   };

//   return (
//     <div className={styles.carousel}>
//       <button onClick={() => scroll('prev')} className={styles.carousel__prev}>Prev</button>
//       <div className={styles.carousel__viewport} ref={viewportRef}>
//         {items.map((item, index) => (
//           <div key={index} className={styles.carousel__slide}>
//             <PlayListBox playlist={item} />
//           </div>
//         ))}
//       </div>
//       <button onClick={() => scroll('next')} className={styles.carousel__next}>Next</button>
//     </div>
//   );
// }








import React, { useState } from 'react';
import styles from './style.module.css';
import PlayListBox from '../PlayListBox/PlayListBox';
import { GrNext, GrPrevious } from "react-icons/gr";

export default function Carousel({ songsList, itemsPerSlide = 2, onSongClick }) {
    const [currentSlide, setCurrentSlide] = useState(0);
    
    const nextSlide = () => {
        setCurrentSlide((prevSlide) =>
            prevSlide + 1 < Math.ceil(songsList.length / itemsPerSlide) ? prevSlide + 1 : 0
        );
    };

    const prevSlide = () => {
        setCurrentSlide((prevSlide) =>
            prevSlide - 1 >= 0 ? prevSlide - 1 : Math.ceil(songsList.length / itemsPerSlide) - 1
        );
    };

    const [activeSongId, setActiveSongId] = useState(null);
    
    const handleActiveSong = (videoId, song) => {
        setActiveSongId(videoId);
        onSongClick(videoId, song);
    };

    return (
        <div className={styles.carousel}>
            <button className={styles.prevButton} onClick={prevSlide}><GrPrevious /></button>
            <div className={styles.carouselWrapper}>
                <div className={styles.carouselInner} style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                    {songsList.map((song, index) => (
                        <div className={styles.slide} key={song.video_id}>
                            <PlayListBox
                                song={song}
                                isActive={song.video_id === activeSongId}
                                onClick={() => handleActiveSong(song.video_id, song)}
                            />
                        </div>
                    ))}
                </div>
            </div>
            <button className={styles.nextButton} onClick={nextSlide}><GrNext /></button>
        </div>
    );
}




{/* <div className={styles.carousel}>
<button className={styles.prevButton} onClick={prevSlide}><GrPrevious /></button>
<div className={styles.carouselInner}>
    {songsList?.slice(currentSlide, currentSlide + itemsPerSlide).map((song, index) => (

        <PlayListBox key={index} song={song} />
    ))}
</div> <div className={styles.controls}>
    <button className={styles.nextButton} onClick={nextSlide}><GrNext /></button>
</div> </div>
);

} */}