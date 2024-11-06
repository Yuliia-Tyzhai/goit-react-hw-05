import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import styles from './App.module.css';
import clsx from 'clsx';

const HomePage = lazy(() => import('../pages/HomePage/HomePage'));
const MoviesPage = lazy(() => import('../pages/MoviesPage/MoviesPage'));
const MovieDetailsPage = lazy(() =>
  import('../pages/MovieDetailsPage/MovieDetailsPage')
);
const MovieCast = lazy(() => import('./MovieCast/MovieCast'));
const MovieReviews = lazy(() => import('./MovieReviews/MovieReviews'));
const Navigation = lazy(() => import('./Navigation/Navigation'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage/NotFoundPage'));

const buildCssClass = ({ isActive }) =>
  clsx(styles.link, isActive && styles.active);

function App() {
  // const [searchTerm, setSearchTerm] = useState('');

  // const handleSearch = term => {
  //   setSearchTerm(term);
  // };
  return (
    <div>
      <Navigation />
      <NavLink className={buildCssClass} to="/movies/:movieId"></NavLink>
      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movies" element={<MoviesPage />} />
            <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
              <Route path="cast" element={<MovieCast />} />
              <Route path="reviews" element={<MovieReviews />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
}

export default App;
