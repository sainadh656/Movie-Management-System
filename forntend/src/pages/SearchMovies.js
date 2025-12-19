import {useEffect, useState} from 'react'

export default function Movies() {
  const [movies, setMovies] = useState([])
  const [search, setSearch] = useState('')
  const [showDropdown, setShowDropdown] = useState(false)

  const BASE_URL =
    'https://harikrishnasainadhvpb9nrjscpupp7h.drops.nxtwave.tech'

  // Load all movies
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

  // Search movies
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
        {movies.map(m => (
          <div key={m.movieId} className="movie-card">
            <img src={m.movieImage} alt={m.movieName} className="poster" />
            <p>
              <b>ID:</b> {m.movieId}
            </p>
            <h3>{m.movieName}</h3>
          </div>
        ))}
      </div>

      {movies.length === 0 && <p>No movies found</p>}
    </div>
  )
}
