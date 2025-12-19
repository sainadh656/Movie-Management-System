import {Link} from 'react-router-dom'
import './Navbar.css'

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      <Link to="/movies">Movies</Link>
      <Link to="/add-movie">Add Movie</Link>
      <Link to="/update-movie">Update Movie</Link>
      <Link to="/delete-movie">Delete Movie</Link>
      <Link to="/directors">Directors</Link>
      <Link to="/add-director">Add Director</Link>
      <Link to="/director-movies">Director Movies</Link>
      <Link to="/search">Search</Link>
    </nav>
  )
}
