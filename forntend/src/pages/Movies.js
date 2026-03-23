import {useEffect, useState} from 'react'
import './addwatchlistbtn.css'
import {useLocation} from 'react-router-dom'

export default function Movies() {
  const [movies, setMovies] = useState([])
  const [addedMovies, setAddedMovies] = useState([])

  const userId = localStorage.getItem('userId')
  const role = localStorage.getItem('role')
  const location = useLocation() // 🔥 KEY FIX

  // Load all movies
  useEffect(() => {
    fetch('https://movie-management-system-1.onrender.com/movies/')
      .then(res => res.json())
      .then(data => setMovies(data))
  }, [])

  // 🔥 Re-load watchlist EVERY time page is visited
  useEffect(() => {
    if (role === 'USER') {
      fetch(
        `https://movie-management-system-1.onrender.com/users/${userId}/watchlist/`,
      )
        .then(res => res.json())
        .then(data => {
          const ids = data.map(m => m.movieId)
          setAddedMovies(ids)
        })
    }
  }, [location.key, userId, role]) // 🔥 IMPORTANT

  const addToWatchlist = async movieId => {
    await fetch(
      `https://movie-management-system-1.onrender.com/users/${userId}/watchlist/`,
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({movieId}),
      },
    )

    setAddedMovies(prev => [...prev, movieId])
  }

  return (
    <div>
      <h2>Movies</h2>

      <div className="movie-grid">
        {movies.map(m => {
          const isAdded = addedMovies.includes(m.movieId)

          return (
            <div key={m.movieId} className="movie-card">
              <img src={m.movieImage} alt={m.movieName} className="poster" />
              <h3>{m.movieName}</h3>

              {role === 'USER' && (
                <button
                  type="button"
                  disabled={isAdded}
                  onClick={() => addToWatchlist(m.movieId)}
                  className={isAdded ? 'added-btn' : 'add-btn'}
                >
                  {isAdded ? 'Added to Watchlist' : '+ Add to Watchlist'}
                </button>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
