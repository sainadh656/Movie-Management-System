import {Link, useHistory} from 'react-router-dom'
import './Navbar.css'

export default function Navbar() {
  const history = useHistory()

  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'
  const role = localStorage.getItem('role')?.toUpperCase()
  const username = localStorage.getItem('username')

  const handleLogout = () => {
    localStorage.clear()
    window.location.replace('/LoginUser')
  }

  return (
    <nav className="navbar">
      {/* Brand */}
      <div className="navbar-brand">
        <Link to="/">Movies Watchlist</Link>
      </div>

      {/* Links */}
      <div className="navbar-links">
        <Link to="/">Home</Link>

        {/* USER LINKS */}
        {isLoggedIn && role === 'USER' && (
          <>
            <Link to="/movies">Movies</Link>
            <Link to="/add-movie">Add Movie</Link>
            <Link to="/directors">Directors</Link>
            <Link to="/director-movies">Director Movies</Link>
            <Link to="/search">Search</Link>
            <Link to="/watchlist">My Watchlist</Link>
          </>
        )}

        {/* ADMIN LINKS */}
        {isLoggedIn && role === 'ADMIN' && (
          <>
            <Link to="/movies">Movies</Link>
            <Link to="/add-movie">Add Movie</Link>
            <Link to="/directors">Directors</Link>
            <Link to="/director-movies">Director Movies</Link>
            <Link to="/search">Search</Link>
            <Link to="/update-movie">Update Movie</Link>
            <Link to="/delete-movie">Delete Movie</Link>
            <Link to="/add-director">Add Director</Link>
            <Link to="/delete-director">Delete Director</Link>
            <Link to="/users">View Users</Link>
          </>
        )}

        {/* AUTH LINKS */}
        {!isLoggedIn ? (
          <>
            <Link to="/movies">Movies</Link>
            <Link to="/LoginUser">Login</Link>
            <Link to="/SignupUser">Signup</Link>
          </>
        ) : (
          <div className="user-section">
            <span className="username">
              {username} ({role})
            </span>
            <button type="button" onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}
