export async function uploadVideoToS3(file, onProgress) {
  const API_URL = "https://u7ls3fxp45.execute-api.ap-south-1.amazonaws.com/prod/upload-url"; // Replace with your actual API Gateway URL

  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Failed to get upload URL");

  const { uploadUrl, jobId } = await res.json();

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("PUT", uploadUrl);
    xhr.setRequestHeader("Content-Type", "video/mp4");

    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) {
        const percent = Math.round((e.loaded / e.total) * 100);
        onProgress(percent);
      }
    };

    xhr.onload = () => {
      if (xhr.status === 200) {
        resolve({
          success: true,
          jobId,
          message: "Upload successful"
        });
      } else {
        reject({ success: false, message: "Upload failed" });
      }
    };

    xhr.onerror = () => reject({ success: false, message: "Network error" });

    xhr.send(file);
  });
}