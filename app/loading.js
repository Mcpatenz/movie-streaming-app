export default function Loading() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        color: "#edf2ff",
        background: "#070b14",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            width: 52,
            height: 52,
            margin: "0 auto 16px",
            borderRadius: "50%",
            border: "4px solid rgba(255,255,255,0.12)",
            borderTopColor: "#ff2f6e",
            animation: "spin 0.8s linear infinite",
          }}
        />
        <p style={{ margin: 0, letterSpacing: "0.12em", textTransform: "uppercase" }}>
          Loading MovieVerse
        </p>
      </div>
    </div>
  );
}
