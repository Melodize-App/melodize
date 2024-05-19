import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from "./style.module.css"
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';


export default function Login({ setIsAuthenticated }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const [incorrectPassword, setIncorrectPassword] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/user/login', {
        email,
        password,
      });

      console.log('Token:', response.data.token);
      localStorage.setItem('token', response.data.token);

      localStorage.setItem('userEmail', email); // שמירת האימייל לשימוש מאוחר יותר

      setIsAuthenticated(true); // עדכון מצב האימות

      navigate("/"); // Redirect to home page
    } catch (error) {
      console.error('Login error:', error.response ? error.response.data : error.message);
      setIncorrectPassword(true)

    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className={styles.login}>

      <div className={styles.leftArea}>
        <div className={styles.logo}>
          <img src="public\Melodize logo.png" alt="" />
        </div>
        <div className={styles.headline}>
          <span className={styles.highlight}>Optimize</span> your <span className={styles.highlight}>melodies</span> through the magic of <span className={styles.highlight}>AI</span>
        </div>
        <div className={styles.text}>
          Effortlessly curate your favorite <span className="highlight">tracks</span>, and experience the magic of AI-powered optimization.
          Join now and elevate your music experience today.
        </div>

      </div>


      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.title}>
          Login
        </div>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className={styles.email}
        />
        <div className={styles.passwordContainer}>
          <input
            type={isPasswordVisible ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className={`${styles.password} ${styles.input}`}
          />
          <button
            onClick={togglePasswordVisibility}
            className={styles.passwordToggle}
            type="button"
          >
            {isPasswordVisible ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
          </button>
        </div>

        <button type="submit" className={styles.submitButton}>Login</button>
        <div className={styles.incorrect}>
          {incorrectPassword ? "Login failed. Please check your username, password, and internet connection" : ""}
        </div>
      </form>
    </div>
  );
}
