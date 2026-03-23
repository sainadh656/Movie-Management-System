import './home.css'

export default function Home() {
  return (
    <div className="home-container">
      <h1 className="home-title">Movie Management System</h1>

      <p className="home-subtitle">
        A full-stack application to explore, manage, and search movies with
        ease.
      </p>

      <div className="features-grid">
        <div className="feature-card">
          <h3>View watchlist Movies</h3>
          <p>
            View all your saved movies in one place and manage your watchlist
            effortlessly.
          </p>
        </div>

        <div className="feature-card">
          <h3>Smart Search</h3>
          <p>
            Quickly find movies as you type with instant suggestions for a
            smooth search experience.
          </p>
        </div>

        <div className="feature-card">
          <h3>Add movies to personal watchlist</h3>
          <p>
            Save your favorite movies to a personal watchlist and access them
            anytime.
          </p>
        </div>

        <div className="feature-card">
          <h3>Remove movies from watchlist</h3>
          <p>Easily remove movies from your watchlist with a single click.</p>
        </div>
      </div>

      <p className="home-footer">
        Built using <b>React</b>, <b>Node.js</b>, <b>Express</b>, and{' '}
        <b>SQLite</b>.
      </p>
    </div>
  )
}
