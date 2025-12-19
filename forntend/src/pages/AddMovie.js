import {useState} from 'react'

export default function AddMovie() {
  const [directorId, setDirectorId] = useState('')
  const [movieName, setMovieName] = useState('')
  const [leadActor, setLeadActor] = useState('')
  const [movieImage, setMovieImage] = useState('')

  const addMovie = async () => {
    await fetch(
      'https://harikrishnasainadhvpb9nrjscpupp7h.drops.nxtwave.tech/movies/',
      {
        method: 'POST',
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
      <h2>Add Movie</h2>

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

      <button onClick={addMovie} type="button">
        Add
      </button>
    </div>
  )
}
