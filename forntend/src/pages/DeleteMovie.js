import {useState} from 'react'

export default function DeleteMovie() {
  const [movieId, setMovieId] = useState('')

  const deleteMovie = async () => {
    await fetch(
      `https://harikrishnasainadhvpb9nrjscpupp7h.drops.nxtwave.tech/movies/${movieId}/`,
      {
        method: 'DELETE',
      },
    )
  }

  return (
    <div className="form-box">
      <h2>Delete Movie</h2>

      <input
        placeholder="Movie ID"
        onChange={e => setMovieId(e.target.value)}
      />
      <button onClick={deleteMovie} type="button">
        Delete
      </button>
    </div>
  )
}
