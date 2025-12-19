import {useState} from 'react'

export default function UpdateMovie() {
  const [movieId, setMovieId] = useState('')
  const [directorId, setDirectorId] = useState('')
  const [movieName, setMovieName] = useState('')
  const [leadActor, setLeadActor] = useState('')
  const [movieImage, setMovieImage] = useState('')

  const updateMovie = async () => {
    await fetch(
      `https://harikrishnasainadhvpb9nrjscpupp7h.drops.nxtwave.tech/movies/${movieId}/`,
      {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          directorId,
          movieName,
          leadActor,
          movieImage,
        }),
      },
    )
  }

  return (
    <div className="form-box">
      <h2>Update Movie</h2>

      <input
        placeholder="Movie ID"
        onChange={e => setMovieId(e.target.value)}
      />
      <input
        placeholder="Director ID"
        onChange={e => setDirectorId(e.target.value)}
      />
      <input
        placeholder="Movie Name"
        onChange={e => setMovieName(e.target.value)}
      />
      <input
        placeholder="Lead Actor"
        onChange={e => setLeadActor(e.target.value)}
      />
      <input
        placeholder="Movie Image URL"
        onChange={e => setMovieImage(e.target.value)}
      />

      <button type="button" onClick={updateMovie}>
        Update
      </button>
    </div>
  )
}
