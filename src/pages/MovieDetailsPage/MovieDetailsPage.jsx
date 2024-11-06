import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import axios from 'axios';
import { getMovieById } from '../../services/api';
import styles from './MovieDetailsPage.module.css';

const defaultImg =
  '<https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg>';

const MovieDetailsPage = () => {
  const [movie, setMovie] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const { movieId } = useParams();

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const data = await getMovieById(movieId);
        // const { data } = await axios.get(
        //   `https://api.themoviedb.org/3/movie/${movieId}?api_key=6107cd20be9476551a5a24eb10460349`
        // );
        setMovie(data);
        console.log(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchMovie();
  }, [movieId]);

  if (!movie) {
    return <p>Loading...</p>;
  }

  const backUrl = location.state?.from || '/movies';
  const goBack = () => navigate(backUrl);

  return (
    <>
      <div>
        <button className={styles.goBackBtn} onClick={goBack}>
          Go back
        </button>
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : defaultImg
          }
          // src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.original_title}
        />
        <h2>{movie.title}</h2>
        <h3>Overview</h3>
        <p>{movie.overview}</p>
        <h3>Genres</h3>
        <p>{movie.genres.map(genre => genre.name).join(', ')}</p>
        <Link state={{ from: backUrl }} to="cast">
          Cast
        </Link>
        <Link state={{ from: backUrl }} to="reviews">
          Reviews
        </Link>
        <Outlet />
      </div>
    </>
  );
};

export default MovieDetailsPage;
