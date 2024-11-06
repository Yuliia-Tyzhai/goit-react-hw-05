import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieCast } from '../../services/api';
import styles from './MovieCast.module.css';

const defaultImg =
  '<https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg>';

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCast = async () => {
      try {
        setIsLoading(true);
        const data = await getMovieCast(movieId);
        setCast(data.cast);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCast();
  }, [movieId]);

  return (
    <div>
      <h2>Cast</h2>
      {isLoading && <p>Loading...</p>}
      {error && (
        <p>Oops, some error occurred: {error}. Please try again later 🤷‍♂️.</p>
      )}
      <ul className={styles.castList}>
        {cast.map(actor => (
          <li key={actor.id} className={styles.castItem}>
            <img
              src={
                actor.profile_path
                  ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
                  : defaultImg
              }
              // src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
              alt={actor.name}
              className={styles.castImage}
            />
            <p>{actor.name}</p>
            <p>Character: {actor.character}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieCast;
