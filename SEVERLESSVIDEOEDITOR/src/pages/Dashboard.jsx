import UploadBox from "../components/UploadBox";

export default function Dashboard() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "transparent",
        position: "relative",
        zIndex: 10,
        pointerEvents: "none"
      }}
    >
      {/* White / Glass Card */}
      <div
        style={{
          width: "100%",
          maxWidth: "520px",
          padding: "40px",
          background: "rgba(255, 255, 255, 0.92)", // ✅ same as login
          borderRadius: "20px",
          boxShadow: "0 20px 40px rgba(10, 37, 64, 0.12)",
          textAlign: "center",
          backdropFilter: "blur(10px)",
          pointerEvents: "none"
        }}
      >
        <h2
          style={{
            fontSize: "32px",
            marginBottom: "24px",
            color: "#0A2540"
          }}
        >
          Dashboard
        </h2>

        {/* Upload Box */}
        <div style={{ pointerEvents: "auto" }}>
          <UploadBox />
        </div>
      </div>
    </div>
  );
}
