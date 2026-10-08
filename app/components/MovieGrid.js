import { memo } from "react";

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

export default function MovieGrid({ movies, selectedMovieId, onSelect }) {
  return (
    <section className="section-block" id="movies">
      <div className="section-head">
        <h2>Featured Movies</h2>
        <a href="#more">View all</a>
      </div>

      <div className="movie-grid">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              isSelected={selectedMovieId === movie.id}
              onSelect={onSelect}
            />
          ))
        ) : (
          <div className="empty-state">No movies match your search.</div>
        )}
      </div>
    </section>
  );
}
