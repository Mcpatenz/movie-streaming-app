export default function DetailModal({ movie, onClose }) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="movie-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-modal" onClick={onClose}>
          ✕
        </button>

        <div className="modal-visual">
          <img src={movie.poster} alt={movie.title} loading="lazy" decoding="async" />
        </div>

        <div className="modal-content">
          <div className="modal-badge">{movie.badge}</div>
          <h2>{movie.title}</h2>
          <div className="modal-meta">
            <span>{movie.year}</span>
            <span>{movie.genre}</span>
            <span>{movie.duration}</span>
            <span>{movie.rating}</span>
          </div>

          <p className="modal-description">{movie.description}</p>

          <div className="modal-grid">
            <div>
              <label>Director</label>
              <p>{movie.director}</p>
            </div>
            <div>
              <label>Cast</label>
              <p>{movie.cast.join(", ")}</p>
            </div>
          </div>

          <div className="modal-actions">
            <button className="play-button" onClick={onClose}>
              ▶ Watch Now
            </button>
            <button className="secondary-button" onClick={onClose}>
              + My List
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
