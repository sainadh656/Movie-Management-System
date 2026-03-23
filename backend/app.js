

const express = require('express')
const cors = require("cors")
const {open} = require('sqlite')
const sqlite3 = require('sqlite3')
const path = require('path')
const fs = require("fs")

const app = express()

app.use(cors())
app.use(express.json())

const databasePath = path.join(__dirname, 'moviesData.db')
let database = null


const initializeDbAndServer = async () => {
  try {
    const dbExists = fs.existsSync(databasePath)

    database = await open({
      filename: databasePath,
      driver: sqlite3.Database,
    })

    if (!dbExists) {
      const sql = fs.readFileSync('./movies.sql', 'utf-8')
      await database.exec(sql)
      console.log("Database created")
    }

    app.listen(process.env.PORT || 3000, () => {
      console.log("Server Running")
    })
  } catch (e) {
    console.log(`DB Error: ${e.message}`)
    process.exit(1)
  }
}

initializeDbAndServer()

/* ---------- CONVERTERS ---------- */

const convertMovie = obj => ({
  movieId: obj.movie_id,
  directorId: obj.director_id,
  movieName: obj.movie_name,
  leadActor: obj.lead_actor,
  movieImage: obj.movie_image,
})

const convertDirector = obj => ({
  directorId: obj.director_id,
  directorName: obj.director_name,
})

/* ---------- MOVIE APIs ---------- */

// GET all movies
app.get('/movies/', async (req, res) => {
  const query = `
    SELECT movie_id, movie_name, movie_image
    FROM movie;
  `
  const movies = await database.all(query)

  res.send(
    movies.map(m => ({
      movieId: m.movie_id,
      movieName: m.movie_name,
      movieImage: m.movie_image,
    })),
  )
})

// GET movie by ID (SAFE)
app.get('/movies/:movieId/', async (req, res) => {
  const {movieId} = req.params

  const query = `SELECT * FROM movie WHERE movie_id = ?;`
  const movie = await database.get(query, [movieId])

  if (!movie) {
    res.status(404).send({error: 'Movie Not Found'})
    return
  }

  res.send(convertMovie(movie))
})

// POST movie
app.post('/movies/', async (req, res) => {
  const {directorId, movieName, leadActor, movieImage} = req.body

  const query = `
    INSERT INTO movie (director_id, movie_name, lead_actor, movie_image)
    VALUES (?, ?, ?, ?);
  `

  await database.run(query, [directorId, movieName, leadActor, movieImage])

  res.send('Movie Successfully Added')
})

// UPDATE movie
app.put('/movies/:movieId/', async (req, res) => {
  const {movieId} = req.params
  const {directorId, movieName, leadActor, movieImage} = req.body

  const query = `
    UPDATE movie
    SET director_id = ?, movie_name = ?, lead_actor = ?, movie_image = ?
    WHERE movie_id = ?;
  `

  await database.run(query, [
    directorId,
    movieName,
    leadActor,
    movieImage,
    movieId,
  ])

  res.send('Movie Details Updated')
})

// DELETE movie (FIXED)
app.delete('/movies/:movieId/', async (req, res) => {
  const {movieId} = req.params

  const query = `DELETE FROM movie WHERE movie_id = ?;`
  await database.run(query, [movieId])

  res.send('Movie Removed')
})

/* ---------- DIRECTORS APIs ---------- */

// GET all directors
app.get('/directors/', async (req, res) => {
  const query = `SELECT * FROM director;`
  const directors = await database.all(query)

  res.send(directors.map(convertDirector))
})

// ADD new director
app.post('/directors/', async (req, res) => {
  const {directorName} = req.body

  const query = `
    INSERT INTO director (director_name)
    VALUES (?);
  `

  await database.run(query, [directorName])

  res.send('Director Successfully Added')
})

// GET movies by director
app.get('/directors/:directorId/movies/', async (req, res) => {
  const {directorId} = req.params

  const query = `
    SELECT movie_id, movie_name, movie_image
    FROM movie
    WHERE director_id = ?;
  `

  const movies = await database.all(query, [directorId])

  res.send(
    movies.map(m => ({
      movieId: m.movie_id,
      movieName: m.movie_name,
      movieImage: m.movie_image,
    })),
  )
})

// Delete director

app.delete('/directors/:directorId/', async (req, res) => {
  const {directorId} = req.params

  await database.run(
    `DELETE FROM director WHERE director_id = ?;`,
    [directorId],
  )

  res.send('Director Removed')
})
/* ----------Signup API---------*/

app.post('/signup/', async (req, res) => {
  const {username, email, password} = req.body

  const query = `
  INSERT INTO user (username, email, password, role)
  VALUES (?, ?, ?, 'USER');
`

  await database.run(query, [username, email, password])

  res.send({message: "User created"})
})

/* ------ Sign in API ------- */
app.post('/login/', async (req, res) => {
  const {email, password} = req.body

  const query = `SELECT * FROM user WHERE email = ?;`
  const user = await database.get(query, [email])

  if (!user) {
    res.status(400).send({error: 'User not found'})
    return
  }

  if (password !== user.password) {
    res.status(400).send({error: 'Invalid password'})
    return
  }

  res.send({
    userId: user.user_id,
    role: user.role,
    username: user.username,
  })
})

// users data
app.get('/users/', async (req, res) => {
  const users = await database.all(`
    SELECT user_id, username, email, role, created_at
    FROM user;
  `)

  res.send(users)
})

// GET watchlist
app.get('/users/:userId/watchlist/', async (req, res) => {
  const {userId} = req.params

  const data = await database.all(`
    SELECT m.movie_id, m.movie_name, m.movie_image
    FROM watchlist w
    JOIN movie m ON w.movie_id = m.movie_id
    WHERE w.user_id = ?;
  `, [userId])

  res.send(data.map(m => ({
    movieId: m.movie_id,
    movieName: m.movie_name,
    movieImage: m.movie_image,
  })))
})

// ADD to watchlist
app.post('/users/:userId/watchlist/', async (req, res) => {
  const {userId} = req.params
  const {movieId} = req.body

  await database.run(`
    INSERT INTO watchlist (user_id, movie_id)
    VALUES (?, ?);
  `, [userId, movieId])

  res.send({message: 'Added to watchlist'})
})

// REMOVE from watchlist
app.delete('/users/:userId/watchlist/:movieId/', async (req, res) => {
  const {userId, movieId} = req.params

  await database.run(`
    DELETE FROM watchlist
    WHERE user_id = ? AND movie_id = ?;
  `, [userId, movieId])

  res.send({message: 'Removed from watchlist'})
})
/* ---------- SEARCH API ---------- */

app.get('/movies/search/:name', async (req, res) => {
  const {name} = req.params

  const query = `
    SELECT movie_id, movie_name, movie_image
    FROM movie
    WHERE movie_name LIKE ?;
  `

  const movies = await database.all(query, [`%${name}%`])

  res.send(
    movies.map(m => ({
      movieId: m.movie_id,
      movieName: m.movie_name,
      movieImage: m.movie_image,
    })),
  )
})

module.exports = app
