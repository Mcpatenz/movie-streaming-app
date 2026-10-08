"use client";

import { useMemo, useState } from "react";

const movies = [
  {
    id: 1,
    title: "Midnight Echo",
    year: 2024,
    genre: "Sci‑Fi / Thriller",
    rating: "PG-13",
    duration: "2h 11m",
    description:
      "A reclusive sound engineer discovers a hidden transmission that predicts the next global catastrophe.",
    poster:
      "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=900&q=80",
    background:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1600&q=80",
    video: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: 2,
    title: "Neon Horizon",
    year: 2023,
    genre: "Action / Cyberpunk",
    rating: "R",
    duration: "1h 56m",
    description:
      "A rogue driver races across a fractured megacity to stop a weaponized AI from taking control of the grid.",
    poster:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=900&q=80",
    background:
      "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?auto=format&fit=crop&w=1600&q=80",
    video: "https://www.w3schools.com/html/movie.mp4",
  },
  {
    id: 3,
    title: "Silver Harbor",
    year: 2022,
    genre: "Drama / Mystery",
    rating: "PG",
    duration: "2h 04m",
    description:
      "After a storm washes away her childhood memories, a woman investigates the disappearance of her father.",
    poster:
      "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=900&q=80",
    background:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1600&q=80",
    video: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: 4,
    title: "Crimson Road",
    year: 2021,
    genre: "Adventure / Crime",
    rating: "PG-13",
    duration: "1h 49m",
    description:
      "Two former thieves are forced to uncover a hidden vault beneath a collapsed desert highway.",
    poster:
      "https://images.unsplash.com/photo-1513106580091-1d82408b8cd6?auto=format&fit=crop&w=900&q=80",
    background:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80",
    video: "https://www.w3schools.com/html/movie.mp4",
  },
];

export default function Home() {
  const [search, setSearch] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(movies[0]);

  const filteredMovies = useMemo(() => {
    return movies.filter((movie) =>
      movie.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  return (
    <main className="page-shell">
      <header className="topbar">
        <div className="brand">
          <span className="brand-mark">M</span>
          <span>MovieVerse</span>
        </div>

        <nav className="nav">
          <a href="#home">Home</a>
          <a href="#movies">Movies</a>
          <a href="#series">Series</a>
          <a href="#mylist">My List</a>
        </nav>

        <div className="actions">
          <input
            type="text"
            placeholder="Search movies..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="login-btn">Login</button>
        </div>
      </header>

      <section className="hero" id="home">
        <div
          className="hero-bg"
          style={{ backgroundImage: `url(${selectedMovie.background})` }}
        ></div>
        <div className="hero-overlay"></div>

        <div className="hero-content">
          <p className="eyebrow">Now Streaming</p>
          <h1>{selectedMovie.title}</h1>
          <div className="meta">
            <span>{selectedMovie.year}</span>
            <span>{selectedMovie.genre}</span>
            <span>{selectedMovie.duration}</span>
            <span>{selectedMovie.rating}</span>
          </div>
          <p className="description">{selectedMovie.description}</p>

          <div className="hero-buttons">
            <button className="primary">▶ Play Now</button>
            <button className="secondary">+ My List</button>
          </div>
        </div>
      </section>

      <section className="movie-showcase" id="movies">
        <div className="section-header">
          <h2>Featured Movies</h2>
          <a href="#more">View all</a>
        </div>

        <div className="movie-grid">
          {filteredMovies.length > 0 ? (
            filteredMovies.map((movie) => (
              <article
                key={movie.id}
                className={`movie-card ${
                  selectedMovie.id === movie.id ? "selected" : ""
                }`}
                onClick={() => setSelectedMovie(movie)}
              >
                <img src={movie.poster} alt={movie.title} />
                <div className="movie-info">
                  <div className="movie-topline">
                    <span>{movie.year}</span>
                    <span>{movie.rating}</span>
                  </div>
                  <h3>{movie.title}</h3>
                  <p>{movie.genre}</p>
                </div>
              </article>
            ))
          ) : (
            <div className="empty-state">No movies found for your search.</div>
          )}
        </div>
      </section>

      <section className="player-panel">
        <div className="player-header">
          <div>
            <p className="eyebrow">Now watching</p>
            <h3>{selectedMovie.title}</h3>
          </div>
          <span>{selectedMovie.genre}</span>
        </div>

        <video
          key={selectedMovie.video}
          controls
          autoPlay
          className="movie-player"
          poster={selectedMovie.poster}
        >
          <source src={selectedMovie.video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </section>
    </main>
  );
}
