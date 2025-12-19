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
          <h3>🎞 Movie Collection</h3>
          <p>
            Browse all movies along with posters, actors, and director details.
          </p>
        </div>

        <div className="feature-card">
          <h3>🔍 Smart Search</h3>
          <p>Find movies instantly using fast autocomplete search.</p>
        </div>

        <div className="feature-card">
          <h3>🎬 Director Management</h3>
          <p>Search, add, and explore movies by specific directors.</p>
        </div>

        <div className="feature-card">
          <h3>🛠 CRUD Operations</h3>
          <p>
            Add, update, or delete movies and directors with a simple interface.
          </p>
        </div>
      </div>

      <p className="home-footer">
        Built using <b>React</b>, <b>Node.js</b>, <b>Express</b>, and{' '}
        <b>SQLite</b>.
      </p>
    </div>
  )
}
