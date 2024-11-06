import React from 'react';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import styles from './Navigation.module.css';

const buildCssClass = ({ isActive }) =>
  clsx(styles.link, isActive && styles.active);

const Navigation = () => {
  return (
    <div>
      <NavLink className={buildCssClass} to="/">
        Home
      </NavLink>
      <NavLink className={buildCssClass} to="/movies">
        Movies
      </NavLink>
    </div>
  );
};

export default Navigation;
