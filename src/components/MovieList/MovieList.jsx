import React from 'react';
import styles from './MovieList.module.css';
import { Link, useLocation } from 'react-router-dom';

const MovieList = ({ films }) => {
  const location = useLocation();

  return (
    <div className={styles.list}>
      {films.map(item => (
        <Link
          state={{ from: location }}
          to={`/movies/${item.id}`}
          key={item.id}
          className={styles.listItem}
        >
          <h3 className={styles.itemTitle}>{item.title}</h3>
        </Link>
      ))}
    </div>
  );
};

export default MovieList;
