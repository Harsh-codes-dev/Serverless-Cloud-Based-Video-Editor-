import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav
      style={{
        padding: "16px",
        textAlign: "center",
        fontFamily: "'Times New Roman', Times, serif",
      }}
    >
      <Link to="/" style={linkStyle}>Home</Link>{" | "}
      <Link to="/dashboard" style={linkStyle}>Dashboard</Link>
    </nav>
  );
}

const linkStyle = {
  color: "white",
  textDecoration: "none",
  margin: "0 8px",
};

