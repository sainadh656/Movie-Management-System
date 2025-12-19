import {useEffect, useState} from 'react'

export default function Movies() {
  const [movies, setMovies] = useState([])

  useEffect(() => {
    fetch(
      'https://harikrishnasainadhvpb9nrjscpupp7h.drops.nxtwave.tech/movies/',
    )
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch movies')
        }
        return res.json()
      })
      .then(data => setMovies(data))
      .catch(err => console.error('Fetch error:', err))
  }, [])

  return (
    <div>
      <h2>Movies</h2>

      {movies.length === 0 && <p>No movies found</p>}

      <div className="movie-grid">
        {movies.map(m => (
          <div key={m.movieId} className="movie-card">
            <img src={m.movieImage} alt={m.movieName} className="poster" />
            <h3>{m.movieName}</h3>
            <p>ID: {m.movieId}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
