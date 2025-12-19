

DROP TABLE IF EXISTS director;
DROP TABLE IF EXISTS movie;

CREATE TABLE director (
  director_id INTEGER PRIMARY KEY AUTOINCREMENT,
  director_name TEXT NOT NULL
);

CREATE TABLE movie (
  movie_id INTEGER PRIMARY KEY AUTOINCREMENT,
  director_id INTEGER,
  movie_name TEXT NOT NULL,
  lead_actor TEXT NOT NULL,
  movie_image TEXT,
  FOREIGN KEY (director_id) REFERENCES director(director_id)
);

INSERT INTO director (director_name) VALUES
('Christopher Nolan'),
('S. S. Rajamouli'),
('James Cameron'),
('Steven Spielberg'),
('Lokesh Kanagaraj');

-- Insert Movies with Posters
INSERT INTO movie (director_id, movie_name, lead_actor, movie_image)
VALUES
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
