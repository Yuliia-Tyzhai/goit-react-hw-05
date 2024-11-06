import React, { useEffect, useState } from 'react';
import styles from './HomePage.module.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { getMovies } from '../../services/api';
import MovieList from '../../components/MovieList/MovieList';

const HomePage = () => {
  const [films, setFilms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchValue, setSearchValue] = useState(null);

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        setIsLoading(true);
        const data = await getMovies(searchValue);
        // const { data } = await axios.get(
        //   'https://api.themoviedb.org/3/trending/movie/week?api_key=6107cd20be9476551a5a24eb10460349'
        // );
        setFilms(data.results);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFilms();
  }, []);

  return (
    <div>
      <h2>Trending today</h2>
      <MovieList films={films} />
    </div>
  );
};

export default HomePage;
