import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import styles from './MoviesPage.module.css';
import { getMovies } from '../../services/api';
import MovieList from '../../components/MovieList/MovieList';
import { useSearchParams } from 'react-router-dom';

const notify = () => toast('You should write something!');

const MoviesPage = () => {
  const [films, setFilms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  const searchValue = searchParams.get('query') || '';

  const handleSubmit = event => {
    event.preventDefault();
    if (!searchTerm.trim()) {
      notify();
      return;
    }
    setSearchParams({ query: searchTerm });
  };

  useEffect(() => {
    if (!searchValue) return;

    const fetchFilmsBySearchValue = async () => {
      try {
        setIsLoading(true);
        const data = await getMovies(searchValue);
        setFilms(data.results);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchFilmsBySearchValue();
  }, [searchValue]);

  return (
    <div>
      <header className={styles.header}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            className={styles.input}
            type="text"
            autoComplete="off"
            autoFocus
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <button type="submit">Search</button>
          <Toaster />
        </form>
      </header>
      {isLoading && <p>Loading...</p>}
      {error && (
        <p>Oops, some error occurred: {error}. Please try again later 🤷‍♂️.</p>
      )}
      {!isLoading && films.length > 0 && <MovieList films={films} />}
      {!isLoading && films.length === 0 && searchValue && (
        <p>No results found.</p>
      )}
    </div>
  );
};

export default MoviesPage;
