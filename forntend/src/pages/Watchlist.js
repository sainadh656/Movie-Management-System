import {useEffect, useState} from 'react'

export default function Watchlist() {
  const userId = localStorage.getItem('userId')
  const [movies, setMovies] = useState([])
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetch(
      `https://movie-management-system-1.onrender.com/users/${userId}/watchlist/`,
    )
      .then(res => res.json())
      .then(data => setMovies(data))
      .catch(() => setMessage('Failed to load watchlist'))
  }, [userId])

  const removeFromWatchlist = async movieId => {
    try {
      await fetch(
        `https://movie-management-system-1.onrender.com/users/${userId}/watchlist/${movieId}/`,
        {
          method: 'DELETE',
        },
      )

      // ✅ Update UI instantly
      setMovies(prevMovies =>
        prevMovies.filter(movie => movie.movieId !== movieId),
      )

      setMessage('Movie removed from watchlist')
    } catch (error) {
      console.error(error)
      setMessage('Failed to remove movie')
    }
  }

  return (
    <div>
      <h2>My Watchlist</h2>

      {message && <p>{message}</p>}

      {movies.length === 0 && <p>No movies in watchlist</p>}

      <div className="movie-grid">
        {movies.map(m => (
          <div key={m.movieId} className="movie-card">
            <img src={m.movieImage} alt={m.movieName} className="poster" />
            <h3>{m.movieName}</h3>

            <button
              type="button"
              onClick={() => removeFromWatchlist(m.movieId)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
