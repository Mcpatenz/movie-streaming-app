export default function Header({ profile, search, setSearch, onOpenAuth }) {
  return (
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

        <button className="profile-pill" onClick={onOpenAuth}>
          {profile.name.split(" ")[0]}
        </button>
        <button className="ghost-button" onClick={onOpenAuth}>
          {profile.plan}
        </button>
      </div>
    </header>
  );
}
