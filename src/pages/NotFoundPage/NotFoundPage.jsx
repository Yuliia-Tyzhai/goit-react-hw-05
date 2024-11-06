import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.css';

const NotFoundPage = () => {
  return (
    <div className={styles.notFound}>
      <h2>Page Not Found</h2>
      <p>Sorry, we couldn't find the page you are looking for</p>
      <Link to="/">Go to Home</Link>;
    </div>
  );
};

export default NotFoundPage;
