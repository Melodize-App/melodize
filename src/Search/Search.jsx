import styles from "./style.module.css"
import { FaSearch } from 'react-icons/fa';

export default function Search({ handleSearch }) {

  const onKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch(event.target.value);
    }
  };

  return (
    <div className={styles.searchInput}>
      <input type="search" placeholder='Search any song' onKeyPress={onKeyPress} />
      <FaSearch className={styles.searchIcon} />
    </div>
  );
}