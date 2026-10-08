export default function ContinueWatching({ movies }) {
  return (
    <section className="continue-section">
      <div className="section-head small">
        <h2>Continue Watching</h2>
        <a href="#resume">Resume</a>
      </div>

      <div className="continue-list">
        {movies.map((movie) => (
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
  );
}
