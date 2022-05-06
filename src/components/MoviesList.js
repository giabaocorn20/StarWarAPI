import React from 'react';

import Movie from './Movie';
import classes from './MoviesList.module.css';

const MovieList = (props) => {
  const listOfMovies = props.movies.map((movie) => (
    <Movie
      key={movie.id}
      title={movie.title}
      releaseDate={movie.releaseDate}
      openingText={movie.openingText}
    />
  ))
  
  return (
    <ul className={classes['movies-list']}>
      {listOfMovies}
    </ul>
  );
};

export default MovieList;
