import React, {useState, useEffect, useCallback} from 'react';
import axios from 'axios';
import MoviesList from './components/MoviesList';
import AddMovie from './components/AddMovie';
import './App.css';

function App() {
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
 
  //better to use async and await

const fetchMovieHandler = useCallback(async () => {
    setError(null)
  setIsLoading(true)
  try{

    const response = await axios.get('https://react-http-bad39-default-rtdb.asia-southeast1.firebasedatabase.app/movies.json');
    const data = await response.data;

    const loadedMovies = [];

    for (const key in data) {
      loadedMovies.push({
        id: key,
        title: data[key].title,
        openingText: data[key].openingText,
        releaseDate: data[key].releaseDate,
      });
    }

      setMovies(loadedMovies)
      setIsLoading(false)
  } 
  
  catch(err) {
    setError(err.message)
    setIsLoading(false)
    console.log(err.message)
  }
}, [])
useEffect(() => {
  fetchMovieHandler()
}, [fetchMovieHandler])
let content = <p>Found no movies.</p>;

if (movies.length > 0) {
  content = <MoviesList movies={movies} />;
}

if (error) {
  content = <p>{error}</p>;
}

if (isLoading) {
  content = <p>Loading...</p>;
}

const addMovieHandler = async (movie) => {
  axios({
    method: 'post',
    url: 'https://react-http-bad39-default-rtdb.asia-southeast1.firebasedatabase.app/movies.json',
    data: movie
})
.then(function (response) {
    console.log(response);
})
.catch(function (error) {
    console.log(error);
});
}
  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}
export default App;
