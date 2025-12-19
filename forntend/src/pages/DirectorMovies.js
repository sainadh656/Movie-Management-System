import {useState} from 'react'

export default function DirectorMovies() {
  const [directorId, setDirectorId] = useState('')
  const [movies, setMovies] = useState([])

  const loadMovies = async () => {
    const res = await fetch(
      `https://harikrishnasainadhvpb9nrjscpupp7h.drops.nxtwave.tech/directors/${directorId}/movies/`,
    )
    const data = await res.json()
    setMovies(data)
  }

  return (
    <div className="form-box">
      <h2>Movies by Director</h2>

      <input
        placeholder="Director ID"
        onChange={e => setDirectorId(e.target.value)}
      />
      <button onClick={loadMovies} type="button">
        Get Movies
      </button>

      <div className="movie-grid">
        {movies.map(m => (
          <div key={m.movieId} className="movie-card">
            <img src={m.movieImage} alt={m.movieName} className="poster" />
            <h3>{m.movieName}</h3>
          </div>
        ))}
      </div>
    </div>
  )
}
