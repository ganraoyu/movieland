import { useEffect, useState } from 'react';

import MovieCard from './moviecard';
import './App.css';
import searchIcon from './search.svg';
const API_URL = 'http://www.omdbapi.com/?apikey=98d9552c'

const App = () => {

  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const searchMovies = async(title) => {
    const response = await fetch(`${API_URL}&s=${title}`)
    const data =  await response.json();

    setMovies(data.Search); // Store the data in state
  }

  useEffect(() => {
    searchMovies('Spiderman');
  }, []);

  return (
    <div className="app">
      <h1>MovieLand</h1>
      
      <div className="search">
      <input
  placeholder="Search for a movie"
  value={searchTerm}
  onChange={(e)=>setSearchTerm(e.target.value)}
  onKeyPress={(e) => {
    if (e.key === 'Enter') {
      searchMovies(searchTerm);
    }
  }}
/>
        <img
          src={searchIcon}
          alt="search"
          onClick={()=>searchMovies(searchTerm)}
        />
      </div>

      {
        movies?.length > 0 
        ? (
          <div className="container">
            <div className="movie-list"> {/* Add a class here */}
              {movies.map((movie) =>(
                <MovieCard movie={movie}/>
              ))}
            </div>
          </div>
        ): (
          <div className='empty'>No movies found</div>
        )
      }
    </div>
  )
}

export default App;