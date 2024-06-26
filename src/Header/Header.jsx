import React, { useState, useRef, useEffect } from 'react';
import styles from "./style.module.css";
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Search from '../Search/Search';
import { AiOutlineUser } from "react-icons/ai";
import { IoMdLogOut } from "react-icons/io";
import { LuSettings } from "react-icons/lu";
import { FiMenu } from "react-icons/fi";


export default function Header({ handleSearch }) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleProfile = () => {
    setIsOpen(!isOpen);
  };

  const handleEdit = () => {
    navigate('/profile');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleHome = () => {
    navigate('/home');
  };

  const handleLiked = () => {
    navigate('/liked');
  };

  const handleSettings = () => {
    navigate('/settings');
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className={styles.header}>
        <div onClick={handleLogoClick} className={styles.logo}>
          <img src="Melodize logo.png" alt="" />
        </div>
        <div className={styles.search}>
          <Search handleSearch={handleSearch} />
        </div>

        <div className={styles.menuList}>
          <NavLink to="/home" className={({ isActive }) => isActive ? styles.active : styles.unActive}> Home </NavLink>

          <NavLink to="/liked" className={({ isActive }) => isActive ? styles.active : styles.unActive}>
            Liked
          </NavLink>

          <NavLink onMouseEnter={handleProfile} className={({ isActive }) => isActive ? styles.activeProfile : styles.unActiveProfile}>
            <AiOutlineUser />
          </NavLink>
        </div>

        <div className={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)}>
          <FiMenu />
        </div>

        <div className={`${styles.sideMenu} ${menuOpen ? styles.open : ''}`}>
          
          <div onClick={handleHome} className={styles.option}>
            <AiOutlineUser />
            <div className={styles.optionTitle}>Home</div>
          </div>

          <div onClick={handleLiked} className={styles.option}>
            <AiOutlineUser />
            <div className={styles.optionTitle}>Liked</div>
          </div>
          <div onClick={handleEdit} className={styles.option}>
            <AiOutlineUser />
            <div className={styles.optionTitle}>Edit Profile</div>
          </div>
          <div onClick={handleLogout} className={styles.option}>
            <IoMdLogOut />
            <div className={styles.optionTitle}>Logout</div>
          </div>
          <div onClick={handleSettings} className={styles.option}>
            <LuSettings />
            <div className={styles.optionTitle}>Settings</div>
          </div>
        </div>


        {isOpen && (
          <div ref={menuRef} className={styles.menu}>
            <div onClick={handleEdit} className={styles.option}>
              <AiOutlineUser />
              <div className={styles.optionTitle}>Edit Profile</div>
            </div>

            <div onClick={handleLogout} className={styles.option}>
              <IoMdLogOut />
              <div className={styles.optionTitle}>Logout</div>
            </div>

            <div onClick={handleSettings} className={styles.option}>
              <LuSettings />
              <div className={styles.optionTitle}>Settings</div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
