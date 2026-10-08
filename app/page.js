"use client";

import { memo, useMemo, useState } from "react";
import { categories, initialProfile, movies } from "@/data/movies";
import useDebounce from "@/hooks/useDebounce";

const MovieCard = memo(function MovieCard({ movie, isSelected, onSelect }) {
  return (
    <article
      className={`movie-card ${isSelected ? "selected" : ""}`}
      onClick={() => onSelect(movie)}
    >
      <div className="movie-thumb-wrap">
        <img src={movie.poster} alt={movie.title} loading="lazy" decoding="async" />
        <span className="movie-tag">{movie.tag}</span>
      </div>
      <div className="movie-card-body">
        <div className="movie-card-row">
          <span>{movie.year}</span>
          <span>{movie.rating}</span>
        </div>
        <h3>{movie.title}</h3>
        <p>{movie.genre}</p>
      </div>
    </article>
  );
});

export default function Home() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Trending");
  const [selectedMovie, setSelectedMovie] = useState(movies[0]);
  const [detailOpen, setDetailOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [mode, setMode] = useState("login");
  const [profile, setProfile] = useState(initialProfile);

  const debouncedSearch = useDebounce(search, 300);

  const filteredMovies = useMemo(() => {
    const term = debouncedSearch.toLowerCase();
    return movies.filter((movie) => {
      const matchesText =
        movie.title.toLowerCase().includes(term) || movie.genre.toLowerCase().includes(term);
      const matchesCategory =
        selectedCategory === "Trending" ||
        movie.genre.toLowerCase().includes(selectedCategory.toLowerCase());
      return matchesText && matchesCategory;
    });
  }, [debouncedSearch, selectedCategory]);

  const continueWatching = useMemo(() => movies.slice(0, 4), []);

  const openDetails = (movie) => {
    setSelectedMovie(movie);
    setDetailOpen(true);
  };

  return (
    <main className="streaming-app">
      <header className="topbar">
        <div className="brand-wrap">
          <div className="brand-mark">M</div>
          <div className="brand-text">
            <span className="brand-main">MovieVerse</span>
            <span className="brand-sub">Premium</span>
          </div>
        </div>

        <nav className="main-nav" aria-label="Main navigation">
          <a href="#home">Home</a>
          <a href="#movies">Movies</a>
          <a href="#series">Series</a>
          <a href="#mylist">My List</a>
        </nav>

        <div className="topbar-actions">
          <div className="search-box">
            <span className="search-icon">⌕</span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search movies"
            />
          </div>

          <button className="profile-pill" onClick={() => setAuthOpen(true)}>
            {profile.name.split(" ")[0]}
          </button>
          <button className="ghost-button" onClick={() => setAuthOpen(true)}>
            {profile.plan}
          </button>
        </div>
      </header>

      <section className="hero-section" id="home">
        <div
          className="hero-background"
          style={{ backgroundImage: `url(${selectedMovie.background})` }}
        />
        <div className="hero-overlay" />

        <div className="hero-content">
          <div className="hero-badge">Now streaming</div>
          <h1>{selectedMovie.title}</h1>

          <div className="hero-meta">
            <span>{selectedMovie.year}</span>
            <span>{selectedMovie.genre}</span>
            <span>{selectedMovie.duration}</span>
            <span>{selectedMovie.rating}</span>
          </div>

          <p className="hero-description">{selectedMovie.description}</p>

          <div className="hero-actions">
            <button className="play-button" onClick={() => setDetailOpen(true)}>
              ▶ Play
            </button>
            <button className="secondary-button" onClick={() => openDetails(selectedMovie)}>
              ＋ More Info
            </button>
          </div>
        </div>
      </section>

      <section className="filter-bar">
        {categories.map((category) => (
          <button
            key={category}
            className={`filter-chip ${selectedCategory === category ? "active" : ""}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </section>

      <section className="section-block" id="movies">
        <div className="section-head">
          <h2>Featured Movies</h2>
          <a href="#more">View all</a>
        </div>

        <div className="movie-grid">
          {filteredMovies.length > 0 ? (
            filteredMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                isSelected={selectedMovie.id === movie.id}
                onSelect={openDetails}
              />
            ))
          ) : (
            <div className="empty-state">No movies match your search.</div>
          )}
        </div>
      </section>

      <section className="continue-section">
        <div className="section-head small">
          <h2>Continue Watching</h2>
          <a href="#resume">Resume</a>
        </div>

        <div className="continue-list">
          {continueWatching.map((movie) => (
            <div key={movie.id} className="resume-card">
              <div className="resume-image">
                <img src={movie.poster} alt={movie.title} loading="lazy" decoding="async" />
              </div>
              <div className="resume-body">
                <div className="resume-header">
                  <h3>{movie.title}</h3>
                  <span>{movie.duration}</span>
                </div>
                <div className="progress-bar">
                  <span style={{ width: `${movie.progress}%` }} />
                </div>
                <p>{movie.progress}% watched</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="player-panel">
        <div className="player-header">
          <div>
            <p className="player-label">Now watching</p>
            <h3>{selectedMovie.title}</h3>
          </div>
          <div className="player-tags">
            <span>{selectedMovie.genre}</span>
            <span>{selectedMovie.duration}</span>
          </div>
        </div>

        <video
          key={selectedMovie.video}
          controls
          autoPlay
          className="movie-player"
          poster={selectedMovie.poster}
        >
          <source src={selectedMovie.video} type="video/mp4" />
          Your browser does not support HTML5 video.
        </video>
      </section>

      {detailOpen && (
        <div className="modal-backdrop" onClick={() => setDetailOpen(false)}>
          <div className="movie-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={() => setDetailOpen(false)}>
              ✕
            </button>

            <div className="modal-visual">
              <img src={selectedMovie.poster} alt={selectedMovie.title} loading="lazy" decoding="async" />
            </div>

            <div className="modal-content">
              <div className="modal-badge">{selectedMovie.badge}</div>
              <h2>{selectedMovie.title}</h2>
              <div className="modal-meta">
                <span>{selectedMovie.year}</span>
                <span>{selectedMovie.genre}</span>
                <span>{selectedMovie.duration}</span>
                <span>{selectedMovie.rating}</span>
              </div>

              <p className="modal-description">{selectedMovie.description}</p>

              <div className="modal-grid">
                <div>
                  <label>Director</label>
                  <p>{selectedMovie.director}</p>
                </div>
                <div>
                  <label>Cast</label>
                  <p>{selectedMovie.cast.join(", ")}</p>
                </div>
              </div>

              <div className="modal-actions">
                <button className="play-button" onClick={() => setDetailOpen(false)}>
                  ▶ Watch Now
                </button>
                <button className="secondary-button" onClick={() => setDetailOpen(false)}>
                  + My List
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {authOpen && (
        <div className="modal-backdrop" onClick={() => setAuthOpen(false)}>
          <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={() => setAuthOpen(false)}>
              ✕
            </button>

            <div className="auth-panel auth-visual">
              <div className="auth-badge">MovieVerse</div>
              <h3>Stream smarter.</h3>
              <p>
                Watch the latest blockbuster titles, organize your favorites, and keep your watchlist ready.
              </p>
            </div>

            <div className="auth-panel auth-form-panel">
              <div className="auth-toggle">
                <button
                  className={mode === "login" ? "active" : ""}
                  onClick={() => setMode("login")}
                >
                  Login
                </button>
                <button
                  className={mode === "signup" ? "active" : ""}
                  onClick={() => setMode("signup")}
                >
                  Sign Up
                </button>
              </div>

              <form
                className="auth-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  const form = e.currentTarget;
                  const formData = new FormData(form);
                  const name = formData.get("name")?.toString() || "Ariana Stone";
                  const email = formData.get("email")?.toString() || "ariana@example.com";
                  setProfile({
                    name,
                    email,
                    plan: "Premium",
                  });
                  setAuthOpen(false);
                }}
              >
                {mode === "signup" && (
                  <div className="field-group">
                    <label htmlFor="name">Full name</label>
                    <input id="name" name="name" type="text" placeholder="Your name" defaultValue={profile.name} />
                  </div>
                )}

                <div className="field-group">
                  <label htmlFor="email">Email</label>
                  <input id="email" name="email" type="email" defaultValue={profile.email} placeholder="you@example.com" />
                </div>

                <div className="field-group">
                  <label htmlFor="password">Password</label>
                  <input id="password" name="password" type="password" placeholder="••••••••" />
                </div>

                <button type="submit" className="auth-submit">
                  {mode === "login" ? "Login to My Account" : "Create My Account"}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
