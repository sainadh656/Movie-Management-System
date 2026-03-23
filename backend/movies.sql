-- DROP OLD TABLES (ORDER IMPORTANT)
DROP TABLE IF EXISTS watchlist;
DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS movie;
DROP TABLE IF EXISTS director;

-- DIRECTOR TABLE
CREATE TABLE director (
  director_id INTEGER PRIMARY KEY AUTOINCREMENT,
  director_name TEXT NOT NULL
);

-- MOVIE TABLE
CREATE TABLE movie (
  movie_id INTEGER PRIMARY KEY AUTOINCREMENT,
  director_id INTEGER,
  movie_name TEXT NOT NULL,
  lead_actor TEXT NOT NULL,
  movie_image TEXT,
  FOREIGN KEY (director_id) REFERENCES director(director_id)
);

-- USER TABLE
CREATE TABLE user (
  user_id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role TEXT DEFAULT 'USER',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- WATCHLIST TABLE (IMPORTANT)
CREATE TABLE watchlist (
  watchlist_id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER,
  movie_id INTEGER,
  FOREIGN KEY (user_id) REFERENCES user(user_id),
  FOREIGN KEY (movie_id) REFERENCES movie(movie_id),
  UNIQUE(user_id, movie_id) -- prevents duplicates
);

-- INSERT DIRECTORS
INSERT INTO director (director_name) VALUES
('Christopher Nolan'),
('S. S. Rajamouli'),
('James Cameron'),
('Steven Spielberg'),
('Lokesh Kanagaraj');

-- INSERT MOVIES
INSERT INTO movie (director_id, movie_name, lead_actor, movie_image) VALUES
(1, 'Inception', 'Leonardo DiCaprio', 
'https://image.tmdb.org/t/p/original/xlaY2zyzMfkhk0HSC5VUwzoZPU1.jpg'),

(1, 'Interstellar', 'Matthew McConaughey', 
'https://image.tmdb.org/t/p/original/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg'),

(2, 'RRR', 'Ram Charan', 
'https://image.tmdb.org/t/p/original/u0XUBNQWlOvrh0Gd97ARGpIkL0.jpg'),

(2, 'Baahubali', 'Prabhas', 
'https://image.tmdb.org/t/p/original/9BAjt8nSSms62uOVYn1t3C3dVto.jpg'),

(3, 'Avatar', 'Sam Worthington', 
'https://image.tmdb.org/t/p/original/gKY6q7SjCkAU6FqvqWybDYgUKIF.jpg'),

(3, 'Titanic', 'Leonardo DiCaprio', 
'https://image.tmdb.org/t/p/original/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg'),

(4, 'Jurassic Park', 'Sam Neill', 
'https://image.tmdb.org/t/p/original/8nSi7W1pG1KgqHS9kp3EsGoeKtA.jpg'),

(5, 'Vikram', 'Kamal Haasan', 
'https://image.tmdb.org/t/p/original/774UV1aCURb4s4JfEFg3IEMu5Zj.jpg');

-- OPTIONAL: ADD ADMIN USER
INSERT INTO user (username, email, password, role)
VALUES ('admin', 'admin@gmail.com', 'admin123', 'ADMIN');
