import {useState} from 'react'

export default function DeleteDirector() {
  const [directorId, setDirectorId] = useState('')

  const deleteDirector = async () => {
    await fetch(
      `https://movie-management-system-1.onrender.com/directors/${directorId}/`,
      {
        method: 'DELETE',
      },
    )
  }

  return (
    <div className="form-box">
      <h2>Delete Director</h2>

      <input
        placeholder="Director ID"
        onChange={e => setDirectorId(e.target.value)}
      />
      <button onClick={deleteDirector} type="button">
        Delete
      </button>
    </div>
  )
}
