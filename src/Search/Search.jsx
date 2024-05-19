

import styles from "./style.module.css"
import { FaSearch } from 'react-icons/fa';

export default function Search({handleSearch}) {
  
  
  
  const onKeyPress = (event) => {
    // בדיקה אם המקש שנלחץ הוא Enter
    if (event.key === 'Enter') {
      // קריאה ל- handleSearch עם ערך הטקסט
      handleSearch(event.target.value);
    }
  };

  return (
    <div className={styles.searchInput}>
      <input type="search" placeholder='Search any song' onKeyPress={onKeyPress} />
      <FaSearch className={styles.searchIcon}/>
    </div>
  );
}