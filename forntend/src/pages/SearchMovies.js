import {useEffect, useState} from 'react'
import './addwatchlistbtn.css'
import {useLocation} from 'react-router-dom'

export default function Movies() {
  const [movies, setMovies] = useState([])
  const [addedMovies, setAddedMovies] = useState([])
  const [search, setSearch] = useState('')
  const [showDropdown, setShowDropdown] = useState(false)

  const BASE_URL = 'https://movie-management-system-1.onrender.com'

  const userId = localStorage.getItem('userId')
  const role = localStorage.getItem('role')
  const location = useLocation() // 🔥 key for resync

  /* ---------- LOAD ALL MOVIES ---------- */
  const loadAllMovies = async () => {
    try {
      const res = await fetch(`${BASE_URL}/movies/`)
      const data = await res.json()
      setMovies(data)
    } catch (err) {
      console.error('Error loading movies:', err)
    }
  }

  useEffect(() => {
    loadAllMovies()
  }, [])

  /* ---------- LOAD WATCHLIST (SYNC STATE) ---------- */
  useEffect(() => {
    if (role === 'USER') {
      fetch(`${BASE_URL}/users/${userId}/watchlist/`)
        .then(res => res.json())
        .then(data => {
          const ids = data.map(m => m.movieId)
          setAddedMovies(ids)
        })
    }
  }, [location.key, userId, role]) // 🔥 important

  /* ---------- SEARCH MOVIES ---------- */
  const searchMovies = async value => {
    setSearch(value)

    if (value.trim() === '') {
      loadAllMovies()
      setShowDropdown(false)
      return
    }

    try {
      const res = await fetch(`${BASE_URL}/movies/search/${value}`)
      const data = await res.json()
      setMovies(data)
      setShowDropdown(true)
    } catch (err) {
      console.error('Search error:', err)
    }
  }

  /* ---------- ADD TO WATCHLIST ---------- */
  const addToWatchlist = async movieId => {
    await fetch(`${BASE_URL}/users/${userId}/watchlist/`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({movieId}),
    })

    setAddedMovies(prev => [...prev, movieId])
  }

  return (
    <div>
      <h2>Movies</h2>

      {/* Search Input */}
      <div style={{position: 'relative', marginBottom: '20px'}}>
        <input
          placeholder="Search movies..."
          value={search}
          onChange={e => searchMovies(e.target.value)}
          style={{padding: '10px', width: '100%'}}
        />

        {/* Autocomplete Dropdown */}
        {showDropdown && movies.length > 0 && (
          <ul className="dropdown">
            {movies.map(m => (
              <li
                key={m.movieId}
                onClick={() => {
                  setSearch(m.movieName)
                  setShowDropdown(false)
                }}
                style={{cursor: 'pointer', padding: '6px'}}
              >
                {m.movieName}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Movie Grid */}
      <div className="movie-grid">
        {movies.map(m => {
          const isAdded = addedMovies.includes(m.movieId)

          return (
            <div key={m.movieId} className="movie-card">
              <img src={m.movieImage} alt={m.movieName} className="poster" />
              <h3>{m.movieName}</h3>

              {/* USER ONLY BUTTON */}
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

      {movies.length === 0 && <p>No movies found</p>}
    </div>
  )
}
