
export default function Home() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        fontFamily: "'Melon Pop', Times, serif",
        color: "white",
        pointerEvents: "none", // important so mouse reaches GradientBlinds
      }}
      
    >

      <h1 style={{ fontSize: "3rem", marginBottom: "1rem" }}>
        🎬 Serverless Video Editor
      </h1>

      <p style={{ fontSize: "1.25rem", opacity: 0.85 }}>
        Create AI-powered YouTube Shorts automatically.
      </p>
    </div>
  );
}
