export default function AuthModal({ mode, profile, onClose, onModeChange, onSubmit }) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-modal" onClick={onClose}>
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
              onClick={() => onModeChange("login")}
            >
              Login
            </button>
            <button
              className={mode === "signup" ? "active" : ""}
              onClick={() => onModeChange("signup")}
            >
              Sign Up
            </button>
          </div>

          <form
            className="auth-form"
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit(e);
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
  );
}
