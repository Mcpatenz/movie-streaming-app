export default function HeroSection({ movie, onPlay, onMoreInfo }) {
  return (
    <section className="hero-section" id="home">
      <div
        className="hero-background"
        style={{ backgroundImage: `url(${movie.background})` }}
      />
      <div className="hero-overlay" />

      <div className="hero-content">
        <div className="hero-badge">Now streaming</div>
        <h1>{movie.title}</h1>

        <div className="hero-meta">
          <span>{movie.year}</span>
          <span>{movie.genre}</span>
          <span>{movie.duration}</span>
          <span>{movie.rating}</span>
        </div>

        <p className="hero-description">{movie.description}</p>

        <div className="hero-actions">
          <button className="play-button" onClick={onPlay}>
            ▶ Play
          </button>
          <button className="secondary-button" onClick={onMoreInfo}>
            ＋ More Info
          </button>
        </div>
      </div>
    </section>
  );
}
