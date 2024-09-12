import React, { useState, useEffect, useRef, useCallback } from 'react';
import styles from './style.module.css';
import PlayListBox from '../PlayListBox/PlayListBox';
import { GrNext, GrPrevious } from "react-icons/gr";

export default function Carousel({ songsList = [], itemsPerSlide = 2, onSongClick }) {
    const [activeSongId, setActiveSongId] = useState(null);
    const carouselRef = useRef(null);
    const [isScrolling, setIsScrolling] = useState(false);

    // Duplicate the songsList to create the illusion of infinite scroll
    const extendedSongsList = [...songsList, ...songsList, ...songsList];

    useEffect(() => {
        if (carouselRef.current) {
            const scrollWidth = carouselRef.current.scrollWidth;
            const clientWidth = carouselRef.current.clientWidth;
            
            // Set initial scroll position to the middle set of items
            carouselRef.current.scrollLeft = (scrollWidth - clientWidth) / 3;
        }
    }, [songsList]);

    const handleScroll = useCallback(() => {
        if (carouselRef.current && !isScrolling) {
            const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
            
            // If we're near the end, jump back to the middle
            if (scrollLeft + clientWidth > scrollWidth * 2 / 3) {
                setIsScrolling(true);
                carouselRef.current.scrollLeft = scrollWidth / 3;
                setTimeout(() => setIsScrolling(false), 50);
            }
            // If we're near the start, jump forward to the middle
            else if (scrollLeft < scrollWidth / 3) {
                setIsScrolling(true);
                carouselRef.current.scrollLeft = scrollWidth / 3;
                setTimeout(() => setIsScrolling(false), 50);
            }
        }
    }, [isScrolling]);

    const scroll = (direction) => {
        if (carouselRef.current) {
            const scrollAmount = carouselRef.current.clientWidth;
            carouselRef.current.scrollBy({
                left: direction * scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    const handleActiveSong = useCallback((videoId, song) => {
        setActiveSongId(videoId);
        onSongClick(videoId, song);
    }, [onSongClick]);

    return (
        <div className={styles.carousel}>
            <button className={styles.prevButton} onClick={() => scroll(-1)}><GrPrevious /></button>
            <div 
                className={styles.carouselWrapper} 
                ref={carouselRef}
                onScroll={handleScroll}
            >
                <div className={styles.carouselInner}>
                    {extendedSongsList.map((song, index) => (
                        <div className={styles.slide} key={`${song.video_id}-${index}`}>
                            <PlayListBox
                                song={song}
                                isActive={song.video_id === activeSongId}
                                onClick={() => handleActiveSong(song.video_id, song)}
                            />
                        </div>
                    ))}
                </div>
            </div>
            <button className={styles.nextButton} onClick={() => scroll(1)}><GrNext /></button>
        </div>
    );
}