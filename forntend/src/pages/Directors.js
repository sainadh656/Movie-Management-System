import {useEffect, useState} from 'react'

export default function Directors() {
  const [directors, setDirectors] = useState([])

  useEffect(() => {
    fetch(
      'https://harikrishnasainadhvpb9nrjscpupp7h.drops.nxtwave.tech/directors/',
    )
      .then(res => res.json())
      .then(data => setDirectors(data))
  }, [])

  return (
    <div>
      <h2>Directors</h2>
      <ul>
        {directors.map(d => (
          <li key={d.directorId}>
            {d.directorName} ({d.directorId})
          </li>
        ))}
      </ul>
    </div>
  )
}
