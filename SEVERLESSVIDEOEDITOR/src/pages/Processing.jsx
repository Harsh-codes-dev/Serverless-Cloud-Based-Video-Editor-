import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function Processing() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const jobId = searchParams.get("jobId");
  const [status, setStatus] = useState("Checking status...");

  const API_BASE =
    "https://1n3ehrgbaf.execute-api.ap-south-1.amazonaws.com";

  useEffect(() => {
    if (!jobId) {
      setStatus("Invalid Job ID");
      return;
    }

    const interval = setInterval(async () => {
      try {
        const res = await fetch(
          `${API_BASE}/job-status?jobId=${jobId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        // 🚨 If API returns 403 or 500
        if (!res.ok) {
          console.error("HTTP Error:", res.status);
          setStatus(`Server Error (${res.status})`);
          return;
        }

        const data = await res.json();

        console.log("Job Status Response:", data);

        if (!data.status) {
          setStatus("Waiting for job to start...");
          return;
        }

        if (data.status === "RUNNING") {
          setStatus("Processing video...");
        }

        if (data.status === "COMPLETED" || data.status === "SUCCEEDED") {
          clearInterval(interval);
          navigate(`/output?jobId=${jobId}`);
        }

        if (data.status === "FAILED") {
          clearInterval(interval);
          setStatus("Processing failed.");
        }

      } catch (err) {
        console.error("Fetch Error:", err);
        setStatus("Error checking status...");
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [jobId, navigate]);

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
          width: "360px",
          padding: "32px",
          background: "rgba(255,255,255,0.92)",
          borderRadius: "18px",
          boxShadow: "0 20px 40px rgba(10, 37, 64, 0.12)",
          textAlign: "center",
        }}
      >
        <h2 style={{ marginBottom: "12px", color: "#0A2540" }}>
          Processing Video
        </h2>

        <p style={{ fontSize: "14px", color: "#555" }}>Job ID:</p>

        <p style={{ fontSize: "12px", wordBreak: "break-all" }}>
          {jobId}
        </p>

        <div className="loader" />

        <p style={{ marginTop: "16px", fontSize: "14px", color: "#444" }}>
          {status}
        </p>
      </div>
    </div>
  );
}