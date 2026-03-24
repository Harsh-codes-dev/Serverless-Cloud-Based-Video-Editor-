import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

const API_BASE =
  "https://1n3ehrgbaf.execute-api.ap-south-1.amazonaws.com/prod";


export default function Output() {
  const [searchParams] = useSearchParams();
  const jobId = searchParams.get("jobId");

  const [shorts, setShorts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!jobId) return;

    const fetchShorts = async () => {
      try {
        const res = await fetch(
          `${API_BASE}/get-outputs`
        );

        const data = await res.json();
        
       
          setShorts(data);
        

      } catch (err) {
        console.error("Error fetching shorts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchShorts();
  }, [jobId]);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "transparent",
      }}
    >
      <div
        style={{
          width: "500px",
          padding: "32px",
          background: "rgba(255,255,255,0.92)",
          borderRadius: "18px",
          boxShadow: "0 20px 40px rgba(10, 37, 64, 0.12)",
          textAlign: "center",
        }}
      >
        <h2 style={{ marginBottom: "12px", color: "#0A2540" }}>
          🎉 Shorts Generated
        </h2>

        <p style={{ fontSize: "14px", color: "#555" }}>
          Job ID:
        </p>

        <p style={{ fontSize: "12px", wordBreak: "break-all" }}>
          {jobId}
        </p>

        {loading && (
          <p style={{ marginTop: "20px" }}>Loading shorts...</p>
        )}

        {!loading && shorts.length === 0 && (
          <p style={{ marginTop: "20px" }}>
            No shorts found.
          </p>
        )}

        {!loading && shorts.length > 0 && (
          <div style={{ marginTop: "20px" }}>
            {shorts.map((videoUrl, index) => (
              <div key={index} style={{ marginBottom: "20px" }}>
         <video
    src={videoUrl}
    controls
    style={{
      width: "100%",
      borderRadius: "12px",
      display: "block"
    }}
  />

  <button
    style={{
      marginTop: "10px",
      padding: "8px 16px",
      cursor: "pointer",
      position: "relative",
      zIndex: 1000
    }}
    onClick={() => window.open(videoUrl, "_blank")}
  >
    Download
  </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}