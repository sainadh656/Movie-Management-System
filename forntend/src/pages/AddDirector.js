import {useState} from 'react'

export default function AddDirector() {
  const [directorName, setDirectorName] = useState('')

  const addDirector = async () => {
    await fetch(
      'https://harikrishnasainadhvpb9nrjscpupp7h.drops.nxtwave.tech/directors/',
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({directorName}),
      },
    )

    setDirectorName('')
  }

  return (
    <div className="form-box">
      <h2>Add Director</h2>

      <input
        placeholder="Director Name"
        value={directorName}
        onChange={e => setDirectorName(e.target.value)}
      />

      <button type="button" onClick={addDirector}>
        Add
      </button>
    </div>
  )
}
