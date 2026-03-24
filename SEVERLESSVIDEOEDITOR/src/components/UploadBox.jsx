import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { uploadVideoToS3 } from "../services/s3Upload";

export default function UploadBox() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadResult, setUploadResult] = useState(null);

  const fileInputRef = useRef(null);
  const navigate = useNavigate(); // ✅ router navigation

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type.startsWith("video/")) {
      setFile(selectedFile);
      setUploadResult(null);
    } else {
      alert("Please select a video file");
    }
  };

  const handleUpload = async () => {
    if (!file) return alert("Select a video first");

    setUploading(true);
    setProgress(0);

    const result = await uploadVideoToS3(file, (p) => setProgress(p));

    setUploading(false);
    setUploadResult(result);

    // ✅ REDIRECT WHEN UPLOAD IS SUCCESSFUL
    if (result.success) {
      navigate(`/processing?jobId=${result.jobId}`);
    }
  };

  return (
    <div className="upload-container">
      <div
        className="upload-area"
        onClick={() => fileInputRef.current.click()}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="video/*"
          hidden
        />

        {file ? (
          <p>{file.name}</p>
        ) : (
          <p>Click or Drag Video Here</p>
        )}
      </div>

      {file && (
        <button onClick={handleUpload} disabled={uploading}>
          {uploading ? `Uploading ${progress}%` : "Upload Video"}
        </button>
      )}
    </div>
  );
}