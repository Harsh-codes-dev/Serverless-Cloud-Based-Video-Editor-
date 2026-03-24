export default function Login() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "transparent",
        position: "relative",
        zIndex: 10,           // ✅ ensures card is above background
        pointerEvents: "auto" // ✅ ensures clicks work
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "360px",
          padding: "32px",
          background: "rgba(255, 255, 255, 0.92)",
          borderRadius: "18px",
          boxShadow: "0 20px 40px rgba(10, 37, 64, 0.12)",
          textAlign: "center",
          backdropFilter: "blur(10px)"
        }}
      >
        <h2 style={{ marginBottom: "20px" }}>Login</h2>

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          style={inputStyle}
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          style={inputStyle}
        />

        {/* Button */}
        <button style={buttonStyle}>
          Login
        </button>
      </div>
    </div>
  );
}

/* =========================
   STYLES
========================= */

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "14px",
  borderRadius: "10px",
  border: "1px solid #d0dbea",
  fontSize: "14px",
  background: "transparent",
  outline: "none"
};

const buttonStyle = {
  width: "100%",
  padding: "14px",
  borderRadius: "12px",
  border: "none",
  background: "linear-gradient(135deg, #0A2540, #00E5FF)",
  color: "white",
  fontWeight: "600",
  cursor: "pointer",
  fontSize: "15px"
};
