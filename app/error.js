"use client";

export default function Error({ error, reset }) {
  return (
    <div style={{ padding: "40px 24px", textAlign: "center", color: "#edf2ff" }}>
      <h2>Something went wrong.</h2>
      <p>{error?.message || "Unable to load the movie app right now."}</p>
      <button
        onClick={() => reset()}
        style={{
          padding: "12px 18px",
          borderRadius: "12px",
          border: "none",
          background: "linear-gradient(135deg, #ff2f6e, #ff7a59)",
          color: "white",
          cursor: "pointer",
          fontWeight: 700,
        }}
      >
        Try again
      </button>
    </div>
  );
}
